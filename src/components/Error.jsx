export default function Error({}) {
  const errorCode = localStorage?.getItem("errorCode");
  const errorMessage = localStorage?.getItem("errorMessage");
  const errorCodeLogin = localStorage?.getItem("errorCodeLogin");
  const errorMessageLogin = localStorage?.getItem("errorMessageLogin");

  const styles = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "30px",
  };
  return (
    <div style={styles}>
      {errorCode && errorMessage && <h1>{(errorCode, errorMessage)}</h1>}
      {errorCodeLogin && errorMessageLogin && (
        <h1>{(errorCodeLogin, errorMessageLogin)}</h1>
      )}
    </div>
  );
}
