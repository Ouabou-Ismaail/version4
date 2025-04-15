import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Veuillez entrer votre email.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/api/forgot-password.php",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.message) {
        alert(response.data.message);
        navigate("/reset-password");
      } else {
        setError(
          response.data.error ||
            "Erreur lors de l'envoi du code. Veuillez réessayer."
        );
      }
    } catch (error) {
      setError("Erreur lors de l'envoi du code !");
      console.error(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="overlay"></div>
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "400px",
          position: "relative",
          zIndex: 1,
          background: "transparent",
          borderRadius: "30px",
        }}
      >
        <h2 className="text-center text-primary">Mot de passe oublié</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Envoyer le code
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
