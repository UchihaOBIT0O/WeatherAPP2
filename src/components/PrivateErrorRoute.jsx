import { Navigate } from "react-router-dom";

export default function PrivateErrorRoute({
  errorCode,
  errorCodeLogin,
  errorMessage,
  errorMessageLogin,
  children,
}) {
  return errorCode && errorMessage && errorCodeLogin && errorMessageLogin ? (
    children
  ) : (
    <Navigate to="/" />
  );
}
