import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotes, createNote } from "../api/note";
import { aiAction, getAIHistory } from "../api/ai";
import { fetchStart, fetchSuccess, fetchError } from "../store/slices/notesSlice";
import NoteForm from "../components/NoteForm";
import AppHeader from "../components/AppHeader";

const Notes = () => {
    const { id: subjectId } = useParams();
    const dispatch = useDispatch();
    const token = useSelector((s) => s.auth.token);
    const { list, status } = useSelector((s) => s.notes);
    const [aiResult, setAiResult] = useState(null);
    const [aiLoading, setAiLoading] = useState(null); // aiLoading = { noteId, type } | null
    const [aiHistory, setAiHistory] = useState({}); // { [noteId]: [{ id, type, response }] }
    const [openHistoryNoteId, setOpenHistoryNoteId] = useState(null);

    useEffect(() => {
        const load = async () => {
            dispatch(fetchStart());
            try {
                const data = await getNotes({ token, subjectId });
                dispatch(fetchSuccess(data));
                const historyByNote = {};
                for (const n of data) {
                    try {
                        const h = await getAIHistory({ token, noteId: n.id });
                        historyByNote[n.id] = h;
                    } catch {
                        historyByNote[n.id] = [];
                    }
                }
                setAiHistory(historyByNote);

            } catch {
                dispatch(fetchError());
            }
        };
        load();
    }, [dispatch, token, subjectId]);

    const handleCreate = async ({ title, content }) => {
        dispatch(fetchStart());
        try {
            await createNote({ token, subjectId, title, content });
            const data = await getNotes({ token, subjectId });
            dispatch(fetchSuccess(data));
        } catch {
            dispatch(fetchError());
        }
    };

    const findInHistory = (history, type) =>
        history?.find((h) => h.type === type);

    const handleAI = async (noteId, type) => {
        const existing = findInHistory(aiHistory[noteId], type);

        if (existing) {
            setAiResult({ type, text: existing.response });
            return;
        }

        setAiLoading({ noteId, type });
        try {
            const data = await aiAction({ token, noteId, type });
            setAiResult({ type, text: data.result });

            const h = await getAIHistory({ token, noteId });
            setAiHistory((prev) => ({ ...prev, [noteId]: h }));
        } finally {
            setAiLoading(null);
        }
    };



    if (status === "loading") return <p>Cargando...</p>;

    return (
        <div className="min-h-screen bg-zinc-50">
            <AppHeader />

            <div className="mx-auto max-w-4xl px-6 py-10">

                <div className="min-h-screen bg-zinc-50">
                    <div className="mx-auto max-w-4xl px-6 py-10">
                        <h1 className="text-3xl font-medium tracking-tight text-zinc-900">
                            Notas
                        </h1>
                        <p className="mt-1 text-sm text-zinc-500">
                            Tus apuntes para esta materia.
                        </p>

                        {status === "loading" && (
                            <p className="mt-6 text-sm text-zinc-500">Cargando…</p>
                        )}

                        <ul className="mt-8 space-y-4">
                            {list.map((n) => (
                                <li
                                    key={n.id}
                                    className="rounded-2xl border border-zinc-200 bg-white p-6"
                                >
                                    <h2 className="text-lg font-medium text-zinc-900">
                                        {n.title}
                                    </h2>

                                    <p className="mt-2 whitespace-pre-line text-sm text-zinc-700">
                                        {n.content}
                                    </p>

                                    {/* AI buttons */}
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {["summary", "explanation", "questions"].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => handleAI(n.id, type)}
                                                disabled={aiLoading !== null}
                                                className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs
                             text-zinc-700 transition
                             hover:bg-zinc-100
                             disabled:opacity-50"
                                            >
                                                {aiLoading?.noteId === n.id && aiLoading?.type === type
                                                    ? "Cargando…"
                                                    : type === "summary"
                                                        ? "Resumir"
                                                        : type === "explanation"
                                                            ? "Explicar"
                                                            : "Preguntas"}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() =>
                                                setOpenHistoryNoteId(
                                                    openHistoryNoteId === n.id ? null : n.id
                                                )
                                            }
                                            className="ml-auto text-xs text-zinc-500 hover:text-zinc-700"
                                        >
                                            {openHistoryNoteId === n.id
                                                ? "Ocultar historial"
                                                : "Ver historial"}
                                        </button>
                                    </div>

                                    {/* Historial IA */}
                                    {openHistoryNoteId === n.id && aiHistory[n.id]?.length > 0 && (
                                        <div className="mt-4 rounded-xl bg-zinc-50 p-4">
                                            <h4 className="mb-2 text-sm font-medium text-zinc-700">
                                                Historial IA
                                            </h4>
                                            <ul className="space-y-2">
                                                {aiHistory[n.id].map((it) => (
                                                    <li key={it.id}>
                                                        <p className="text-xs font-medium text-zinc-600">
                                                            {it.type}
                                                        </p>
                                                        <p className="text-sm text-zinc-700 whitespace-pre-line">
                                                            {it.response}
                                                        </p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Resultado IA actual */}
                        {aiResult && (
                            <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6">
                                <h3 className="mb-2 text-sm font-medium text-zinc-700">
                                    {aiResult.type}
                                </h3>
                                {aiResult.type === "questions" ? (
                                    <pre className="text-sm text-zinc-800 whitespace-pre-wrap">
                                        {aiResult.text}
                                    </pre>
                                ) : (
                                    <p className="text-sm text-zinc-800 whitespace-pre-line">
                                        {aiResult.text}
                                    </p>
                                )}
                            </div>
                        )}

                        <NoteForm onSubmit={handleCreate} loading={status === "loading"} />
                    </div>
                </div>

            </div>
        </div>
    );

};

export default Notes;
