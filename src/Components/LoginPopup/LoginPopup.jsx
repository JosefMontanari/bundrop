import React, { useEffect, useState } from "react";
import "./LoginPopup.css";
import useLocalStorage from "../../hooks/useLocalStorage";
function LoginPopUp({ setShowLogin, setIsLoggedIn }) {
  const { setLocalStorage } = useLocalStorage();
  const [currentState, setCurrentState] = useState("Login");
  const [inputPassword, setInputPassword] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  function handleSubmitUsername(event) {
    setInputUsername(event.target.value);
  }
  function handleSubmitPassword(event) {
    setInputPassword(event.target.value);
  }
  function handleLogin() {
    const logInUser = { username: inputUsername, password: inputPassword };
    setUser(logInUser);
  }
  function handleRegister() {
    const registerUser = { username: inputUsername, password: inputPassword };
    setUser(registerUser);
  }

  function createUser() {
    user.favorites = [];
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };

    fetch(`http://localhost:3001/users`, postOptions);
  }

  useEffect(() => {
    fetch(`http://localhost:3001/users`)
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, []);

  useEffect(() => {
    if (currentState === "Login") {
      if (user.username && user.password) {
        const matchedUser = allUsers.find(
          (u) => u.username === user.username && u.password === user.password
        );

        if (matchedUser) {
          setLocalStorage("loggedInUser", matchedUser);
          setIsLoggedIn(true);
          setShowLogin(false);
        } else {
          alert("Invalid username or password");
          setInputPassword("");
          setInputUsername("");
          setShowLogin(false);
        }
      }
    } else {
      if (user.username && user.password) {
        const matchedUser = allUsers.find((u) => u.username === user.username);
        if (!matchedUser) {
          setLocalStorage("loggedInUser", user);
          createUser();
          alert("Welcome to Bun Drop");
          setIsLoggedIn(true);
          setShowLogin(false);
        } else {
          alert("That username is already taken");
          setInputPassword("");
          setInputUsername("");
          setShowLogin(false);
        }
      }
    }
  }, [user, allUsers, setLocalStorage, setIsLoggedIn, setShowLogin]);
  return (
    <div className="login-popup">
      <div className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <a onClick={() => setShowLogin(false)}>X</a>
        </div>

        {currentState === "Register" ? (
          <div className="login-inputs">
            <input
              onChange={handleSubmitUsername}
              value={inputUsername}
              type="text"
              placeholder="Desired username"
              required
            />
            <input
              onChange={handleSubmitPassword}
              value={inputPassword}
              type="password"
              placeholder=" Desired password"
              required
            />
            <div className="login-popup-condition">
              <input type="checkbox" required />
              <p>By continuing, i agree to the terms of use & privacy policy</p>
            </div>
          </div>
        ) : (
          <div className="login-inputs">
            <input
              id="username-input"
              onChange={handleSubmitUsername}
              value={inputUsername}
              type="text"
              placeholder="Username"
              required
            />
            <input
              id="password-input"
              onChange={handleSubmitPassword}
              value={inputPassword}
              type="password"
              placeholder="Password"
              required
            />
          </div>
        )}
        {currentState === "Login" ? (
          <button onClick={() => handleLogin()}>Log in</button>
        ) : (
          <button onClick={handleRegister}>Register</button>
        )}

        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Register")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginPopUp;
