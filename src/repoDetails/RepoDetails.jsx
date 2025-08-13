import React, { useEffect, useState } from "react";
import "./RepoDetails.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function RepoDetails() {
  const { state } = useLocation();
  if (!state?.repo) {
    useNavigate("/repos");
    return null;
  }
  const repo = state.repo;

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [lines, setLines] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get(`${renderBackendApiUrl}/provider/me`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchLines() {
      try {
        const [owner, repoName] = repo.name.split("/");
        const res = await axios.get(
          `${renderBackendApiUrl}/provider/repo-lines/${owner}/${repoName}`,
          { withCredentials: true }
        );
        setLines(res.data.totalLines);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLines();
  }, [repo.name]);
  repo.linesInDefault = lines;
  return (
    <div className="repo-details-container">
      <div className="repos-header">
        {user && (
          <img
            src={user.avatar}
            alt="Avatar"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() => navigate("/profile")}
          />
        )}
      </div>
      <button className="back-btn" onClick={() => navigate("/repos")}>
        ← Back
      </button>

      <h2>Repo: {repo.name}</h2>

      <div className="detail-row">
        <label>Auto review status</label>
        <input
          type="text"
          value={repo.autoReview ? "Enabled" : "Disabled"}
          readOnly
        />
      </div>

      <div className="detail-row">
        <label>No of stars</label>
        <input type="text" value={repo.stars} readOnly />
      </div>

      <div className="detail-row">
        <label>Default branch name</label>
        <input type="text" value={repo.defaultBranch} readOnly />
      </div>

      <div className="detail-row">
        <label>No of lines in default branch</label>
        <input
          type="text"
          value={repo.linesInDefault?.toLocaleString() || "Calculating..."}
          readOnly
        />
      </div>
    </div>
  );
}
