import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar, Nav, Container, Alert, Badge } from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaVenusMars,
  FaMapMarkerAlt,
  FaStethoscope,
  FaUserMd,
  FaSave,
  FaArrowLeft,
  FaSignOutAlt,
  FaCalendarAlt,
  FaCalendarCheck,
  FaEdit
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const EditProfile = () => {
  const [patient, setPatient] = useState({
    name: "",
    email: "",
    tel: "",
    address: "",
    cin: "",
    gender: "",
    pb: "",
    doctor_traitant: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(
          "http://localhost/api/getPatient.php",
          { withCredentials: true }
        );

        if (response.data.success) {
          const patientData = response.data.patient;
          setPatient({
            name: `${patientData.prenom || ""} ${patientData.nom || ""}`.trim(),
            email: patientData.email || "",
            tel: patientData.numero_Tele || "",
            address: patientData.adress || "",
            cin: patientData.cin || "",
            gender: patientData.gender || "",
            pb: patientData.pb || "",
            doctor_traitant: patientData.doctor_traitant || "",
          });
        } else {
          setError(response.data.message || "Erreur lors du chargement");
        }
      } catch (error) {
        console.error("Erreur:", error);
        if (error.response?.status === 401) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost/api/updatePatient.php",
        patient,
        { withCredentials: true }
      );

      if (response.data.success) {
        setSuccess(response.data.message);
        setTimeout(() => navigate("/profile"), 1500);
      } else {
        setError(response.data.message || "Échec de la mise à jour");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setError(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la mise à jour du profil"
      );
    }
  };

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

  return (
    <div className="profile-page">
      {/* Navbar identique au composant Profile */}
      <Navbar className="navbar-custom shadow-sm" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/dashboard" className="d-flex align-items-center">
            <img
              src="logo.png"
              alt="Logo"
              className="me-2"
              style={{ width: "40px", height: "40px", objectFit: "contain" }}
            />
            <span className="fw-bold">Clinique Santé</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link onClick={() => navigate("/take-appointment")}>
                <FaCalendarAlt className="me-1" />
                Prendre RDV
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/AppointmentsList")}>
                <FaCalendarCheck className="me-1" />
                Mes RDV
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/profile")}>
                <FaUser className="me-1" />
                Profil
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>
                <FaSignOutAlt className="me-1" />
                Déconnexion
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content avec un design similaire */}
      <div className="main-content container py-5">
        <div className="profile-card card shadow p-4 mt-5">
          <div className="text-center mb-4">
            <div className="avatar-container mx-auto mb-3">
              <FaUser className="avatar-icon" />
            </div>
            <h2 className="text-primary fw-bold">Modifier Profil</h2>
            <Badge pill bg="info" className="fs-6 px-3 py-1">
              Patient
            </Badge>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="info-card card border-0 shadow-sm h-100">
                  <div className="card-header d-flex align-items-center" style={{ backgroundColor: "#6f42c1", color: "#fff" }}>
                    <FaIdCard />
                    <h5 className="mb-0 ms-2">Informations Personnelles</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">
                        <FaUser className="me-2" />
                        Nom complet
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={patient.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        <FaIdCard className="me-2" />
                        CIN
                      </label>
                      <input
                        type="text"
                        name="cin"
                        className="form-control"
                        value={patient.cin}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        <FaVenusMars className="me-2" />
                        Genre
                      </label>
                      <select
                        name="gender"
                        className="form-select"
                        value={patient.gender}
                        onChange={handleChange}
                      >
                        <option value="">Sélectionner</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="info-card card border-0 shadow-sm h-100">
                  <div className="card-header d-flex align-items-center" style={{ backgroundColor: "#20c997", color: "#fff" }}>
                    <FaEnvelope />
                    <h5 className="mb-0 ms-2">Contact</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">
                        <FaEnvelope className="me-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={patient.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        <FaPhone className="me-2" />
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="tel"
                        className="form-control"
                        value={patient.tel}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        <FaMapMarkerAlt className="me-2" />
                        Adresse
                      </label>
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={patient.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="info-card card border-0 shadow-sm h-100">
                  <div className="card-header d-flex align-items-center" style={{ backgroundColor: "#fd7e14", color: "#fff" }}>
                    <FaStethoscope />
                    <h5 className="mb-0 ms-2">Informations de Santé</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">
                        <FaStethoscope className="me-2" />
                        Problème de santé
                      </label>
                      <input
                        type="text"
                        name="pb"
                        className="form-control"
                        value={patient.pb}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        <FaUserMd className="me-2" />
                        Médecin traitant
                      </label>
                      <input
                        type="text"
                        name="doctor_traitant"
                        className="form-control"
                        value={patient.doctor_traitant}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-5">
              <button
                type="button"
                className="btn btn-secondary px-4 py-2 rounded-pill"
                onClick={() => navigate("/profile")}
              >
                <FaArrowLeft className="me-2" />
                Retour
              </button>
              <button 
                type="submit" 
                className="btn btn-primary px-4 py-2 rounded-pill"
              >
                <FaSave className="me-2" />
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Styles identiques */}
      <style>{`
        .navbar-custom {
          background-color: #e7dbf9 !important;
        }

        .navbar-custom .nav-link,
        .navbar-custom .navbar-brand {
          color: #2b244d !important;
          font-weight: 500;
        }

        .profile-page {
          background: linear-gradient(135deg, #f9f9fd, #f0f4ff);
          min-height: 100vh;
          padding-top: 80px;
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

        .avatar-icon {
          font-size: 2rem;
        }

        .info-card {
          border-radius: 0.75rem;
          transition: transform 0.2s;
        }

        .info-card:hover {
          transform: translateY(-5px);
        }

        .info-card .card-header {
          border-radius: 0.75rem 0.75rem 0 0 !important;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .avatar-container {
            width: 80px;
            height: 80px;
          }
          .avatar-icon {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EditProfile;