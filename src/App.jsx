import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./login/login";
import Profile from "./profile/Profile";
import RepoDetails from "./repoDetails/RepoDetails";
import Repos from "./userRepo/repo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/repos" element={<Repos />} />
        <Route path="/repos/:repoName" element={<RepoDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
