import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSignOutAlt,
  FaCalendarAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";

const TakeAppointment = () => {
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const [date, setDate] = useState(getTomorrowDate());
  const [location, setLocation] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [reservedTimes, setReservedTimes] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [showRedirectButton, setShowRedirectButton] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          "http://localhost/api/get-departments.php"
        );
        const data = await response.json();
        if (response.ok) {
          setDepartments(data.departments);
          if (data.departments.length > 0) {
            setLocation(data.departments[0].nom);
          }
        } else {
          setError("Échec du chargement des départements");
        }
      } catch {
        setError("Erreur lors du chargement des départements");
      } finally {
        setLoadingDepartments(false);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchReservedTimes = async () => {
      if (!date || !location) return;
      try {
        const response = await fetch(
          "http://localhost/api/get-reserved-times.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ date, location }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setReservedTimes(data.reserved || []);
        } else {
          setReservedTimes([]);
        }
      } catch {
        setReservedTimes([]);
      }
    };
    fetchReservedTimes();
  }, [date, location]);

  const availableTimes = [...Array(20)]
    .map((_, i) => {
      const hour = 8 + Math.floor(i / 2);
      const minute = (i % 2) * 30;
      return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}`;
    })
    .filter((time) => !reservedTimes.includes(time));

  const confirmAppointment = async () => {
    if (!selectedTime) return setError("Veuillez sélectionner un horaire");

    try {
      const response = await fetch(
        "http://localhost/api/take-appointment.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date,
            time: selectedTime,
            location,
            patientId: localStorage.getItem("idPatient") || 1,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        setError("");
        setSelectedTime("");
        setShowRedirectButton(true);
      } else {
        setError(data.error || "Erreur lors de la confirmation");
      }
    } catch {
      setError("Erreur de connexion au serveur");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="take-appointment-page">
      <Navbar className="navbar-custom shadow-sm" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/dashboard" className="d-flex align-items-center">
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
              className="ms-auto align-items-center"
              style={{ marginRight: "-100px" }}
            >
              <Nav.Link
                onClick={() => navigate("/profile")}
                style={{ padding: "0.4rem 1.2rem ", marginLeft: "0.3rem" }}
              >
                <FaUser className="me-1" /> Mon Profil
              </Nav.Link>

              <Nav.Link
                onClick={() => navigate("/take-appointment")}
                className="active-link"
                style={{ padding: "0.4rem 1.2rem ", marginLeft: "0.3rem" }}
              >
                <FaCalendarAlt className="me-1" /> Prendre RDV
              </Nav.Link>
              <Nav.Link
                onClick={() => navigate("/AppointmentsList")}
                style={{ padding: "0.4rem 1.2rem ", marginLeft: "0.3rem" }}
              >
                <FaCalendarCheck className="me-1" /> Mes RDV
              </Nav.Link>

              <Nav.Link
                onClick={handleLogout}
                style={{ padding: "0.4rem 1.2rem ", marginLeft: "0.3rem" }}
              >
                <FaSignOutAlt className="me-1" /> Déconnexion
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="main-content container py-5 ">
        <h2 className="text-center mb-4" style={{ marginTop: "80px" }}>
          Réserver un Rendez-vous
        </h2>

        {loadingDepartments ? (
          <div className="text-center">Chargement des départements...</div>
        ) : (
          <div className="row mb-4">
            <div className="col-md-6">
              <label htmlFor="date" className="form-label">
                Date (à partir de demain)
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                min={getTomorrowDate()}
                onChange={(e) => {
                  setSelectedTime("");
                  setDate(e.target.value);
                }}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="location" className="form-label">
                Lieu (Département)
              </label>
              <select
                className="form-control"
                id="location"
                value={location}
                onChange={(e) => {
                  setSelectedTime("");
                  setLocation(e.target.value);
                }}
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.nom}>
                    {dept.nom}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        {date && (
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="time" className="form-label">
                Sélectionnez un créneau horaire
              </label>
              {availableTimes.length === 0 ? (
                <div className="text-muted mt-2">
                  Aucun créneau disponible pour cette date.
                </div>
              ) : (
                <select
                  className="form-control"
                  id="time"
                  value={selectedTime}
                  onChange={(e) => {
                    setError("");
                    setSelectedTime(e.target.value);
                  }}
                >
                  <option value="">Choisissez un horaire</option>
                  {availableTimes.map((time, index) => {
                    const isReserved = reservedTimes.includes(time);
                    return (
                      <option
                        key={index}
                        value={time}
                        disabled={isReserved}
                        style={
                          isReserved
                            ? { color: "#999", backgroundColor: "#f5f5f5" }
                            : {}
                        }
                      >
                        {time} {isReserved && "(Indisponible)"}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          </div>
        )}

        {selectedTime && (
          <div className="mt-4 text-center">
            <p>
              <strong>Date:</strong> {date} | <strong>Heure:</strong>{" "}
              {selectedTime}
            </p>
            <p>
              <strong>Département:</strong> {location}
            </p>
            <button
              className="btn btn-success px-4 py-2"
              onClick={confirmAppointment}
            >
              Confirmer le rendez-vous
            </button>
          </div>
        )}

        {showRedirectButton && (
          <div className="text-center mt-4">
            <Button
              variant="primary"
              onClick={() => navigate("/AppointmentsList")}
            >
              Voir mes rendez-vous
            </Button>
          </div>
        )}
      </div>

      <style>{`
         .navbar-custom {
          background-color:#3f51b9 !important;
          padding: 0;
        }

        .navbar-custom .nav-link,
        .navbar-custom .navbar-brand {
          color:rgb(214, 213, 220) !important;
          font-weight: 500;
          textAlign: start;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .active-link {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 0.5rem;
        }
        .take-appointment-page {
          background: linear-gradient(135deg, #f9f9fd, #f0f4ff);
          min-height: 100vh;
        }
        .main-content {
          background-color: #ffffff;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
};

export default TakeAppointment;
