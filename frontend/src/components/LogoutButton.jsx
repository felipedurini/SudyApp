import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-xl border border-zinc-300 px-4 py-2 text-sm
                 text-zinc-600 transition
                 hover:bg-zinc-100 hover:text-zinc-800"
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
