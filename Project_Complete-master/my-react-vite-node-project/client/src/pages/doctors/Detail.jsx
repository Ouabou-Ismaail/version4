import { Box, Button, Link, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowBackOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Detail = ({ doctorsData, infermiersData, patientsData }) => {
  const navigate = useNavigate();

  const { id, category } = useParams(); // Obtenir l'ID du docteur depuis l'URL

  //console.log("ID:", id);
  //console.log("Category:", category);

  // Convertir l'ID de string en nombre pour qu'il corresponde à doctor.id
  const idClicked = Number(parseInt(id, 10));

  // Trouver le docteur par ID
  let personne;
  if (category === "doctors") {
    personne = doctorsData.find(
      (personne) => String(personne.id) === String(idClicked)
    );
  } else if (category === "infermiers") {
    personne = infermiersData.find(
      (personne) => String(personne.id) === String(idClicked)
    );
  } else if (category === "patients") {
    personne = patientsData.find(
      (personne) => String(personne.id) === String(idClicked)
    );
  }

  return (
    <Paper
      sx={{
        position: "relative",
        p: "58px",
        mx: "auto",
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
            width: "fit-content",
            display: "flex",
            justifyContent: "center",
            mx: "auto",
            mb: "50px",
            pb: "5px",
            textTransform: "capitalize",
            borderBottom: "1px solid gray",
          }}
        >
          {category === "doctors"
            ? `Plus d'informations sur: Dr.${personne.nom} ${personne.prenom}`
            : category === "infermiers"
            ? `Plus d'informations sur infermier: ${personne.nom} ${personne.prenom}`
            : `Plus d'informations sur patient: ${personne.nom} ${personne.prenom}`}
        </Typography>
      </Stack>

      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
        }}
      >
        {/* Afficher l'image dynamique du personne */}
        <Paper
          variant="outlined"
          sx={{
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          {/* Chemin dynamique pour l'image du personne */}
          {personne.image === null ? (
            <img
              style={{ width: "100%", height: "100%", boxShadow: "12" }}
              src={`/images/${personne.image}`} // Chemin d'image dynamique basé sur le personne
              alt={`${personne.nom} ${personne.prenom}`}
            />
          ) : (
            <h1
              style={{
                textAlign: "center",
                lineHeight: "500px",
                margin: "auto",
                letterSpacing: "6px",
              }}
            >
              PROFILE DE{" "}
              {category.substring(0, category.length - 1).toUpperCase()}
            </h1>
          )}
        </Paper>

        <Box>
          {category !== "patients" ? (
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "45px",
                fontSize: "26px",
                textTransform: "capitalize",
              }}
            >
              <li style={{ marginBottom: "-60px", marginTop: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>Id:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>{personne.id}</h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>Nom:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>{personne.nom}</h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>prenom:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>{personne.prenom}</h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>Cin:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>{personne.pb}</h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>Age:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>{personne.age}</h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>Email:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>{personne.email}</h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>N° de telephone:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>
                    {personne.numero_Tele}
                  </h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>Adresse:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>{personne.adress}</h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>Statut:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>{personne.statut}</h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>Département:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>
                    {personne.departement}
                  </h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>Salaire:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>{personne.salary}</h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <p>Cv:</p>{" "}
                  {personne.cv ? (
                    <Link href={`./CVs/${personne.cv}.pdf`} download="cv.pdf">
                      <h3 style={{ fontFamily: "cursive" }}> Download CV</h3>
                    </Link>
                  ) : (
                    <h3 style={{ fontFamily: "cursive" }}>no cv</h3>
                  )}
                </li>
              </li>
            </ul>
          ) : (
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "45px",
                fontSize: "26px",
                textTransform: "capitalize",
              }}
            >
              <li style={{ marginBottom: "-60px", marginTop: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>Id:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>{personne.id}</h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>Nom:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>{personne.nom}</h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>prenom:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>{personne.prenom}</h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>Cin:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>{personne.pb}</h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>Age:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>{personne.age}</h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>Email:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>{personne.email}</h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>N° de telephone:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>
                    {personne.numero_Tele}
                  </h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>Adresse:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>{personne.adress}</h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>Statut:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>{personne.statut}</h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>prochaine rendez-vous:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>
                    {personne.rendezVous}
                  </h3>
                </li>
              </li>

              <li style={{ marginBottom: "-60px" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    listStyle: "disc",
                  }}
                >
                  <p>Doctor traitant:</p>{" "}
                  <h3 style={{ fontFamily: "cursive" }}>
                    Dr.{personne.doctor_traitant}
                  </h3>
                </li>
              </li>
            </ul>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

export default Detail;
