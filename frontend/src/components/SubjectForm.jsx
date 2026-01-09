import { useState } from "react";

const SubjectForm = ({ onSubmit, loading }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description });
    setName("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm
                   focus:outline-none focus:ring-2 focus:ring-[#93c0a4]"
      />

      <input
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm
                   focus:outline-none focus:ring-2 focus:ring-[#93c0a4]"
      />

      <button
        type="submit"
        disabled={loading}
        className="shrink-0 rounded-xl bg-[#93c0a4] px-5 py-2.5 text-sm font-medium
                   text-zinc-900 transition
                   hover:bg-[#b6c4a2]
                   disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Creando..." : "Crear"}
      </button>
    </form>
  );
};

export default SubjectForm;
