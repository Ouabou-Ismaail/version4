import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        overflow: "hidden",
      }}
    >
      <div
        className="glass-card p-5 text-center"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.25)",
          borderRadius: "20px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          width: "100%",
          maxWidth: "500px",
          height: "500px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.15)",
          }}
        ></div>

        <h2
          className="mb-4"
          style={{
            color: "#2c3e50",
            fontWeight: "700",
            paddingBottom: "30px",
            fontSize: "2rem",
            textShadow: "1px 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          Tableau de bord
        </h2>

        <div className="d-grid gap-3">
          <button
            className="btn btn-dashboard"
            onClick={() => navigate("/profile")}
            style={{
              backgroundColor: "rgba(52, 152, 219, 0.8)",
              border: "none",
              color: "white",
              margin: "auto",
              padding: "12px",
              width: "400px",
              borderRadius: "50px",
              marginBottom: "30px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(52, 152, 219, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(52, 152, 219, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(52, 152, 219, 0.3)";
            }}
          >
            Voir mon profil
          </button>

          <button
            className="btn btn-dashboard"
            onClick={() => navigate("/take-appointment")}
            style={{
              backgroundColor: "rgba(46, 204, 113, 0.8)",
              border: "none",
              color: "white",
              margin: "auto",
              marginBottom: "30px",

              padding: "12px",
              width: "400px",
              borderRadius: "50px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(46, 204, 113, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(46, 204, 113, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(46, 204, 113, 0.3)";
            }}
          >
            Prendre un rendez-vous
          </button>

          <button
            className="btn btn-dashboard"
            onClick={() => navigate("/AppointmentsList")}
            style={{
              backgroundColor: "rgba(155, 89, 182, 0.8)",
              border: "none",
              color: "white",
              margin: "auto",
              marginBottom: "30px",

              padding: "12px",
              width: "400px",
              borderRadius: "50px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(155, 89, 182, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(155, 89, 182, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(155, 89, 182, 0.3)";
            }}
          >
            Liste des RDVs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
