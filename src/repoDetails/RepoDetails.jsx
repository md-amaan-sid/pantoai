import React from "react";
import "./RepoDetails.css";

export default function RepoDetails() {
  const repo = {
    name: "user/repo1",
    autoReview: true,
    stars: 52,
    defaultBranch: "main",
    linesInDefault: 12374,
  };

  return (
    <div className="repo-details-container">
      <button className="back-btn" onClick={() => window.history.back()}>
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
        <input type="text" value={repo.linesInDefault.toLocaleString()} readOnly />
      </div>
    </div>
  );
}
