import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Subjects from "./pages/Subjects";
import Notes from "./pages/Notes";
import Pomodoro from "./pages/Pomodoro";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/subjects"
        element={
          <ProtectedRoute>
            <>
              <Subjects />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/subjects/:id"
        element={
          <ProtectedRoute>
            <>
              <Notes />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/pomodoro"
        element={
          <ProtectedRoute>
            <Pomodoro />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
