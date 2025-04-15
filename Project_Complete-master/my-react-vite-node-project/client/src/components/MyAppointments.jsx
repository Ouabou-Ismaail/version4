import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
         "http://localhost/api/get-appointments.php"
        );
        const data = await response.json();
        if (response.ok) {
          setAppointments(data.appointments);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Erreur lors de la récupération des rendez-vous.");
      }
    };

    fetchAppointments();
  }, []);

  const deleteAppointment = async (id) => {
    try {
      const response = await fetch(
       "http://localhost/api/delete-appointment.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAppointments(appointments.filter((appt) => appt.id !== id));
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Erreur lors de la suppression du rendez-vous.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Mes Rendez-vous</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {appointments.map((appt) => (
          <li
            key={appt.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {appt.date} - {appt.time} ({appt.location})
            <div>
              <button
                className="btn btn-warning me-2"
                onClick={() => navigate(`/edit-appointment/${appt.id}`)}
              >
                Modifier
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteAppointment(appt.id)}
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyAppointments;
