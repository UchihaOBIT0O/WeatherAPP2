import { useState } from "react";
import styles from "../styles/Signin.module.css";
import { Button } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";
import { Navigate, useNavigate } from "react-router-dom";

export default function Singin({ user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSingUp(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/weather");
      })
      .catch((error) => {
        if (!error) {
          localStorage.setItem("errorCode", error.code);
          localStorage.setItem("errorMessage", error.message);
          navigate("/error");
        }
      });
  }

  if (user) return <Navigate to="/weather" />;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSingUp} action="">
        <legend>CREATE YOUR ACCOUNT</legend>
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
          Sign Up
        </Button>
      </form>
    </div>
  );
}
