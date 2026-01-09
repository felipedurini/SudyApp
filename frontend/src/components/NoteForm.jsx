import { useState } from "react";

const NoteForm = ({ onSubmit, loading }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, content });
        setTitle("");
        setContent("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6"
        >
            <h2 className="mb-4 text-lg font-medium text-zinc-900">
                Nueva nota
            </h2>

            <div className="flex flex-col gap-4">
                <input
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="rounded-xl border border-zinc-300 px-4 py-2.5 text-sm
                     focus:outline-none focus:ring-2 focus:ring-[#93c0a4]"
                />

                <textarea
                    placeholder="Contenido"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={5}
                    className="rounded-xl border border-zinc-300 px-4 py-3 text-sm
                     resize-y focus:outline-none focus:ring-2 focus:ring-[#93c0a4]"
                />

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-xl bg-[#93c0a4] px-5 py-2.5 text-sm font-medium
                       text-zinc-900 transition
                       hover:bg-[#b6c4a2]
                       disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creando..." : "Crear nota"}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default NoteForm;
