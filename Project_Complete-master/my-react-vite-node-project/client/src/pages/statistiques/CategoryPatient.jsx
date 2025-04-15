import { Paper, Stack, Typography } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";

const CategoryPatient = () => {
  const data = [
    {
      specialite: "Urgence",
      Enfants: 120,
      Adultes: 200,
      Séniors: 80,
    },
    {
      specialite: "Cardiologie",
      Enfants: 30,
      Adultes: 150,
      Séniors: 100,
    },
    {
      specialite: "Pédiatrie",
      Enfants: 220,
      Adultes: 50,
      Séniors: 10,
    },
    {
      specialite: "Orthopédie",
      Enfants: 70,
      Adultes: 160,
      Séniors: 60,
    },
    {
      specialite: "Dermatologie",
      Enfants: 90,
      Adultes: 140,
      Séniors: 50,
    },
  ];

  return (
    <Stack direction={"row"}>
      <Paper
        sx={{
          height: "550px",
          padding: "20px",
          width: "750px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "start",
          alignItems: "start",
          marginBottom: "34px",
        }}
      >
        <Typography
          variant="h1"
          style={{
            width: "100%",
            textAlign: "center",
            marginBottom: "20px",
            textTransform: "capitalize",
            fontSize: "32px",
            fontWeight: "bold",
            padding: "20px 0",
          }}
        >
          Répartition des Patients par Tranche <br />
          d'Âge
        </Typography>

        <ResponsiveBar
          height={360}
          data={data}
          keys={["Enfants", "Adultes", "Séniors"]}
          indexBy="specialite"
          margin={{ top: 20, right: 130, bottom: 70, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Spécialité",
            legendPosition: "middle",
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Nombre de patients",
            legendPosition: "middle",
            legendOffset: -50,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          theme={{
            background: "rgba(208, 208, 208, 0.7)",
            text: {
              fontSize: 16,
              fill: "#333333",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
          }}
          role="application"
          ariaLabel="Bar chart représentant les patients par catégorie"
          barAriaLabel={(e) =>
            `${e.id}: ${e.formattedValue} patients dans la spécialité : ${e.indexValue}`
          }
        />
      </Paper>
    </Stack>
  );
};

export default CategoryPatient;
