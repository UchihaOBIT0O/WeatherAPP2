import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export default function NavBar() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from("#logo", {
        opacity: 0,
        x: "-=100",
      }).from("#nav", {
        opacity: 0,
        x: "+=100",
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.navBar} ref={comp}>
      <img
        id="logo"
        className={styles.img}
        src="src\assets\icon.svg"
        alt="obito"
      />
      <ul id="nav" className={styles.list}>
        <li>
          <NavLink
            style={{ textDecoration: "none", display: "none" }}
            to="/signin"
          >
            SignIn
          </NavLink>
        </li>
        <li>
          <NavLink style={{ textDecoration: "none" }} to="/signup">
            SignUp
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
