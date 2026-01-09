import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../components/LoginForm";
import { loginStart, loginSuccess, loginError } from "../store/slices/authSlice";
import { login as loginService } from "../api/auth";
import { useNavigate } from "react-router-dom";
import loginBg from "../images/login-background.png";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);

  const handleLogin = async ({ email, password }) => {
    dispatch(loginStart());
    try {
      const data = await loginService({ email, password });
      dispatch(
        loginSuccess({
          token: data.token,
          user: { email: data.email },
        })
      );
      navigate("/subjects");

    } catch {
      dispatch(loginError());
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >

      {/* overlay oscuro */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* card */}
      <div className="relative w-full max-w-sm rounded-2xl
                    bg-white/10 backdrop-blur-md
                    border border-white/20
                    px-8 py-10 text-white">

        <h1 className="text-2xl font-medium text-center">
          Login
        </h1>

        <p className="mt-1 mb-8 text-sm text-center text-white/70">
          Entrá a tu espacio de estudio
        </p>

        <LoginForm onSubmit={handleLogin} loading={status === "loading"} />

        <div className="mt-6 text-center">
          <p className="text-sm text-white/70">
            ¿No tenés cuenta?{" "}
            <Link
              to="/register"
              className="text-white underline underline-offset-4 hover:text-white/90"
            >
              Registrate
            </Link>
          </p>
        </div>

        {status === "error" && (
          <p className="mt-4 text-sm text-red-300 text-center">
            Error al iniciar sesión
          </p>
        )}
      </div>
    </div>
  );




};

export default Login;
