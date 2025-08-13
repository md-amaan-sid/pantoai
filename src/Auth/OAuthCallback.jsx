import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      api.post("/auth/github/callback", { code })
        .then(() => navigate("/profile"))
        .catch(() => navigate("/"));
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <div style={{ textAlign: "center", marginTop: "50px" }}>Logging you in...</div>;
}
