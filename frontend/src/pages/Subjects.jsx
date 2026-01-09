import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjects, createSubject } from "../api/subject";
import { fetchStart, fetchSuccess, fetchError } from "../store/slices/subjectsSlice";
import { useNavigate } from "react-router-dom";
import SubjectForm from "../components/SubjectForm";
import AppHeader from "../components/AppHeader";

const Subjects = () => {
    const dispatch = useDispatch();
    const { list, status } = useSelector((s) => s.subjects);
    const token = useSelector((s) => s.auth.token);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            dispatch(fetchStart());
            try {
                const data = await getSubjects(token);
                dispatch(fetchSuccess(data));
            } catch {
                dispatch(fetchError());
            }
        };
        load();
    }, [dispatch, token]);

    const handleCreate = async ({ name, description }) => {
        dispatch(fetchStart());
        try {
            await createSubject({ token, name, description });
            const data = await getSubjects(token);
            dispatch(fetchSuccess(data));
        } catch {
            dispatch(fetchError());
        }
    };
    return (
        <div className="min-h-screen bg-zinc-50">
            <AppHeader />

            <div className="mx-auto max-w-6xl px-6 py-10">
                <div className="min-h-screen bg-zinc-50">
                    <div className="mx-auto max-w-6xl px-6 py-10">
                        <div className="flex items-end justify-between gap-6">
                            <div>
                                <h1 className="text-3xl font-medium tracking-tight text-zinc-900">
                                    Materias
                                </h1>
                                <p className="mt-1 text-sm text-zinc-500">
                                    Elegí una materia para ver tus notas.
                                </p>
                            </div>

                            <div className="w-full max-w-md">
                                <SubjectForm onSubmit={handleCreate} loading={status === "loading"} />
                            </div>
                        </div>

                        <div className="mt-10">
                            {status === "loading" && (
                                <p className="text-sm text-zinc-500">Cargando…</p>
                            )}

                            {status !== "loading" && list.length === 0 && (
                                <div className="rounded-2xl border border-zinc-200 bg-white p-10 text-center">
                                    <p className="text-zinc-700">
                                        Todavía no tenés materias.
                                    </p>
                                    <p className="mt-2 text-sm text-zinc-500">
                                        Creá una para empezar.
                                    </p>
                                </div>
                            )}

                            {list.length > 0 && (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {list.map((s) => (
                                        <button
                                            key={s.id}
                                            type="button"
                                            onClick={() => navigate(`/subjects/${s.id}`)}
                                            className="group text-left rounded-2xl border border-zinc-200 bg-white p-6
                             transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm
                             focus:outline-none focus:ring-2 focus:ring-[#93c0a4]"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h2 className="text-lg font-medium text-zinc-900">
                                                        {s.name}
                                                    </h2>

                                                    {s.description ? (
                                                        <p className="mt-2 text-sm leading-relaxed text-zinc-600 line-clamp-3">
                                                            {s.description}
                                                        </p>
                                                    ) : (
                                                        <p className="mt-2 text-sm text-zinc-400">
                                                            Sin descripción
                                                        </p>
                                                    )}
                                                </div>

                                                <div
                                                    className="shrink-0 rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-500
                                 group-hover:border-zinc-300"
                                                >
                                                    Abrir
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Subjects;
