import React, { useState, useMemo, useEffect } from "react";
import { Route, Routes, useLocation, Outlet } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

// Components
import IconMenu from "./components/IconMenu";
import ImageSlider from "./components/ImageSlider";
import Horaire from "./Horaire";
import Medecin from "./Medecin";
import Propos from "./Propos";
import CreateCompt from "./CreateCompt";
import Login from "./Login";
import Boutoun from "./components/btn";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import TakeAppointment from "./components/TakeAppointment";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AppointmentsList from "./components/AppointmentsList";
import EditProfile from "./components/EditProfile";
import Admindashboard from "./pages/dasboard/Dashboard";
import Departements from "./pages/departements/Departements";
import ProfileAdmin from "./pages/profileAdmin//ProfileAdmin";
import Patients from "./pages/patients//Patients";
import Doctor from "./pages/doctors/Doctors";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import getDesignTokens from "./theme";
import Infermiers from "./pages/infermiers/Infermiers";
import Add from "./pages/doctors/Add";
import Detail from "./pages/doctors/Detail";

import "./App.css";
import Update from "./pages/doctors/Update";
import DetailAdmin from "./pages/profileAdmin//DetailAdmin";
import EditAmin from "./pages/profileAdmin/EditAdmin";
import Statistiques from "./pages/statistiques/Statistiques";
import DoctorSchedule from "./pages/doctors/DoctorSchedule";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

// Layouts for the routes
const PublicLayout = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname === "/" && <IconMenu />}
      <Outlet />
    </div>
  );
};

const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(localStorage.getItem("mode") || "dark");

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", bgcolor: theme.palette.background.default }}>
        <CssBaseline />
        <TopBar
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          toggleMode={toggleMode}
        />
        <SideBar
          open={open}
          handleDrawerClose={handleDrawerClose}
          toggleMode={toggleMode}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pb: 11,
            pt: 5,
            px: 3,
            minHeight: "100vh",
            minWidth: "1000px",
          }}
        >
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const UserLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const App = () => {
  /***************************************************************
   * *************************************************************
   * ****************  admin part  **************************/

  const [adminData, setAdminData] = useState({
    name: "ahmed kareem",
    cin: "PB123456",
    "N° de Telephone": "0612345678",
    email: "ahmedkareem@gmail.com",
    age: 36,
    statut: "Single",
    adress: "rue el ahmed kareem",
  });

  /***************************************************************
   * ****************  doctors part  **************************/
  const [doctorsData, setDoctorsData] = useState(
    JSON.parse(localStorage.getItem("donneesDoctors")) || []
  );

  const addDoctor = (newDoctor) => {
    setDoctorsData((prevData) => {
      const updatedDataDoc = [...prevData, newDoctor];
      localStorage.setItem("donneesDoctors", JSON.stringify(updatedDataDoc));
      return updatedDataDoc;
    });
  };

  const deleteDoctor = (ID) => {
    const updatedDoctors = doctorsData.filter(
      (doctor) => String(doctor.id) !== String(ID)
    );
    setDoctorsData(updatedDoctors);
    localStorage.setItem("donneesDoctors", JSON.stringify(updatedDoctors));
  };

  useEffect(() => {
    localStorage.setItem("donneesDoctors", JSON.stringify(doctorsData));
  }, [doctorsData]);

  /***************************************************************
   * ****************  infermier part  **************************/
  const [infermiersData, setInfermiersData] = useState(
    JSON.parse(localStorage.getItem("donneesInfermiers")) || []
  );

  const addInfermier = (newInfermier) => {
    setInfermiersData((prevData) => {
      const updatedDataInf = [...prevData, newInfermier];
      localStorage.setItem("donneesInfermiers", JSON.stringify(updatedDataInf));
      return updatedDataInf;
    });
  };

  const deleteInfermier = (ID) => {
    const updatedInfermiers = infermiersData.filter(
      (infermier) => String(infermier.id) !== String(ID)
    );
    setInfermiersData(updatedInfermiers);
    localStorage.setItem(
      "donneesInfermiers",
      JSON.stringify(updatedInfermiers)
    );
  };

  useEffect(() => {
    localStorage.setItem("donneesInfermiers", JSON.stringify(infermiersData));
  }, [infermiersData]);

  /***************************************************************
   * ****************  patient part  **************************/
  const [patientsData, setPatientsData] = useState(
    JSON.parse(localStorage.getItem("donneesPatients")) || []
  );

  const addPatient = (newPatient) => {
    setPatientsData((prevData) => {
      const updatedDataPat = [...prevData, newPatient];
      localStorage.setItem("donneesPatients", JSON.stringify(updatedDataPat));
      return updatedDataPat;
    });
  };

  const deletePatient = (ID) => {
    const updatedPatients = patientsData.filter(
      (patient) => String(patient.id) !== String(ID)
    );
    setPatientsData(updatedPatients);
    localStorage.setItem("donneesPatients", JSON.stringify(updatedPatients));
  };

  useEffect(() => {
    localStorage.setItem("donneesPatients", JSON.stringify(patientsData));
  }, [patientsData]);

  /***************************************************************
   * ****************  departement part  **************************/
  const [departementsData, setDepartementsData] = useState(
    JSON.parse(localStorage.getItem("donneesDepartements")) || []
  );

  const addDepartement = (newDepartement) => {
    setDepartementsData((prevData) => {
      const updatedDataDep = [...prevData, newDepartement];
      localStorage.setItem(
        "donneesDepartements",
        JSON.stringify(updatedDataDep)
      );
      return updatedDataDep;
    });
  };

  const deleteDepartement = (ID) => {
    const updatedDepartements = departementsData.filter(
      (dep) => String(dep.id) !== String(ID)
    );
    setDepartementsData(updatedDepartements);
    localStorage.setItem(
      "donneesDepartements",
      JSON.stringify(updatedDepartements)
    );
  };

  useEffect(() => {
    localStorage.setItem(
      "donneesDepartements",
      JSON.stringify(departementsData)
    );
  }, [departementsData]);

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<ImageSlider />} />
        <Route path="/Horaire" element={<Horaire />} />
        <Route path="/Medecin" element={<Medecin />} />
        <Route path="/Propos" element={<Propos />} />
        <Route
          path="/CreateCompt"
          element={<CreateCompt doctorsData={doctorsData} />}
        />
        <Route path="/Login" element={<Login />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route
          path="/admin-dashboard"
          element={
            <Admindashboard
              doctorsData={doctorsData}
              infermiersData={infermiersData}
              patientsData={patientsData}
              departementsData={departementsData}
            />
          }
        />
        <Route
          path="/doctors"
          element={
            <Doctor doctorsData={doctorsData} setDoctorsData={setDoctorsData} />
          }
        />

        <Route
          path="/doctors/schedule/:id"
          element={<DoctorSchedule doctorsData={doctorsData} />}
        />
        <Route
          path="/doctors/schedule/:id/doctors"
          element={<DoctorSchedule doctorsData={doctorsData} />}
        />

        <Route
          path="/Admin/:category/add/:category"
          element={
            <Add
              addDoctor={addDoctor}
              addInfermier={addInfermier}
              addPatient={addPatient}
              doctorsData={doctorsData}
              addDepartement={addDepartement}
              infermiersData={infermiersData}
              patientsData={patientsData}
              departementsData={departementsData}
            />
          }
        />
        <Route
          path="/:category/update/:id/:category"
          element={
            <Update
              doctorsData={doctorsData}
              setDoctorsData={setDoctorsData}
              infermiersData={infermiersData}
              setInfermiersData={setInfermiersData}
              patientsData={patientsData}
              setPatientsData={setPatientsData}
              departementsData={departementsData}
              setDepartementsData={setDepartementsData}
            />
          }
        />

        <Route
          path="/:category/detail/:id/:category"
          element={
            <Detail
              doctorsData={doctorsData}
              infermiersData={infermiersData}
              patientsData={patientsData}
            />
          }
        />

        <Route
          path="/infermiers"
          element={
            <Infermiers
              infermiersData={infermiersData}
              setInfermiersData={setInfermiersData}
            />
          }
        />
        <Route
          path="/patients"
          element={
            <Patients
              patientsData={patientsData}
              setPatientsData={setPatientsData}
            />
          }
        />
        <Route
          path="/departements"
          element={
            <Departements
              departementsData={departementsData}
              setDepartementsData={setDepartementsData}
            />
          }
        />

        <Route
          path="/statistiques"
          element={<Statistiques category="admin" />}
        />

        <Route
          path="/profileAdmin"
          element={<ProfileAdmin adminData={adminData} />}
        />
        <Route
          path="/detailAdmin"
          element={<DetailAdmin adminData={adminData} />}
        />

        <Route path="/editAdmin" element={<EditAmin />} />
      </Route>

      <Route
        path="directeurLayout"
        element={<Statistiques category="directeur" />}
      />

      <Route element={<UserLayout />}>
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/AppointmentsList" element={<AppointmentsList />} />
        <Route
          path="/take-appointment"
          element={<TakeAppointment departementsData={departementsData} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default App;
