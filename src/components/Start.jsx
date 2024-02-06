import { NavLink } from "react-router-dom";
import styles from "../styles/Start.module.css";
import NavBar from "./NavBar";
import Button from "@mui/material/Button";

export default function Start() {
  return (
    <div>
      <NavBar />
      <div className={styles.main}>
        <h1>Welcome to WeatherDesk</h1>
        <span>Read the Sky Before You Fly</span>
        <NavLink
          className={styles.link}
          style={{ textDecoration: "none" }}
          to="/signin"
        >
          <Button className="start" variant="contained" disableElevation>
            SIGN IN
          </Button>
        </NavLink>
      </div>
    </div>
  );
}
