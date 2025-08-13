import React, { useState } from "react";
import "./login.css";
import { api, renderBackendApiUrl } from "../utils/api"; // helper for backend calls
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
    // This will redirect to your backend provide OAuth route
    window.location.href = `${renderBackendApiUrl}/provider/${provider}/login`;
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
      <h3>Welcome!</h3>
      <h2>Git Management System</h2>

      <button onClick={() => handleOAuthLogin("github")}>
        Login with GitHub
      </button>
      <button onClick={() => handleOAuthLogin("gitlab")}>
        Login with GitLab
      </button>
      {/* <button onClick={() => handleOAuthLogin("Bitbucket")}>
        Login with Bitbucket
      </button> */}
    </div>
  );
};

export default Login;
