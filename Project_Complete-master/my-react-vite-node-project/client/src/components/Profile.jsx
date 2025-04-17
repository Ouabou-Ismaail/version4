import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaVenusMars,
  FaMapMarkerAlt,
  FaStethoscope,
  FaUserMd,
  FaEdit,
  FaArrowLeft,
  FaSignOutAlt,
  FaCalendarAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        console.log("Contenu de localStorage : ", storedUser);

        if (!storedUser) {
          console.log("Token manquant, redirection vers login");
          navigate("/login");
          return;
        }

        const parsedUser = JSON.parse(storedUser);
        const token = parsedUser?.token;
        console.log("Token récupéré : ", token);

        if (!token) {
          setError("Token manquant");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost/api/getPatient.php",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Réponse API : ", response.data);

        if (response.data.success) {
          setPatient(response.data.patient);
        } else {
          setError(response.data.message || "Erreur lors du chargement");
        }
      } catch (error) {
        console.error("Erreur :", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("user");
          navigate("/login");
        }
        setError(
          error.response?.data?.message || "Erreur de connexion au serveur"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [navigate]);

  // Log de l'état patient
  useEffect(() => {
    console.log("Données patient : ", patient);
  }, [patient]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Navbar */}
      <Navbar className="navbar-custom shadow-sm" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand className="d-flex align-items-center">
            <img
              src="/logo.png"
              alt="Logo"
              style={{
                width: "170px",
                height: "80px",
                marginLeft: "-100px",
              }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav
              style={{ marginRight: "-100px" }}
              className="ms-auto align-items-center"
            >
              <Nav.Link
                onClick={() => navigate("/profile")}
                className="active-link"
                style={{ padding: "0.4rem 1.2rem ", marginLeft: "0.3rem" }}
              >
                <FaUser className="me-1" />
                Profil
              </Nav.Link>

              <Nav.Link
                onClick={() => navigate("/take-appointment")}
                style={{ padding: "0.6rem 1.2rem ", marginLeft: "1rem" }}
              >
                <FaCalendarAlt className="me-1" />
                Prendre RDV
              </Nav.Link>

              <Nav.Link
                onClick={() => navigate("/AppointmentsList")}
                style={{ padding: "0.6rem 1.2rem ", marginLeft: "1rem" }}
              >
                <FaCalendarCheck className="me-1" />
                Mes RDV
              </Nav.Link>

              <Nav.Link
                onClick={handleLogout}
                style={{ padding: "0.4rem 1.2rem ", marginLeft: "0.3rem" }}
              >
                <FaSignOutAlt className="me-1" />
                Déconnexion
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <div className="main-content container py-5">
        <div className="profile-card card shadow p-4 mt-5">
          <div className="text-center mb-4">
            <div className="avatar-container mx-auto mb-3">
              <FaUser className="avatar-icon" />
            </div>
            <h2 className="text-primary fw-bold">
              {patient?.prenom} {patient?.nom}
            </h2>
            <Badge pill bg="info" className="fs-6 px-3 py-1">
              Patient
            </Badge>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <InfoCard
                title="Informations Personnelles"
                icon={<FaIdCard />}
                color="#6f42c1"
                items={[
                  {
                    icon: <FaIdCard />,
                    title: "CIN",
                    value: patient?.cin || "Non spécifié",
                  },
                  {
                    icon: <FaVenusMars />,
                    title: "Genre",
                    value: patient?.gender || "Non spécifié",
                  },
                  {
                    icon: <FaUser />,
                    title: "Âge",
                    value: patient?.age ? `${patient.age} ans` : "Non spécifié",
                  },
                ]}
              />
            </div>

            <div className="col-md-6">
              <InfoCard
                title="Contact"
                icon={<FaEnvelope />}
                color="#20c997"
                items={[
                  {
                    icon: <FaEnvelope />,
                    title: "Email",
                    value: patient?.email,
                  },
                  {
                    icon: <FaPhone />,
                    title: "Téléphone",
                    value: patient?.numero_Tele || "Non spécifié",
                  },
                  {
                    icon: <FaMapMarkerAlt />,
                    title: "Adresse",
                    value: patient?.adress || "Non spécifiée",
                  },
                ]}
              />
            </div>

            <div className="col-12">
              <InfoCard
                title="Informations de Santé"
                icon={<FaStethoscope />}
                color="#fd7e14"
                items={[
                  {
                    icon: <FaStethoscope />,
                    title: "Problème de santé",
                    value: patient?.pb || "Non spécifié",
                  },
                  {
                    icon: <FaUserMd />,
                    title: "Médecin traitant",
                    value: patient?.doctor_traitant || "Non spécifié",
                  },
                ]}
              />
            </div>
          </div>

          {/* Bouton centré */}
          <div className="d-flex justify-content-center mt-5">
            <button
              style={{ width: "300px" }}
              className="btn btn-primary px-5 py-2 rounded-pill"
              onClick={() => navigate("/edit-profile")}
            >
              <FaEdit className="me-2" />
              Modifier Profil
            </button>
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .navbar-custom {
          background-color: #3f51b9 !important;
          padding: 0;
        }

        .navbar-custom .nav-link,
        .navbar-custom .navbar-brand {
          color:rgb(214, 213, 220) !important;
          font-weight: 500;
        }

        .profile-page {
          background: linear-gradient(135deg, #f9f9fd, #f0f4ff);
          min-height: 100vh;
        }

        .profile-card {
          border-radius: 1rem;
          background-color: #ffffff;
        }

        .avatar-container {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6f42c1, #4e73df);
          color: white;
          font-size: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .active-link {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 0.5rem;
        }

        @media (max-width: 768px) {
          .avatar-container {
            width: 80px;
            height: 80px;
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

const InfoCard = ({ title, icon, color, items }) => (
  <div className="info-card card border-0 shadow-sm h-100">
    <div
      className="card-header d-flex align-items-center"
      style={{ backgroundColor: color, color: "#fff" }}
    >
      {icon}
      <h5 className="mb-0 ms-2">{title}</h5>
    </div>
    <div className="card-body">
      <ul className="list-unstyled mb-0">
        {items.map((item, index) => (
          <InfoItem key={index} {...item} color={color} />
        ))}
      </ul>
    </div>
  </div>
);

const InfoItem = ({ icon, title, value, color }) => (
  <li className="mb-3 d-flex align-items-start">
    <div
      className="rounded-circle p-2 me-3 text-white d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: color,
        width: "40px",
        height: "40px",
        minWidth: "40px",
      }}
    >
      {icon}
    </div>
    <div>
      <small className="text-muted d-block">{title}</small>
      <p className="mb-0 fw-bold fs-5">{value}</p>
    </div>
  </li>
);

export default Profile;
