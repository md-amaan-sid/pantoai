import React, { useState } from "react";
import "./login.css";
import api from "../utils/api"; // helper for backend calls
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleOAuthLogin = (provider) => {
    if (provider === "GitHub") {
      // This will redirect to your backend GitHub OAuth route
      window.location.href = "http://localhost:4000/auth/github";
    } else {
      alert(`Login with ${provider}`);
    }
  };

  // After OAuth redirect back to frontend, check if user is authenticated
  React.useEffect(() => {
    api
      .get("/auth/status")
      .then((res) => {
        if (res.data.authenticated) {
          navigate("/repos");
        }
      })
      .catch(() => {});
  }, [navigate]);

  return (
    <div className="login-container">
      <h3>Welcome To </h3>
      <h2>Git Management System</h2>
      
      <button onClick={() => handleOAuthLogin("GitHub")}>
        Login with GitHub
      </button>
      <button onClick={() => handleOAuthLogin("GitLab")}>
        Login with GitLab
      </button>
      {/* <button onClick={() => handleOAuthLogin("Bitbucket")}>
        Login with Bitbucket
      </button> */}
    </div>
  );
};

export default Login;
