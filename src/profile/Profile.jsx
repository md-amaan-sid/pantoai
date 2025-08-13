import "./Profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Fetch user data info
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(
          "http://localhost:4000/provider/profile",
          {
            withCredentials: true,
          }
        );
        setUserData(response.data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setUserData(null); // Set to null on error
      }
    }
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/provider/logout",
        {},
        { withCredentials: true }
      );
      // Redirect to login page
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (!userData) {
    return <p>Loading...</p>; // avoid rendering before data is ready
  }
  // Extract initials
  const initials = userData.name
    ? userData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : userData.username[0].toUpperCase();

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button
          className="back-btn"
          onClick={() => navigate("/repos")}
          style={{ marginRight: "1rem" }}
        >
          Repos
        </button>
        <h2>Account</h2>
        {userData.avatar ? (
          <img src={userData.avatar_url} alt="Avatar" width={50} />
        ) : (
          <div className="profile-initials">{initials}</div>
        )}
      </div>

      <div className="profile-form">
        <label>Display name</label>
        <input type="text" value={userData.name || ""} readOnly />

        <label>Username</label>
        <input type="text" value={userData.username || ""} readOnly />

        <label>Total number of repositories</label>
        <input type="text" value={userData.public_repos ?? ""} readOnly />

        <label>No of auto review enabled repositories</label>
        <input
          type="text"
          value={(() => {
            const repos = JSON.parse(
              localStorage.getItem("repoToggles") || "[]"
            );
            return repos.filter((r) => r.autoReview).length;
          })()}
          readOnly
        />
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
