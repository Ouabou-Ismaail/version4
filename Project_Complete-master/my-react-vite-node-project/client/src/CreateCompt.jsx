//creat compt
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaVenusMars,
  FaMapMarkerAlt,
  FaStethoscope,
  FaUserMd,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Formulaire de création de compte patient en 2 étapes.
 * La première étape permet de saisir les informations personnelles,
 * et la deuxième étape permet de saisir les informations de connexion.
 * Le formulaire est protégé par un système de validation pour s'assurer
 * que les informations entrées sont correctes.
 * Si le formulaire est valide, une requête POST est envoyée au serveur pour
 * créer le compte.
 * Si une erreur survient lors de la requête, un message d'erreur est affiché.
 * Si le compte est créé avec succès, l'utilisateur est redirigé vers la page
 * de connexion.
 * @returns {JSX.Element} Le formulaire de création de compte.
 */
/*******  93426569-7c4f-4670-a32c-40489ad4cda8  *******/
const Register = ({ doctorsData }) => {
  console.log("doctorsData:", doctorsData);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    cin: "",
    gender: "",
    age: "",
    email: "",
    numero_Tele: "",
    adress: "",
    pb: "",
    doctor_traitant: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    } else if (formData.nom.length < 2) {
      newErrors.nom = "Le nom doit contenir au moins 2 caractères";
    }

    if (!formData.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis";
    } else if (formData.prenom.length < 2) {
      newErrors.prenom = "Le prénom doit contenir au moins 2 caractères";
    }

    if (!formData.cin) {
      newErrors.cin = "Le CIN est requis";
    } else if (!/^\d{8}$/.test(formData.cin)) {
      newErrors.cin = "Le CIN doit contenir exactement 8 chiffres";
    }

    if (!formData.numero_Tele) {
      newErrors.numero_Tele = "Le numéro de téléphone est requis";
    } else if (!/^\d{10}$/.test(formData.numero_Tele)) {
      newErrors.numero_Tele =
        "Le téléphone doit contenir exactement 10 chiffres";
    }

    if (!formData.gender) {
      newErrors.gender = "Le genre est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Veuillez entrer un email valide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Le mot de passe doit contenir au moins une majuscule";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir au moins un chiffre";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "La confirmation du mot de passe est requise";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      setApiError("");
    }
  };

  const handlePrev = () => setCurrentStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setErrors({});

    if (!validateStep2()) return;

    setIsSubmitting(true);

    try {
      const { confirmPassword, ...data } = formData;
      console.log("gender:", formData.gender);

      const response = await axios.post(
        "http://localhost/api/register.php",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        navigate("/login", {
          state: {
            registrationSuccess: true,
            email: formData.email,
          },
        });
      } else {
        console.error("Erreur d'enregistrement:", response.data);
        setApiError(response.data.message || "Échec de l'enregistrement");
        if (response.data.errors) {
          setErrors(response.data.errors);
        }
      }
    } catch (error) {
      console.error("Erreur d'enregistrement:", error);
      let errorMessage = "Erreur de connexion au serveur";

      if (error.response) {
        console.error("Réponse du serveur:", error.response.data);
        if (error.response.data?.errors) {
          setErrors(error.response.data.errors);
          errorMessage = "Veuillez corriger les champs en surbrillance";
        } else {
          errorMessage =
            error.response.data?.message ||
            `Erreur serveur: ${error.response.status}`;
        }
      } else if (error.request) {
        errorMessage = "Aucune réponse du serveur. Vérifiez votre connexion.";
      }

      setApiError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "confirmPassword" && formData.password && value) {
      if (formData.password !== value) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Les mots de passe ne correspondent pas",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "",
        }));
      }
    }
  };

  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, [name]: cleanedValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-primary text-white py-3">
                <h3 className="mb-0 text-center">Création de compte patient</h3>
              </div>

              <div className="card-body p-4">
                <div className="d-flex justify-content-center mb-4">
                  <div
                    className={`rounded-circle p-2 ${
                      currentStep === 1 ? "bg-primary text-white" : "bg-light"
                    }`}
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <span className="d-block text-center fw-bold">1</span>
                  </div>
                  <div
                    className="align-self-center mx-2"
                    style={{
                      width: "60px",
                      height: "2px",
                      background: "#dee2e6",
                    }}
                  ></div>
                  <div
                    className={`rounded-circle p-2 ${
                      currentStep === 2 ? "bg-primary text-white" : "bg-light"
                    }`}
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <span className="d-block text-center fw-bold">2</span>
                  </div>
                </div>

                {apiError && (
                  <div className="alert alert-danger mb-4">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {apiError}
                  </div>
                )}

                {currentStep === 1 ? (
                  <>
                    <h5 className="text-center text-secondary mb-4">
                      Informations personnelles
                    </h5>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Nom*</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaUser />
                          </span>
                          <input
                            type="text"
                            name="nom"
                            className={`form-control ${
                              errors.nom && "is-invalid"
                            }`}
                            value={formData.nom}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.nom && (
                          <div className="invalid-feedback d-block">
                            {errors.nom}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Prénom*</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaUser />
                          </span>
                          <input
                            type="text"
                            name="prenom"
                            className={`form-control ${
                              errors.prenom && "is-invalid"
                            }`}
                            value={formData.prenom}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.prenom && (
                          <div className="invalid-feedback d-block">
                            {errors.prenom}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">CIN*</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaIdCard />
                          </span>
                          <input
                            type="text"
                            name="cin"
                            className={`form-control ${
                              errors.cin && "is-invalid"
                            }`}
                            value={formData.cin}
                            onChange={handleNumericChange}
                            maxLength="8"
                            placeholder="8 chiffres"
                          />
                        </div>
                        {errors.cin && (
                          <div className="invalid-feedback d-block">
                            {errors.cin}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Genre*</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaVenusMars />
                          </span>
                          <select
                            name="gender"
                            className={`form-select ${
                              errors.gender && "is-invalid"
                            }`}
                            value={formData.gender}
                            onChange={handleChange}
                          >
                            <option value="">Sélectionner...</option>
                            <option value="Masculin">Masculin</option>
                            <option value="Féminin">Féminin</option>
                          </select>
                        </div>
                        {errors.gender && (
                          <div className="invalid-feedback d-block">
                            {errors.gender}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Âge</label>
                        <div className="input-group">
                          <span className="input-group-text">#</span>
                          <input
                            type="number"
                            name="age"
                            min="0"
                            max="120"
                            className="form-control"
                            value={formData.age}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Téléphone*</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaPhone />
                          </span>
                          <input
                            type="tel"
                            name="numero_Tele"
                            className={`form-control ${
                              errors.numero_Tele && "is-invalid"
                            }`}
                            value={formData.numero_Tele}
                            onChange={handleNumericChange}
                            maxLength="10"
                            placeholder="10 chiffres"
                          />
                        </div>
                        {errors.numero_Tele && (
                          <div className="invalid-feedback d-block">
                            {errors.numero_Tele}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="d-grid mt-4">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="btn btn-primary py-2"
                        disabled={isSubmitting}
                      >
                        Suivant <FaArrowRight className="ms-2" />
                      </button>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h5 className="text-center text-secondary mb-4">
                      Informations de connexion
                    </h5>

                    <div className="row g-3">
                      <div className="col-12">
                        <label className="form-label">Email*</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaEnvelope />
                          </span>
                          <input
                            type="email"
                            name="email"
                            className={`form-control ${
                              errors.email && "is-invalid"
                            }`}
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.email && (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Mot de passe*</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaLock />
                          </span>
                          <input
                            type="password"
                            name="password"
                            className={`form-control ${
                              errors.password && "is-invalid"
                            }`}
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.password && (
                          <div className="invalid-feedback d-block">
                            {errors.password}
                          </div>
                        )}
                        <small className="form-text text-muted">
                          Minimum 8 caractères avec au moins 1 majuscule et 1
                          chiffre
                        </small>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Confirmation*</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaLock />
                          </span>
                          <input
                            type="password"
                            name="confirmPassword"
                            className={`form-control ${
                              errors.confirmPassword && "is-invalid"
                            }`}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.confirmPassword && (
                          <div className="invalid-feedback d-block">
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>

                      <div className="col-12">
                        <label className="form-label">Adresse</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaMapMarkerAlt />
                          </span>
                          <input
                            type="text"
                            name="adress"
                            className="form-control"
                            value={formData.adress}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Problème de santé</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaStethoscope />
                          </span>
                          <input
                            type="text"
                            name="pb"
                            className="form-control"
                            value={formData.pb}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label">Médecin traitant</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaUserMd />
                          </span>
                          <select
                            name="doctor_traitant"
                            className={`form-select ${
                              errors.doctor_traitant && "is-invalid"
                            }`}
                            value={formData.doctor_traitant}
                            onChange={handleChange}
                          >
                            <option value="">Sélectionner...</option>
                            {doctorsData.map((doctor) => (
                              <option key={doctor.id} value={doctor.nom}>
                                {doctor.nom}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.doctor_traitant && (
                          <div className="invalid-feedback d-block">
                            {errors.doctor_traitant}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="btn btn-outline-secondary"
                        disabled={isSubmitting}
                      >
                        <FaArrowRight className="me-2 rotate-180" /> Retour
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            ></span>
                            Enregistrement...
                          </>
                        ) : (
                          <>
                            S'inscrire <FaArrowRight className="ms-2" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="card-footer bg-light py-3 text-center">
                <p className="mb-0">
                  Déjà un compte ?{" "}
                  <a href="/login" className="text-primary fw-bold">
                    Connectez-vous
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
