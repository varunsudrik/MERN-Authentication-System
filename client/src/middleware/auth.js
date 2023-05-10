import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

export const AuthorizeUser = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
};

export const ProtectPass = ({ children }) => {
  const Username = useAuthStore.getState().auth.Username;
  if (!Username) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
};
