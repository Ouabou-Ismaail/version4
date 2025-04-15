// @ts-nocheck
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

import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ArrowBackOutlined } from "@mui/icons-material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import EditCalendarRoundedIcon from "@mui/icons-material/EditCalendarRounded";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";

const StyledButton = styled(IconButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));
const StyledDay = styled(PickersDay)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.secondary.light,
  ...theme.applyStyles("light", {
    color: theme.palette.secondary.dark,
  }),
}));

const Update = ({
  doctorsData,
  setDoctorsData,
  infermiersData,
  setInfermiersData,
  patientsData,
  setPatientsData,
  departementsData,
  setDepartementsData,
}) => {
  let doctorsName = [];

  doctorsData.forEach((doctor) => {
    doctorsName.push(`${doctor.nom} ${doctor.prenom}`);
  });

  const navigate = useNavigate();
  const [isDoctorEdited, setIsDoctorEdited] = useState(false);
  const [isInfermierEdited, setIsInfermierEdited] = useState(false);
  const [isPatientEdited, setIsPatientEdited] = useState(false);
  const [isDepartementEdited, setIsDepartementEdited] = useState(false);
  const theme = useTheme();
  const { id, category } = useParams();

  // Convertir l'ID de string en nombre pour qu'il corresponde à doctor.id
  const personneId = Number(parseInt(id, 10));

  // Trouver le docteur par ID
  let object;
  if (category === "doctors") {
    // Recherche de l'employé parmi les docteurs
    object = doctorsData.find((p) => String(p.id) === String(personneId));
  } else if (category === "infermiers") {
    // Recherche de l'employé parmi les infirmiers
    object = infermiersData.find((p) => String(p.id) === String(personneId));
  } else if (category === "patients") {
    // Recherche de l'employé parmi les infirmiers
    object = patientsData.find((p) => String(p.id) === String(personneId));
  } else if (category === "departements") {
    // Recherche de l'employé parmi les infirmiers
    object = departementsData.find((p) => String(p.id) === String(personneId));
  }

  // Vérifier si l'employé existe
  if (!object) {
    console.error("Employé non trouvé pour l'ID:", personneId);
  } else {
    console.log("Employé trouvé:", personneId);
  }

  // Utilisation de react-hook-form pour l'état du formulaire
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Fonction pour définir la valeur dans le formulaire
  } = useForm();

  // Remplir les champs du formulaire avec les valeurs du patients
  useEffect(() => {
    if (object && category === "patients") {
      setValue("id", object.id);
      setValue("nom", object.nom);
      setValue("prenom", object.prenom);
      setValue("email", object.email);
      setValue("numero_Tele", object.numero_Tele);
      setValue("pb", object.pb);
      setValue("age", object.age);
      setValue("rendezVous", object.rendezVous);
      setValue("doctor_traitant", object.doctor_traitant);
      setValue("statut", object.statut);
      setValue("gender", object.gender);
      setValue("adress", object.adress);
    } else if (object && category !== "departements") {
      setValue("id", object.id);
      setValue("nom", object.nom);
      setValue("prenom", object.prenom);
      setValue("email", object.email);
      setValue("numero_Tele", object.numero_Tele);
      setValue("pb", object.pb);
      setValue("age", object.age);
      setValue("statut", object.statut);
      setValue("gender", object.gender);
      setValue("salary", object.salary);
      setValue("departement", object.departement);
      setValue("adress", object.adress);
    } else if (object) {
      setValue("id", object.id);
      setValue("nom", object.nom);
      setValue("totDoc", object.totDoc);
      setValue("totInf", object.totInf);
      setValue("totPat", object.totPat);
    }
    console.log(object);
  }, [object, setValue]);

  // Fonction de soumission du formulaire
  const onSubmit = (data) => {
    let updatedObject;

    if (category === "patients") {
      updatedObject = {
        id: data.id,
        nom: data.nom,
        prenom: data.prenom,
        pb: data.pb,
        age: data.age,
        numero_Tele: data.numero_Tele,
        email: data.email,
        adress: data.adress,
        rendezVous: data.rendezVous,
        gender: data.gender,
        doctor_traitant: data.doctor_traitant,
      };
    } else if (category !== "departements") {
      updatedObject = {
        id: data.id,
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
    } else {
      updatedObject = {
        id: data.id,
        nom: data.nom,
        totDoc: data.totDoc,
        totInf: data.totInf,
        totPat: data.totPat,
      };
    }

    console.log(updatedObject);

    // Send updatedObject to the backend via fetch
    fetch(
      "http://localhost/api/updateRecord.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: category,
          ...updatedObject,
        }),
      }
    )
      .then((response) => response.text()) // Get raw response text
      .then((data) => {
        try {
          const jsonData = JSON.parse(data); // Attempt to parse the response as JSON
          if (jsonData.message) {
            // Handle success
            console.log(jsonData.message);
            // Update local state and localStorage with the updated data
            if (category === "doctors") {
              const updatedDoctorsData = doctorsData.map((doc) =>
                String(doc.id) === String(personneId) ? updatedObject : doc
              );
              setDoctorsData(updatedDoctorsData);
              localStorage.setItem(
                "donneesDoctors",
                JSON.stringify(updatedDoctorsData)
              );
              setIsDoctorEdited(true);
            } else if (category === "infermiers") {
              const updatedInfermierData = infermiersData.map((inf) =>
                String(inf.id) === String(personneId) ? updatedObject : inf
              );
              setInfermiersData(updatedInfermierData);
              localStorage.setItem(
                "donneesInfermiers",
                JSON.stringify(updatedInfermierData)
              );
              setIsInfermierEdited(true);
            } else if (category === "patients") {
              const updatedPatientData = patientsData.map((pat) =>
                String(pat.id) === String(personneId) ? updatedObject : pat
              );
              setPatientsData(updatedPatientData);
              localStorage.setItem(
                "donneesPatients",
                JSON.stringify(updatedPatientData)
              );
              setIsPatientEdited(true);
            } else if (category === "departements") {
              const updatedDepartementData = departementsData.map((dep) =>
                String(dep.id) === String(personneId) ? updatedObject : dep
              );
              setDepartementsData(updatedDepartementData);
              localStorage.setItem(
                "donneesDepartements",
                JSON.stringify(updatedDepartementData)
              );
              setIsDepartementEdited(true);
            }
          } else {
            console.error("Error: " + jsonData.error);
          }
        } catch (error) {
          console.error("Error parsing response as JSON:", error);
          console.log("Raw response data:", data); // Log raw response data for debugging
        }
      })
      .catch((error) => {
        console.error("Request failed", error);
      });
  };

  useEffect(() => {
    if (
      isDoctorEdited ||
      isInfermierEdited ||
      isPatientEdited ||
      isDepartementEdited
    ) {
      // Wait for a brief moment before navigating
      const timer = setTimeout(() => {
        navigate(`/${category}`);
      }, 300);

      // Cleanup the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [
    isDoctorEdited,
    isInfermierEdited,
    isPatientEdited,
    isDepartementEdited,
    navigate,
  ]);

  return (
    <Paper
      sx={{
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
      <Stack>
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
            }, 500)
          }
        >
          <ArrowBackOutlined />
        </Button>

        <Typography
          variant="h2"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "50px",
            pb: "5px",
            textTransform: "capitalize",
            width: "fit-content",
            mx: "auto",
            borderBottom: "1px solid gray",
            gap: "8px",
          }}
        >
          {category === "doctors"
            ? `modifier les donnees de:
            Dr. ${object.nom} ${object.prenom} `
            : category === "infermiers"
            ? `modifier les donnees de
           l'infermier: ${object.nom} ${object.prenom} `
            : category === "patients"
            ? `modifier les donnees de patient: ${object.nom} ${object.prenom} `
            : `modifier les donnees de departement: ${object.nom} `}
        </Typography>
      </Stack>

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
          {/* ID Field (Read-only for update) */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="ID*"
            variant="outlined"
            defaultValue={object.id}
            error={Boolean(errors.id)}
            helperText={errors.id ? "Ce champ est obligatoire" : null}
            {...register("id", { required: true })}
            disabled
          />

          {/* Nom Field */}
          <TextField
            sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
            label="Nom*"
            variant="outlined"
            defaultValue={object.nom}
            error={Boolean(errors.nom)}
            helperText={errors.nom ? "Ce champ est obligatoire" : null}
            {...register("nom", { required: true })}
          />

          {category === "departements" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              label="Total Doctors*"
              variant="outlined"
              defaultValue={object.totDoc}
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
              defaultValue={object.totInf}
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
              defaultValue={object.totPat}
              error={Boolean(errors.totPat)}
              helperText={errors.totPat ? "Ce champ est obligatoire" : null}
              {...register("totPat", { required: false })}
            />
          ) : null}

          {/* Prénom Field */}
          {category !== "departements" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              label="Prénom*"
              variant="outlined"
              defaultValue={object.prenom}
              error={Boolean(errors.prenom)}
              helperText={errors.prenom ? "Ce champ est obligatoire" : null}
              {...register("prenom", { required: true })}
            />
          ) : null}

          {/* Email Field */}
          {category !== "departements" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              label="Email*"
              variant="outlined"
              defaultValue={object.email}
              error={Boolean(errors.email)}
              helperText={errors.email ? "Ce champ est obligatoire" : null}
              {...register("email", { required: true })}
            />
          ) : null}

          {/* Phone Field */}
          {category !== "departements" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              label="N° Téléphone*"
              variant="outlined"
              defaultValue={object.numero_Tele}
              error={Boolean(errors.numero_Tele)}
              helperText={
                errors.numero_Tele ? "Ce champ est obligatoire" : null
              }
              {...register("numero_Tele", { required: true })}
            />
          ) : null}

          {/* CIN Field */}
          {category !== "departements" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              label="CIN*"
              variant="outlined"
              defaultValue={object.pb}
              error={Boolean(errors.pb)}
              helperText={errors.pb ? "Ce champ est obligatoire" : null}
              {...register("pb", { required: true })}
            />
          ) : null}

          {/* Age Field */}
          {category !== "departements" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              label="Age*"
              variant="outlined"
              defaultValue={object.age}
              error={Boolean(errors.age)}
              helperText={errors.age ? "Ce champ est obligatoire" : null}
              {...register("age", { required: true })}
            />
          ) : null}

          {/* le prochaine rendez-vous */}

          {category === "patients" && category !== "departements" ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                sx={{ width: "49%", minWidth: "460px", flexGrow: 1 }}
                components={["DatePicker"]}
              >
                <DatePicker
                  sx={{ width: "100%" }}
                  label="le prochaine rendez-vous"
                  slots={{
                    openPickerIcon: EditCalendarRoundedIcon,
                    openPickerButton: StyledButton,
                    day: StyledDay,
                  }}
                  slotProps={{
                    openPickerIcon: { fontSize: "large" },
                    openPickerButton: { color: "secondary" },
                    textField: {
                      defaultValue: dayjs(object.rendezVous),
                      variant: "outlined",
                      focused: false,
                      color: "secondary",
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          ) : null}

          {/* Gender Select */}
          {category !== "departements" ? (
            <FormControl sx={{ minWidth: "400px", width: "49%", flexGrow: 1 }}>
              <InputLabel>Genre</InputLabel>
              <Select
                {...register("gender", { required: true })}
                label="Genre"
                defaultValue={object.gender}
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

          {/* Address Field */}
          {category !== "departements" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              label="Adresse"
              variant="outlined"
              defaultValue={object.adress}
              error={Boolean(errors.adress)}
              helperText={errors.adress ? "Ce champ est obligatoire" : null}
              {...register("adress", { required: true })}
            />
          ) : null}

          {/* Champ de doctor traitant */}
          {category === "patients" && category !== "departements" ? (
            <FormControl sx={{ minWidth: "400px", width: "49%", flexGrow: 1 }}>
              <InputLabel>Doctor Traitants</InputLabel>
              <Select
                {...register("doctor_traitant", { required: false })}
                label="Doctor Traitants"
                defaultValue={object.doctor_traitant}
                error={Boolean(errors.doctor_traitant)}
              >
                {doctorsName.map((doctor) => (
                  <MenuItem key={doctor} value={doctor}>
                    {doctor}
                  </MenuItem>
                ))}
              </Select>
              {errors.doctor_traitant && (
                <Typography color="error">Ce champ est obligatoire</Typography>
              )}
            </FormControl>
          ) : null}

          {/* Champ de salaire */}
          {(category === "doctors" || category === "infermiers") &&
          category !== "departements" ? (
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
          {(category === "doctors" || category === "infermiers") &&
          category !== "departements" ? (
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

          {/* Image Input */}
          {(category === "doctors" || category === "infermiers") &&
          category !== "departements" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              type="file"
              fullWidth
              variant="outlined"
              label="Photo"
            />
          ) : null}

          {/* CV Input */}

          {(category === "doctors" || category === "infermiers") &&
          category !== "departements" ? (
            <TextField
              sx={{ width: "49%", minWidth: "400px", flexGrow: 1 }}
              type="file"
              fullWidth
              variant="outlined"
              label="Fichier PDF"
              error={Boolean(errors.cv)}
              {...register("cv", {
                validate: (value) => {
                  // Only validate if a file is selected
                  if (value && value.length > 0) {
                    // Check if it's a PDF if a file is selected
                    return (
                      value[0]?.type === "application/pdf" ||
                      "Veuillez télécharger un fichier PDF"
                    );
                  }
                  return true; // No file selected, validation passes (not required)
                },
              })}
            />
          ) : null}
        </Stack>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{ p: "4px 25px", textTransform: "capitalize", fontSize: "22px" }}
        >
          Modifier
        </Button>
      </form>
    </Paper>
  );
};

export default Update;
