import { useState } from "react";
import styles from "../styles/Signin.module.css";
import { Button } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Singin({ user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/weather");
      })
      .catch((error) => {
        if (error) {
          localStorage.setItem("errorCodeLogin", error.code);
          localStorage.setItem("errorMessageLogin", error.message);
          navigate("/error");
        }
      });
  }

  if (user) return <Navigate to="/weather" />;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSignIn} action="">
        <legend>LOGIN TO YOUR ACCOUNT</legend>
        <input
          type="email"
          name="email"
          placeholder="enter your email"
          id=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id=""
          placeholder="enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button type="submit" variant="contained" disableElevation>
          Log In
        </Button>
        <Link to="/signup">SignUp</Link>
      </form>
    </div>
  );
}
