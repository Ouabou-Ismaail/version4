import { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSignOutAlt,
  FaCalendarAlt,
  FaCalendarCheck,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const AppointmentsList = () => {
  const [rendezVous, setRendezVous] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [error, setError] = useState(null);
  const [rendezVousSelectionne, setRendezVousSelectionne] = useState(null);
  const [afficherModal, setAfficherModal] = useState(false);
  const [nouvelleDate, setNouvelleDate] = useState("");
  const [nouveauTemps, setNouveauTemps] = useState("");
  const [patient, setPatient] = useState(null);
  const [nouveauLieu, setNouveauLieu] = useState("");
  const [succes, setSucces] = useState("");
  const navigate = useNavigate();

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${String(hour).padStart(2, "0")}:${String(
          minute
        ).padStart(2, "0")}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const fetchPatient = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        navigate("/login");
        return null;
      }

      const response = await axios.get("http://localhost/api/getPatient.php", {
        withCredentials: true,
      });

      if (response.data.success) {
        setPatient(response.data.patient);
        return response.data.patient;
      } else {
        throw new Error(response.data.message || "Erreur lors du chargement");
      }
    } catch (error) {
      console.error("Erreur:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("user");
        navigate("/login");
      }
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      setSucces("");

      // Récupérer les rendez-vous
      const patientId = localStorage.getItem("patientId") || 1;
      const appointmentsResponse = await fetch(
        "http://localhost/api/get-appointments.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ patientId }),
        }
      );

      if (!appointmentsResponse.ok) {
        throw new Error(`Erreur HTTP: ${appointmentsResponse.status}`);
      }

      const appointmentsData = await appointmentsResponse.json();
      if (!appointmentsData.appointments) {
        throw new Error("Format de réponse inattendu pour les rendez-vous");
      }

      // Récupérer les départements
      const departmentsResponse = await fetch(
        "http://localhost/api/get-departments.php"
      );
      if (!departmentsResponse.ok) {
        throw new Error(`Erreur HTTP: ${departmentsResponse.status}`);
      }

      const departmentsData = await departmentsResponse.json();
      if (!departmentsData.departments) {
        throw new Error("Format de réponse inattendu pour les départements");
      }

      setRendezVous(appointmentsData.appointments || []);
      setDepartments(departmentsData.departments || []);
    } catch (err) {
      setError(err.message || "Erreur lors de la récupération des données");
    } finally {
      setLoading(false);
      setLoadingDepartments(false);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        await fetchPatient(); // Fetch patient data
        await fetchData(); // Fetch appointments and departments
      } catch (err) {
        console.error("Erreur lors de l'initialisation des données:", err);
      }
    };

    initializeData();
  }, [succes]);

  const gererModification = (rendezVous) => {
    setRendezVousSelectionne(rendezVous);
    setNouvelleDate(rendezVous.date);
    setNouveauTemps(rendezVous.time);
    setNouveauLieu(rendezVous.location);
    setAfficherModal(true);
    setError(null);
    setSucces("");
  };

  const mettreAJourRendezVous = async () => {
    if (!nouvelleDate || !nouveauTemps || !nouveauLieu) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const patientId = localStorage.getItem("patientId") || 1;
      const reponse = await fetch(
        "http://localhost/api/update-appointment.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: rendezVousSelectionne.id,
            date: nouvelleDate,
            time: nouveauTemps,
            location: nouveauLieu,
            patientId: patientId,
          }),
        }
      );

      const donnees = await reponse.json();

      if (reponse.ok) {
        setSucces(donnees.message || "Rendez-vous mis à jour avec succès");
        setAfficherModal(false);
        setTimeout(() => setSucces(""), 3000);
      } else {
        setError(donnees.message || "Erreur lors de la mise à jour");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    }
  };

  const supprimerRendezVous = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous?")) {
      try {
        const patientId = localStorage.getItem("patientId") || 1;
        const reponse = await fetch(
          "http://localhost/api/delete-appointment.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, patientId }),
          }
        );

        const donnees = await reponse.json();

        if (reponse.ok) {
          setSucces(donnees.message || "Rendez-vous supprimé avec succès");
          setTimeout(() => setSucces(""), 3000);
        } else {
          setError(donnees.message || "Erreur lors de la suppression");
        }
      } catch (err) {
        setError("Erreur de connexion au serveur");
      }
    }
  };

  const isAppointmentEditable = (date, time) => {
    const now = new Date();
    const appointmentDateTime = new Date(`${date}T${time}`);
    return appointmentDateTime > now;
  };

  const imprimerRendezVous = () => {
    if (!patient) {
      setError("Les informations du patient ne sont pas disponibles.");
      return;
    }
    try {
      const doc = new jsPDF();

      // Ajouter les informations du patient en haut du PDF
      doc.setFontSize(16);
      doc.setTextColor(43, 36, 77);
      doc.text("Informations du Patient", 14, 15);

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      let y = 25;
      [
        `Nom: ${patient.nom || "Non disponible"}`,
        `Prénom: ${patient.prenom || "Non disponible"}`,
        `CIN: ${patient.cin || "Non disponible"}`,
        `Email: ${patient.email || "Non disponible"}`,
        `Téléphone: ${patient.numero_Tele || "Non disponible"}`,
      ].forEach((text) => {
        doc.text(text, 14, y);
        y += 7;
      });

      // Ajouter un espace
      y += 10;

      // Titre pour la liste des rendez-vous
      doc.setFontSize(16);
      doc.setTextColor(43, 36, 77);
      doc.text("Liste des Rendez-vous", 14, y);
      y += 10;

      // Utilisation directe de autoTable pour les rendez-vous
      autoTable(doc, {
        startY: y,
        head: [["Date", "Heure", "Service", "Statut"]],
        body: rendezVous.map((rdv) => [
          rdv.date,
          rdv.time,
          rdv.location,
          isAppointmentEditable(rdv.date, rdv.time) ? "À venir" : "Passé",
        ]),
        styles: {
          halign: "center",
          cellPadding: 3,
          fontSize: 10,
        },
        headStyles: {
          fillColor: [43, 36, 77],
          textColor: 255,
          fontStyle: "bold",
        },
      });

      doc.save("rendez-vous-patient.pdf");
    } catch (error) {
      console.error("Erreur génération PDF:", error);
      setError("Erreur lors de la génération du PDF");
    }
  };

  const imprimerRendezVousSpecifique = (rdv) => {
    if (!patient) {
      setError("Les informations du patient ne sont pas disponibles.");
      return;
    }
    try {
      const doc = new jsPDF();

      // Centrer les informations du patient
      doc.setFontSize(18);
      doc.setTextColor(43, 36, 77);
      doc.text("Informations du Patient", 105, 20, { align: "center" });

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      const patientDetails = [
        `Nom: ${patient.nom || "Non disponible"}`,
        `Prénom: ${patient.prenom || "Non disponible"}`,
        `CIN: ${patient.cin || "Non disponible"}`,
        `Email: ${patient.email || "Non disponible"}`,
        `Téléphone: ${patient.numero_Tele || "Non disponible"}`,
      ];
      let y = 30;
      patientDetails.forEach((text) => {
        doc.text(text, 105, y, { align: "center" });
        y += 7;
      });

      // Ajouter un espace
      y += 10;

      // Centrer les détails du rendez-vous
      doc.setFontSize(18);
      doc.setTextColor(43, 36, 77);
      doc.text("Détails du Rendez-vous", 105, y, { align: "center" });
      y += 10;

      // Ajouter un tableau pour les détails
      autoTable(doc, {
        startY: y,
        head: [["Champ", "Valeur"]],
        body: [
          ["ID", rdv.id],
          ["Date", rdv.date],
          ["Heure", rdv.time],
          ["Service", rdv.location],
          [
            "Statut",
            isAppointmentEditable(rdv.date, rdv.time) ? "À venir" : "Passé",
          ],
        ],
        styles: {
          halign: "center",
          cellPadding: 5,
          fontSize: 10,
          lineColor: [43, 36, 77],
          lineWidth: 0.5,
        },
        headStyles: {
          fillColor: [43, 36, 77],
          textColor: 255,
          fontStyle: "bold",
        },
        bodyStyles: {
          fillColor: [245, 245, 245],
          textColor: 0,
        },
        alternateRowStyles: {
          fillColor: [230, 230, 250],
        },
      });

      doc.save(`rendez-vous-${patient.nom || "patient"}-${rdv.id}.pdf`);
    } catch (error) {
      console.error("Erreur génération PDF:", error);
      setError("Erreur lors de la génération du PDF");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("patientId");
    navigate("/login");
  };

  if (loading || loadingDepartments) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="appointments-list-page">
      {/* Navbar */}
      <Navbar className="navbar-custom shadow-sm" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/dashboard" className="d-flex align-items-center">
            <img
              src="logo.png"
              alt="Logo"
              className="me-2"
              style={{
                width: "150px",
                height: "50px",
                objectFit: "contain",
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
                <FaUser className="me-1" />
                Profil
              </Nav.Link>
              <Nav.Link
                onClick={() => navigate("/take-appointment")}
                style={{ padding: "0.4rem 1.2rem ", marginLeft: "0.3rem" }}
              >
                <FaCalendarAlt className="me-1" />
                Prendre RDV
              </Nav.Link>
              <Nav.Link
                onClick={() => navigate("/AppointmentsList")}
                className="active-link"
                style={{ padding: "0.4rem 1.2rem ", marginLeft: "0.3rem" }}
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
      <Container fluid className="py-5 mt-5 d-flex justify-content-center">
        <Row className="w-100">
          <Col>
            <h2 className="text-center mb-4">Liste des rendez-vous</h2>

            {error && (
              <Alert
                variant="danger"
                onClose={() => setError(null)}
                dismissible
              >
                {error}
              </Alert>
            )}
            {succes && (
              <Alert
                variant="success"
                onClose={() => setSucces(null)}
                dismissible
              >
                {succes}
              </Alert>
            )}

            {rendezVous.length === 0 ? (
              <Card className="text-center shadow">
                <Card.Body>
                  <p className="mb-4">Aucun rendez-vous trouvé.</p>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/take-appointment")}
                    className="px-4"
                  >
                    Prendre un rendez-vous
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <div className="table-container">
                <Table striped bordered hover className="shadow table-fixed">
                  <thead className="table-dark">
                    <tr>
                      <th style={{ width: "160px" }}>Date</th>
                      <th style={{ width: "160px" }}>Heure</th>
                      <th style={{ width: "160px" }}>Service</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rendezVous.map((rdv) => {
                      const isEditable = isAppointmentEditable(
                        rdv.date,
                        rdv.time
                      );
                      return (
                        <tr
                          key={rdv.id}
                          className={!isEditable ? "table-secondary" : ""}
                        >
                          <td style={{ paddingTop: "30px" }}>{rdv.date}</td>
                          <td style={{ paddingTop: "30px" }}>{rdv.time}</td>
                          <td style={{ paddingTop: "30px" }}>{rdv.location}</td>

                          <td>
                            <div className="d-flex flex-wrap gap-2">
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => gererModification(rdv)}
                                disabled={!isEditable}
                              >
                                Modifier
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => supprimerRendezVous(rdv.id)}
                                disabled={!isEditable}
                              >
                                Supprimer
                              </Button>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() =>
                                  imprimerRendezVousSpecifique(rdv)
                                }
                              >
                                Imprimer
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* Modal */}
      <Modal show={afficherModal} onHide={() => setAfficherModal(false)}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Modifier le rendez-vous</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={nouvelleDate}
                onChange={(e) => setNouvelleDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Heure</Form.Label>
              <Form.Select
                value={nouveauTemps}
                onChange={(e) => setNouveauTemps(e.target.value)}
              >
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Service</Form.Label>
              <Form.Select
                value={nouveauLieu}
                onChange={(e) => setNouveauLieu(e.target.value)}
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.nom}>
                    {dept.nom}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
          {error && <Alert variant="danger">{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAfficherModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={mettreAJourRendezVous}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Styles */}
      <style>{`
          .navbar-custom {
          background-color:#3f51b9 !important;
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

        .appointments-list-page {
          background: linear-gradient(135deg, #f9f9fd, #f0f4ff);
          min-height: 100vh;
        }

        .table-container {
          overflow-x: auto;
          display: flex;
          justify-content: center;
        }

        .table-fixed {
          width: auto;
          margin: 0 auto;
        }

        .table th {
          background-color: #2b244d;
          color: white;
        }

        .table-hover tbody tr:hover {
          background-color: rgba(231, 219, 249, 0.3);
        }

        .badge {
          font-size: 0.85em;
          padding: 0.5em 0.75em;
        }
      `}</style>
    </div>
  );
};

export default AppointmentsList;
