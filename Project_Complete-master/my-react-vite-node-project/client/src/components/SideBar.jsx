import React from "react";
import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import "../theme";
import GroupAddOutlined from "@mui/icons-material/GroupAddOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AirlineSeatIndividualSuiteOutlined from "@mui/icons-material/AirlineSeatIndividualSuiteOutlined";
import HouseSidingOutlined from "@mui/icons-material/HouseSidingOutlined";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MapsHomeWorkOutlined from "@mui/icons-material/MapsHomeWorkOutlined";
import AccessibleOutlined from "@mui/icons-material/AccessibleOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import { HomeOutlined, PeopleOutlined } from "@mui/icons-material";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const SlidBar = ({ open, handleDrawerClose, toggleMode }) => {
  const { id } = useParams(); // Extract the id from the URL using useParams
  const location = useLocation();
  const navigate = useNavigate();

  const drawerWidth = 240;

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.paper,

    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": {
            ...openedMixin(theme),
            backgroundColor: theme.palette.background.paper,
          },
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": {
            ...closedMixin(theme),
            backgroundColor: theme.palette.background.paper, // Ensure the paper has the same red background
          },
        },
      },
    ],
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",

    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const theme = useTheme();

  const Array1 = [
    { text: "dashboard", icon: <HomeOutlined />, path: "/admin-dashboard" },
    { text: "doctors", icon: <PeopleOutlined />, path: "/doctors" },
    {
      text: "autres employes",
      icon: <GroupAddOutlined />,
      path: "/infermiers",
    },
    {
      text: "patients",
      icon: <AccessibleOutlined />,
      path: "/patients",
    },
    {
      text: "departements",
      icon: <MapsHomeWorkOutlined />,
      path: "/departements",
    },
    {
      text: "statistiques",
      icon: <BarChartIcon />,
      path: "/statistiques",
    },
  ];

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <Avatar
        sx={{
          width: open ? 100 : 60,
          height: open ? 100 : 60,
          mx: "auto",
          my: "8px",
          border: "2px solid gray",
          transition: "0.5s",
        }}
        alt="Travis Howard"
      >
        H
      </Avatar>

      <Typography
        sx={{
          mx: "auto",
          fontSize: open ? "18px" : "0px",
          transition: "0.5s",
          textTransform: "capitalize",
        }}
      >
        Hopital
      </Typography>
      <Typography
        sx={{
          mx: "auto",
          fontSize: open ? "16px" : "0px",
          mb: "5px",
          transition: "0.5s",
          color: theme.palette.error.main,
        }}
      >
        Admin
      </Typography>

      <Divider />

      <List>
        {Array1.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
              }}
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                  bgcolor:
                    location.pathname === item.path ||
                    location.pathname === `${item.path}/update/${id}` ||
                    location.pathname === `${item.path}/detail/${id}` ||
                    location.pathname === `/admin${item.path}/add` ||
                    /\/update\/\d+\/.*$/.test(location.pathname)
                      ? "gray"
                      : null,
                  transition: "0.9s",
                },
                open
                  ? {
                      justifyContent: "initial",
                    }
                  : {
                      justifyContent: "center",
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: "auto",
                      },
                ]}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SlidBar;
