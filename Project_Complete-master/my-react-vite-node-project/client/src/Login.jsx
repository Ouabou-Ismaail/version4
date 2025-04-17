import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Button } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const staticAccounts = [
    {
      id: 1,
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
      name: "Administrateur",
    },
    {
      id: 2,
      email: "directeur@gmail.com",
      password: "directeur123",
      role: "directeur",
      name: "directeur",
    },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const staticUser = staticAccounts.find(
      (user) => user.email === email && user.password === password
    );

    if (staticUser) {
      localStorage.setItem("user", JSON.stringify(staticUser));
      localStorage.setItem("id_user", staticUser.id);
      navigate(
        staticUser.role === "admin"
          ? "/admin-dashboard"
          : staticUser.role === "directeur"
          ? "/directeurLayout"
          : "/profile"
      );
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/api/login.php",
        {
          email,
          password,
        },
        {
          withCredentials: true, // OBLIGATOIRE
        }
      );

      if (response.data.success) {
        const user = response.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("id_user", user.id);

        if (user.role === "directeur") {
          navigate("/directeurLayout");
        } else {
          navigate("/profile");
        }
      } else {
        setError(response.data.message || "Email ou mot de passe incorrect");
      }
    } catch (error) {
      console.error("Erreur API:", error);
      setError(
        error.response?.data?.message ||
          "Erreur de connexion au serveur. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background:
          "linear-gradient(135deg,rgb(200, 219, 251) 0%, #F9FBFF 100%)",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div
        className="p-4"
        style={{
          width: "100%",
          minWidth: "520px",
          maxWidth: "540px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <h3
          className="text-center mb-4"
          style={{ color: "#3b82f6", fontWeight: 600 }}
        >
          Bienvenue 👋
        </h3>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label text-muted">Adresse Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email"
              style={{
                borderRadius: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                border: "1px solid #ddd",
                fontSize: "19px",
                padding: "14px 10px",
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-muted">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="password"
              style={{
                borderRadius: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                border: "1px solid #ddd",
                fontSize: "19px",
                padding: "14px 10px",
              }}
            />
          </div>
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "100%",
              padding: "16px",
              marginTop: "16px",
              fontWeight: "bold",
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Connexion...
              </>
            ) : (
              "Se connecter"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
