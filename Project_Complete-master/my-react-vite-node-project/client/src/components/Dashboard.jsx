import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="overlay"></div>
            <div className="" style={{ position: "relative", zIndex: 1, borderRadius: "30px" }}>
                <h2 className="text-center text-primary">Tableau de bord</h2>
                <div className="d-grid gap-2">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/profile")}
                    >
                        Voir mon profil
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/take-appointment")}
                    >
                        Prendre un rendez-vous
                    </button>
                    
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/AppointmentsList")}
                    >
                       Liste des RDVs
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/AppointmentsList")}
                    >
                     voire emploie du temps
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;