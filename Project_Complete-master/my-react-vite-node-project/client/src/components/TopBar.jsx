// @ts-nocheck
import {
  alpha,
  Box,
  Button,
  InputBase,
  Stack,
  styled,
  Typography,
  useThemeProps,
} from "@mui/material";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import MuiAppBar from "@mui/material/AppBar";
import { Dashboard, Delete, Search } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const TopBar = ({ open, handleDrawerOpen, toggleMode }) => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();

  const drawerWidth = 240;
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
      {
        // @ts-ignore
        props: ({ open }) => open,
        style: {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
    ],
  }));

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  return (
    <AppBar
      position="fixed"
      // @ts-ignore
      open={open}
    >
      <Toolbar
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              marginRight: 5,
            },
            open && { display: "none" },
          ]}
        >
          <MenuIcon />
        </IconButton>

        <Stack
          direction={"row"}
          flexGrow={1.8}
          sx={{ display: "flex", gap: "18px", justifyContent: "center" }}
        >
          <Button
            sx={{
              color: theme.palette.grey[100],
              bgcolor: location.pathname === "/admin-dashboard" ? "gray" : null,
            }}
            onClick={() => {
              navigate("/admin-dashboard");
            }}
          >
            Dashboard
          </Button>
          <Button
            sx={{
              color: theme.palette.grey[100],
              bgcolor:
                location.pathname === "/doctors" ||
                location.pathname === `/doctors/update/${id}/doctors` ||
                location.pathname === `/doctors/detail/${id}/doctors` ||
                location.pathname === `/admin/doctors/add/doctors` ||
                /\/update\/\d+\/.*$/.test(
                  "/doctors" ||
                    `/update/${id}/doctors` ||
                    `/detail/${id}/doctors` ||
                    "/add/doctors"
                ) // Matches /update/{any number}/{any path}
                  ? "gray"
                  : null,
            }}
            onClick={() => {
              navigate("/doctors");
            }}
          >
            Doctors
          </Button>
          <Button
            sx={{
              color: theme.palette.grey[100],
              bgcolor:
                location.pathname === "/infermiers" ||
                location.pathname === `/infermiers/update/${id}/indermiers` ||
                location.pathname === `/infermiers/detail/${id}/indermiers` ||
                location.pathname === `/admin/infermiers/add/infermiers` ||
                /\/update\/\d+\/.*$/.test(
                  "/infermiers" ||
                    `/infermiers/update/${id}/infermiers` ||
                    `/infermiers/detail/${id}/infermiers` ||
                    "/admin/infermiers/add/infermiers"
                ) // Matches /update/{any number}/{any path}
                  ? "gray"
                  : null,
            }}
            onClick={() => {
              navigate("/infermiers");
            }}
          >
            Infermiers
          </Button>
          <Button
            sx={{
              color: theme.palette.grey[100],
              bgcolor:
                location.pathname === "/patients" ||
                location.pathname === `/patients/update/${id}/patients` ||
                location.pathname === `/patients/detail/${id}/patients` ||
                location.pathname === `/admin/patients/add/patients` ||
                /\/update\/\d+\/.*$/.test(
                  "/patients" ||
                    `/update/${id}/patients` ||
                    `/detail/${id}/patients` ||
                    "/admin/patients/add/patients"
                ) // Matches /update/{any number}/{any path}
                  ? "gray"
                  : null,
            }}
            onClick={() => {
              navigate("/patients");
            }}
          >
            Patients
          </Button>

          <Button
            sx={{
              color: theme.palette.grey[100],
              bgcolor:
                location.pathname === "/departements" ||
                location.pathname ===
                  `/departements/update/${id}/departements` ||
                location.pathname ===
                  `/departements/detail/${id}/departements` ||
                location.pathname === `/admin/departements/add/departements` ||
                /\/update\/\d+\/.*$/.test(
                  "/departements" ||
                    `/departements/update/${id}/departements` ||
                    `/departements/detail/${id}/departements` ||
                    `/admin/departements/add/departements`
                ) // Matches /update/{any number}/{any path}
                  ? "gray"
                  : null,
            }}
            onClick={() => {
              navigate("/departements");
            }}
          >
            Departements
          </Button>

          <Button
            sx={{
              color: theme.palette.grey[100],
              bgcolor: location.pathname === "/statistiques" ? "gray" : null,
            }}
            onClick={() => {
              navigate("/statistiques");
            }}
          >
            Statistiques
          </Button>
        </Stack>

        <Stack direction={"row"}>
          {theme.palette.mode === "light" ? (
            <IconButton
              onClick={() => {
                toggleMode();
                console.log("light");
              }}
              color="inherit"
              aria-label="delete"
            >
              <LightModeOutlined />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                toggleMode();
                console.log("dark");
              }}
              color="inherit"
              aria-label="delete"
            >
              <DarkModeOutlined />
            </IconButton>
          )}

          <IconButton
            onClick={() => {
              navigate("/profileAdmin");
            }}
            color="inherit"
            aria-label="delete"
            sx={{
              bgcolor: location.pathname === `/profileAdmin` ? "gray" : null,
            }}
          >
            <Person2OutlinedIcon />
          </IconButton>

          <Button
            variant="contained"
            color="error"
            sx={{
              textTransform: "capitalize",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <LogoutIcon /> log out
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
