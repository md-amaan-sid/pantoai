import React, { useState } from "react";
import './login.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    alert(`Username: ${username}\nPassword: ${password}`);
  };

  const handleOAuthLogin = (provider) => {
    // Replace with actual OAuth logic
    alert(`Login with ${provider}`);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <hr />
      <button onClick={() => handleOAuthLogin("GitHub")}>
        Login with GitHub
      </button>
      <button onClick={() => handleOAuthLogin("GitLab")}>
        Login with GitLab
      </button>
      <button onClick={() => handleOAuthLogin("Bitbucket")}>
        Login with Bitbucket
      </button>
    </div>
  );
};

export default Login;
