import { useState } from "react";

const LoginForm = ({ onSubmit, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-white/70">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-lg bg-white/10 border border-white/20
                 px-4 py-2.5 text-sm text-white
                 placeholder-white/40
                 focus:outline-none focus:ring-2 focus:ring-white/40"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-white/70">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded-lg bg-white/10 border border-white/20
                 px-4 py-2.5 text-sm text-white
                 placeholder-white/40
                 focus:outline-none focus:ring-2 focus:ring-white/40"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-white text-zinc-900
               py-2.5 text-sm font-medium
               transition hover:bg-white/90
               disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Cargando..." : "Ingresar"}
      </button>
    </form>
  );
};

export default LoginForm;
