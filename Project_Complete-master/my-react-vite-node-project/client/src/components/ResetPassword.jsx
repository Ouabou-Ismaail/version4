import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!email || !code || !newPassword) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        try {
            const response = await axios.post(
               "http://localhost/api/reset-password.php",
                { email, code, newPassword },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.data.message) {
                alert(response.data.message);
                navigate("/");
            } else {
                setError("Erreur lors de la réinitialisation du mot de passe.");
            }
        } catch (error) {
            setError("Erreur lors de la réinitialisation du mot de passe !");
            console.error(error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="overlay"></div>
            <div className="card p-4 shadow-lg" style={{ width: "400px", position: "relative", zIndex: 1, background: "transparent", borderRadius: "30px" }}>
                <h2 className="text-center text-primary">Réinitialiser le mot de passe</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleResetPassword}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Code de réinitialisation</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nouveau mot de passe</label>
                        <input
                            type="password"
                            className="form-control"
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Réinitialiser
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;