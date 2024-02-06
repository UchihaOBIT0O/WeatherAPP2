import { BrowserRouter, Routes, Route } from "react-router-dom";
import Weather from "./components/Weather";
import Start from "./components/Start";
import "./App.css";
import Singin from "./components/Singin";
import Signup from "./components/Signup";
import Error from "./components/Error";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import PrivateRoute from "./components/PrivateRoute";
import PrivateErrorRoute from "./components/PrivateErrorRoute";

export default function App() {
  const [user, setUser] = useState(null);
  const errorCode = localStorage?.getItem("errorCode");
  const errorCodeLogin = localStorage?.getItem("errorCodeLogin");
  const errorMessageLogin = localStorage?.getItem("errorMessageLogin");
  const errorMessage = localStorage?.getItem("errorMessage");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        return;
      }

      setUser(null);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="main">
      <BrowserRouter>
        <Routes>
          <Route index element={<Start />} />

          <Route
            path="/weather"
            element={
              <PrivateRoute user={user}>
                <Weather />
              </PrivateRoute>
            }
          />

          <Route
            path="/error"
            element={
              <PrivateErrorRoute
                errorCode={errorCode}
                errorCodeLogin={errorCodeLogin}
                errorMessage={errorMessage}
                errorMessageLogin={errorMessageLogin}
              >
                <Error />
              </PrivateErrorRoute>
            }
          />
          <Route path="/signin" element={<Singin user={user} />} />
          <Route path="/signup" element={<Signup user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
