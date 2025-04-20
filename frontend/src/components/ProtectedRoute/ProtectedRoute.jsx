import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  isLoggedIn,
  children,
  anonymous = false,
}) {
  const location = useLocation();
  const from = location.state?.from || "/";

  // Si el usuario está autenticado y la ruta es anónima, redirigir a la ruta origen
  if (anonymous && isLoggedIn) return <Navigate to={from} />;

  // Si el usuario no está autenticado y la ruta no es anónima, redirigir al inicio de sesión
  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
}
