import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import "./repo.css";
import { api } from "../utils/api";

export default function Repos() {
  const [repos, setRepos] = useState([]);
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // If we have user data from redirect, save it
    console.log("Search params:", searchParams);
    const userParam = searchParams.get("user");
    if (userParam) {
      const userData = JSON.parse(decodeURIComponent(userParam));
      localStorage.setItem("githubUser", JSON.stringify(userData));
      setUser(userData);
    } else {
      // Otherwise, load from localStorage
      const storedUser = localStorage.getItem("githubUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [searchParams]);

  const toggleAutoReview = (index) => {
    const updated = [...repos];
    updated[index].autoReview = !updated[index].autoReview;
    setRepos(updated);
    // Save to localStorage
    localStorage.setItem("repoToggles", JSON.stringify(updated));
  };
  useEffect(() => {
    // Load toggles from localStorage if present
    const toggles = localStorage.getItem("repoToggles");
    if (toggles) {
      setRepos(JSON.parse(toggles));
    } else {
      api
        .get("/provider/repos")
        .then((res) => {
          console.log("Fetched repos:", res);
          // Add autoReview property if not present
          const reposWithToggle = res.data.map((r) => ({
            name: r.full_name,
            autoReview: false,
            stars: r.stargazers_count,
            defaultBranch: r.default_branch,
            linesInDefault: 0,
          }));
          setRepos(reposWithToggle);
        })
        .catch(() => navigate("/")); // redirect if not logged in
    }
  }, [navigate]);

  // Updated: direct navigation to RepoDetails
  const openRepo = (repo) => {
    console.log("Opening repo:", repo);
    navigate(`/repos/details`, {
      state: { repo },
    });
  };

  return (
    <div className="repos-container">
      <header className="repos-header">
        {user && (
          <div>
            <h1>Welcome, {user.name || user.username}</h1>
          </div>
        )}
        <div className="profile-icon">
          {user && (
            <img
              src={user.avatar}
              alt="Avatar"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "2px solid #0052cc",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={() => navigate("/profile")}
            />
          )}
        </div>
      </header>

      <h2 className="repos-title">Total Repos - {user && user.publicRepos}</h2>

      <div className="repos-list">
        {repos.map((repo, index) => (
          <div className="repo-item" key={index}>
            <span
              className="repo-name"
              onClick={() => openRepo(repo)}
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
