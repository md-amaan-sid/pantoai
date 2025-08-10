import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./repo.css";

export default function Repos() {
  const [repos, setRepos] = useState([
    { name: "user/repo1", autoReview: false },
    { name: "user/repo2", autoReview: true },
    { name: "user/repo3", autoReview: false },
  ]);

  const navigate = useNavigate();

  const toggleAutoReview = (index) => {
    const updated = [...repos];
    updated[index].autoReview = !updated[index].autoReview;
    setRepos(updated);
  };

  // ✅ Updated: direct navigation to RepoDetails
  const openRepo = () => {
    navigate("/repos/:repoName");
  };

  return (
    <div className="repos-container">
      <header className="repos-header">
        <h2>Hello, Amaan</h2>
        <div className="profile-icon">AG</div>
      </header>

      <h1 className="repos-title">Repos</h1>

      <div className="repos-list">
        {repos.map((repo, index) => (
          <div className="repo-item" key={index}>
            <span
              className="repo-name"
              onClick={openRepo} // ✅ Only change here
              style={{ cursor: "pointer" }}
            >
              {repo.name}
            </span>
            <label className="switch">
              <input
                type="checkbox"
                checked={repo.autoReview}
                onChange={() => toggleAutoReview(index)}
              />
              <span className="slider"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
