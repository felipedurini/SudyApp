import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { register as registerService } from "../api/auth";
import registerBg from "../images/register-background.jpg";

const Register = () => {
  const [status, setStatus] = useState("idle"); // idle | loading | error | success
  const navigate = useNavigate();

  const handleRegister = async ({ email, password }) => {
    setStatus("loading");
    try {
      await registerService({ email, password });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  // redirect automático post-success
  useEffect(() => {
    if (status === "success") {
      const t = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [status, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${registerBg})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* card */}
      <div
        className="relative w-full max-w-sm rounded-2xl
                   bg-white/10 backdrop-blur-md
                   border border-white/20
                   px-8 py-10 text-white"
      >
        <h1 className="text-2xl font-medium text-center">
          Crear cuenta
        </h1>

        <p className="mt-1 mb-8 text-sm text-center text-white/70">
          Empezá tu espacio de estudio
        </p>

        {status === "success" ? (
          <p className="text-sm text-center text-white/80">
            Usuario creado correctamente.
            Redirigiendo al login…
          </p>
        ) : (
          <RegisterForm
            onSubmit={handleRegister}
            loading={status === "loading"}
          />
        )}

        {status === "error" && (
          <p className="mt-4 text-sm text-red-300 text-center">
            Error al crear el usuario
          </p>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-white/70">
            ¿Ya tenés cuenta?{" "}
            <Link
              to="/login"
              className="text-white underline underline-offset-4 hover:text-white/90"
            >
              Iniciá sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
