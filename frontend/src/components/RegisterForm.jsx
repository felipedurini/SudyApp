import { useState } from "react";

const RegisterForm = ({ onSubmit, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError(null);
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-white/70">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-lg bg-white/10 border border-white/20
                     px-4 py-2.5 text-sm text-white
                     focus:outline-none focus:ring-2 focus:ring-white/40"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-white/70">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded-lg bg-white/10 border border-white/20
                     px-4 py-2.5 text-sm text-white
                     focus:outline-none focus:ring-2 focus:ring-white/40"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-white/70">Repetir contraseña</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="rounded-lg bg-white/10 border border-white/20
                     px-4 py-2.5 text-sm text-white
                     focus:outline-none focus:ring-2 focus:ring-white/40"
        />
      </div>

      {error && (
        <p className="text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full rounded-lg bg-white py-2.5 text-sm font-medium
                   text-zinc-900 transition
                   hover:bg-white/90
                   disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Creando..." : "Crear cuenta"}
      </button>
    </form>
  );
};

export default RegisterForm;
