import "./Profile.css";

export default function Profile() {
  const userData = {
    displayName: "Rahul Goyal",
    username: "rahulg006",
    totalRepos: 126,
    autoReviewRepos: 52,
    initials: "RG"
  };

  const handleLogout = () => {
    // TODO: Clear auth state and redirect to login
    console.log("Logged out");
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Account</h2>
        <div className="profile-initials">{userData.initials}</div>
      </div>

      <div className="profile-form">
        <label>Display name</label>
        <input type="text" value={userData.displayName} readOnly />

        <label>Username</label>
        <input type="text" value={userData.username} readOnly />

        <label>Total number of repositories</label>
        <input type="text" value={userData.totalRepos} readOnly />

        <label>No of auto review enabled repositories</label>
        <input type="text" value={userData.autoReviewRepos} readOnly />
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
