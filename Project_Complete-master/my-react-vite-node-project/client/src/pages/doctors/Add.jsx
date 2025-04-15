import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
// @ts-ignore
import { useForm } from "react-hook-form";
import EditCalendarRoundedIcon from "@mui/icons-material/EditCalendarRounded";
import axios from "axios";
import { ArrowBackOutlined } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// StyledButton : icône personnalisée pour les boutons
const StyledButton = styled(IconButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

const Add = ({
  addDoctor,
  addInfermier,
  addPatient,
  doctorsData,
  infermiersData,
  patientsData,
  departementsData,
  addDepartement,
}) => {
  const doctorsName = [];
  const [isObjectAdd, setIsObjectAdd] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [nomExist, setNomExist] = useState(false);

  console.log(doctorsData);

  if (Array.isArray(doctorsData)) {
    doctorsData.forEach((doctor) => {
      console.log("is array");

      doctorsName.push(`${doctor.nom} ${doctor.prenom}`);
    });
  } else {
    console.log("is not a array");
  }

  const [idDoctor, setIdDoctor] = useState(
    JSON.parse(localStorage.getItem("idDoctor")) || 0
  );
  const [idInfermier, setIdInfermier] = useState(
    JSON.parse(localStorage.getItem("idInfermier")) || 0
  );
  const [idPatient, setIdPatient] = useState(
    JSON.parse(localStorage.getItem("idPatient")) || 0
  );
  const [idDepartement, setIdDepartement] = useState(
    JSON.parse(localStorage.getItem("idDepartement")) || 0
  );

  const theme = useTheme();
  const { category } = useParams();
  console.log(category);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [rendezVous, setRendezVous] = useState(dayjs());
  const [formattedDate, setFormattedDate] = useState(
    dayjs().format("YYYY/MM/DD")
  );

  const handleDateChange = (newDate) => {
    const validDate = dayjs(newDate);
    if (validDate.isValid()) {
      setRendezVous(validDate);
      setFormattedDate(validDate.format("YYYY/MM/DD"));
    }
  };

  const onSubmit = (data) => {
    console.log("Data submitted: ", data); // Vérifier si `data` est bien envoyé

    let newObject;
    let emailAlreadyExists = false;
    let nomAlreadyExists = false;

    // Vérification si l'email existe déjà
    if (category === "doctors") {
      if (Array.isArray(doctorsData)) {
        emailAlreadyExists = doctorsData.some(
          (doctor) => doctor.email === data.email
        );
      } else {
        console.error("doctorsData is not an array:", doctorsData);
        alert("Doctors data is not available or is incorrectly formatted.");
        return;
      }
    } else if (category === "infermiers") {
      if (Array.isArray(infermiersData)) {
        emailAlreadyExists = infermiersData.some(
          (infermier) => infermier.email === data.email
        );
      } else {
        console.error("infermiersData is not an array:", infermiersData);
        alert("Nurses data is not available or is incorrectly formatted.");
        return;
      }
    } else if (category === "patients") {
      if (Array.isArray(patientsData)) {
        emailAlreadyExists = patientsData.some(
          (patient) => patient.email === data.email
        );
      } else {
        console.error("patientsData is not an array:", patientsData);
        alert("Patients data is not available or is incorrectly formatted.");
        return;
      }
    } else if (category === "departements") {
      if (Array.isArray(departementsData)) {
        nomAlreadyExists = departementsData.some(
          (departement) => departement.nom === data.nom
        );
      } else {
        console.error("departementsData is not an array:", departementsData);
        alert("Departments data is not available or is incorrectly formatted.");
        return;
      }
    }

    // Vérification des erreurs
    if (emailAlreadyExists) {
      setEmailExist(true);
      alert("Email already exists! Please choose a different email.");
      return;
    }

    if (nomAlreadyExists) {
      setNomExist(true);
      alert(
        "This department already exists! Please choose a different department."
      );
      return;
    }

    // Créer l'objet à ajouter en fonction de la catégorie
    if (category === "patients") {
      newObject = {
        id: getId(category),
        nom: data.nom,
        prenom: data.prenom,
        pb: data.pb,
        age: data.age,
        numero_Tele: data.numero_Tele,
        email: data.email,
        rendezVous: rendezVous ? rendezVous.format("YYYY/MM/DD") : null, // Ensure proper handling
        adress: data.adress,
        doctor_traitant: data.doctor_traitant,
        gender: data.gender,
      };
    } else if (category === "doctors" || category === "infermiers") {
      newObject = {
        id: getId(category),
        nom: data.nom,
        prenom: data.prenom,
        pb: data.pb,
        age: data.age,
        numero_Tele: data.numero_Tele,
        email: data.email,
        adress: data.adress,
        departement: data.departement,
        gender: data.gender,
        salary: data.salary,
      };
    } else if (category === "departements") {
      newObject = {
        id: getId(category),
        nom: data.nom,
        totDoc: data.totDoc,
        totInf: data.totInf,
        totPat: data.totPat,
      };
    }

    console.log("Final newObject to send: ", newObject); // Vérifier l'objet avant l'envoi

    // Envoi avec axios
    axios
      .post(
        "http://localhost/api/addRecord.php",
        { ...newObject, category: category },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data); // Vérifier la réponse
        if (category === "doctors") {
          addDoctor(newObject);
          setIdDoctor(idDoctor + 1);
        } else if (category === "infermiers") {
          addInfermier(newObject);
          setIdInfermier(idInfermier + 1);
        } else if (category === "patients") {
          addPatient(newObject);
          setIdPatient(idPatient + 1);
        } else if (category === "departements") {
          addDepartement(newObject);
          setIdDepartement(idDepartement + 1);
        }

        // Mise à jour de localStorage
        updateLocalStorage(category);

        // Reset the form or handle post-submit logic
        setIsObjectAdd(true);
      })
      .catch((error) => {
        console.error("Error adding record:", error);
        alert("An error occurred while adding the record.");
      });
  };

  const getId = (category) => {
    switch (category) {
      case "doctors":
        return idDoctor + 1;
      case "infermiers":
        return idInfermier + 1;
      case "patients":
        return idPatient + 1;
      case "departements":
        return idDepartement + 1;
      default:
        return 0;
    }
  };

  const updateLocalStorage = (category) => {
    switch (category) {
      case "doctors":
        localStorage.setItem("idDoctor", JSON.stringify(idDoctor + 1));
        break;
      case "infermiers":
        localStorage.setItem("idInfermier", JSON.stringify(idInfermier + 1));
        break;
      case "patients":
        localStorage.setItem("idPatient", JSON.stringify(idPatient + 1));
        break;
      case "departements":
        localStorage.setItem(
          "idDepartement",
          JSON.stringify(idDepartement + 1)
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isObjectAdd && !emailExist && !nomExist) {
      navigate(`/${category}`);
    }
  }, [isObjectAdd, emailExist, nomExist, category, navigate]);

  return (
    <Paper
      sx={{
        minHeight: "86.4vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        width: "100%",
        gap: "25px",
        color: theme.palette.grey[100],
      }}
    >
      <Button
        sx={{
          display: "flex",
          justifyContent: "start",
          fontSize: "26px",
          position: "absolute",
          top: "5px",
          left: "5px",
          width: "40px",
          height: "60px",
          textAlign: "center",
          lineHeight: "40px",
          borderRadius: "50%",
          overflow: "hidden",
          pl: "20px",
        }}
        onClick={() =>
          setTimeout(() => {
            navigate(`/${category}`);
          }, 300)
        }
      >
        <ArrowBackOutlined />
      </Button>
      <Typography
        variant="h1"
        sx={{
          textTransform: "capitalize",
          pt: "20px",
          fontWeight: "900",
          fontSize: "35px",
        }}
      >
        Ajouter un nouveau {category.substring(0, category.length - 1)}{" "}
        {/* Removing the last character */}
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          width: "100%",
          gap: "20px",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            width: "100%",
            gap: "20px",
            my: "20px",
          }}
        >
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="ID*"
            value={
              category === "doctors"
                ? idDoctor + 1
                : category === "infermiers"
                ? idInfermier + 1
                : category === "patients"
                ? idPatient + 1
                : idDepartement
            } // Afficher l'ID mis à jour
            variant="outlined"
            {...register("id", { required: true })}
            disabled
          />

          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="Nom*"
            variant="outlined"
            error={Boolean(errors.nom)}
            helperText={errors.nom ? "Ce champ est obligatoire" : null}
            {...register("nom", { required: true })}
          />

          {category === "departements" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              label="Total Doctors*"
              variant="outlined"
              error={Boolean(errors.totDoc)}
              helperText={errors.totDoc ? "Ce champ est obligatoire" : null}
              {...register("totDoc", { required: false })}
            />
          ) : null}

          {category === "departements" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              label="Total Infermiers*"
              variant="outlined"
              error={Boolean(errors.totInf)}
              helperText={errors.totInf ? "Ce champ est obligatoire" : null}
              {...register("totInf", { required: false })}
            />
          ) : null}

          {category === "departements" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              label="Total Patients*"
              variant="outlined"
              error={Boolean(errors.totPat)}
              helperText={errors.totPat ? "Ce champ est obligatoire" : null}
              {...register("totPat", { required: false })}
            />
          ) : null}

          {category !== "departements" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              label="Prénom*"
              variant="outlined"
              error={Boolean(errors.prenom)}
              helperText={errors.prenom ? "Ce champ est obligatoire" : null}
              {...register("prenom", { required: true })}
            />
          ) : null}

          {category !== "departements" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              label="Email*"
              variant="outlined"
              error={Boolean(errors.email) || (!emailExist && isObjectAdd)}
              helperText={
                errors.email ? "email invalid or is aleardy exist!" : null
              }
              {...register("email", { required: true })}
            />
          ) : null}

          {category !== "departements" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              label="N° Téléphone*"
              variant="outlined"
              error={Boolean(errors.numero_Tele)}
              helperText={
                errors.numero_Tele ? "Ce champ est obligatoire" : null
              }
              {...register("numero_Tele", { required: true })}
            />
          ) : null}

          {category !== "departements" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              label="CIN*"
              variant="outlined"
              error={Boolean(errors.pb)}
              helperText={errors.pb ? "Ce champ est obligatoire" : null}
              {...register("pb", { required: true })}
            />
          ) : null}

          {category !== "departements" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              label="Age*"
              variant="outlined"
              error={Boolean(errors.age)}
              helperText={errors.age ? "Ce champ est obligatoire" : null}
              {...register("age", { required: true })}
            />
          ) : null}

          {/* Sélecteur de genre */}
          {category !== "departements" ? (
            <FormControl sx={{ minWidth: "400px", width: "49%", flexGrow: 1 }}>
              <InputLabel>Genre</InputLabel>
              <Select
                {...register("gender", { required: true })}
                label="Genre"
                error={Boolean(errors.gender)}
              >
                <MenuItem value="homme">Homme</MenuItem>
                <MenuItem value="femme">Femme</MenuItem>
              </Select>
              {errors.gender && (
                <Typography color="error">Ce champ est obligatoire</Typography>
              )}
            </FormControl>
          ) : null}

          {/* Champ d'adresse */}
          {category !== "departements" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              label="Adresse"
              variant="outlined"
              error={Boolean(errors.adress)}
              helperText={errors.adress ? "Ce champ est obligatoire" : null}
              {...register("adress", { required: true })}
            />
          ) : null}

          {category !== "departements" ? (
            // Champ de doctor traitant
            category === "patients" ? (
              <FormControl
                sx={{ minWidth: "400px", width: "49%", flexGrow: 1 }}
              >
                <InputLabel>Doctor Traitants</InputLabel>
                <Select
                  {...register("doctor_traitant", { required: false })}
                  label="Doctor Traitants"
                  error={Boolean(errors.doctor_traitant)}
                >
                  {doctorsName.map((doctor) => (
                    <MenuItem key={doctor} value={doctor}>
                      {doctor}
                    </MenuItem>
                  ))}
                </Select>
                {errors.doctor_traitant && (
                  <Typography color="error">
                    Ce champ est obligatoire
                  </Typography>
                )}
              </FormControl>
            ) : null
          ) : null}

          {/* Champ de salaire */}
          {category === "doctors" || category === "infermiers" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              label="salary"
              variant="outlined"
              error={Boolean(errors.salary)}
              helperText={errors.salary ? "Ce champ est obligatoire" : null}
              {...register("salary", { required: true })}
            />
          ) : null}

          {/* Sélecteur de département */}
          {category === "doctors" || category === "infermiers" ? (
            <FormControl sx={{ minWidth: "400px", width: "49%", flexGrow: 1 }}>
              <InputLabel>Département</InputLabel>
              <Select
                {...register("departement", { required: true })}
                label="Département"
                error={Boolean(errors.departement)}
              >
                <MenuItem value="Gynécologie_Obstétrique">
                  Gynécologie et Obstétrique
                </MenuItem>
                <MenuItem value="Pédiatrie">Pédiatrie</MenuItem>
                <MenuItem value="Urgences">Urgences</MenuItem>
                <MenuItem value="Chirurgie">Chirurgie</MenuItem>
                <MenuItem value="Cardiologie">Cardiologie</MenuItem>
              </Select>
              {errors.departement && (
                <Typography color="error">Ce champ est obligatoire</Typography>
              )}
            </FormControl>
          ) : null}

          {category === "patients" ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack sx={{ width: "49%", minWidth: "460px", flexGrow: 1 }}>
                <DatePicker
                  sx={{ width: "100%" }}
                  label="Date de Rendez-vous"
                  value={rendezVous} // Directly use rendezVous without validity check
                  onChange={(newDate) => handleDateChange(newDate)}
                  // @ts-ignore
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      value={formattedDate} // Display the formatted date
                      variant="outlined"
                      focused={false}
                      color="secondary"
                    />
                  )}
                  slots={{
                    openPickerIcon: EditCalendarRoundedIcon, // Custom picker icon
                    openPickerButton: StyledButton, // Custom button for the picker
                  }}
                  slotProps={{
                    openPickerIcon: { fontSize: "large" },
                    openPickerButton: { color: "secondary" },
                    textField: {
                      variant: "outlined",
                      focused: false,
                      color: "secondary",
                    },
                  }}
                />
              </Stack>
            </LocalizationProvider>
          ) : null}
        </Stack>

        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: "20px", p: "10px 30px", fontSize: "18px" }}
        >
          Ajouter
        </Button>
      </form>
    </Paper>
  );
};

export default Add;
