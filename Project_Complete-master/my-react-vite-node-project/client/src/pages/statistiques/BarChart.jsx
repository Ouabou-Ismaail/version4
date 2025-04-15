import { ResponsiveBar } from "@nivo/bar";
import { Box, Paper, Stack, Typography } from "@mui/material";

const BarChart = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p>Aucune donnée disponible pour le graphique.</p>;
  }

  return (
    <Stack direction={"row"} visibility={"visible"}>
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
          Nombre de rendez-vous par mois
        </Typography>
        <ResponsiveBar
          height={400}
          data={data}
          keys={["rendezvous"]} // Nombre de rendez-vous
          indexBy="mois" // Mois
          margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          theme={{
            background: "rgba(208, 208, 208, 0.7)",
            text: {
              fontSize: 11,
              fill: "#333333",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
            axis: {
              domain: {
                line: {
                  stroke: "#777777",
                  strokeWidth: 1,
                },
              },
              legend: {
                text: {
                  fontSize: 20,
                  fill: "#333333",
                  outlineWidth: 0,
                  outlineColor: "transparent",
                },
              },
              ticks: {
                line: {
                  stroke: "#777777",
                  strokeWidth: 1,
                },
                text: {
                  fontSize: 16,
                  fill: "#333333",
                  outlineWidth: 0,
                  outlineColor: "transparent",
                },
              },
            },
            grid: {
              line: {
                stroke: "#dddddd",
                strokeWidth: 1,
              },
            },
            legends: {
              title: {
                text: {
                  fontSize: 11,
                  fill: "#333333",
                  outlineWidth: 0,
                  outlineColor: "transparent",
                },
              },
              text: {
                fontSize: 11,
                fill: "#333333",
                outlineWidth: 0,
                outlineColor: "transparent",
              },
              ticks: {
                line: {},
                text: {
                  fontSize: 10,
                  fill: "#333333",
                  outlineWidth: 0,
                  outlineColor: "transparent",
                },
              },
            },
            annotations: {
              text: {
                fontSize: 13,
                fill: "#333333",
                outlineWidth: 2,
                outlineColor: "#ffffff",
                outlineOpacity: 1,
              },
              link: {
                stroke: "#000000",
                strokeWidth: 1,
                outlineWidth: 2,
                outlineColor: "#ffffff",
                outlineOpacity: 1,
              },
              outline: {
                stroke: "#000000",
                strokeWidth: 2,
                outlineWidth: 2,
                outlineColor: "#ffffff",
                outlineOpacity: 1,
              },
              symbol: {
                fill: "#000000",
                outlineWidth: 2,
                outlineColor: "#ffffff",
                outlineOpacity: 1,
              },
            },
            tooltip: {
              wrapper: {},
              container: {
                background: "#ffffff",
                color: "#333333",
                fontSize: 12,
              },
              basic: {},
              chip: {},
              table: {},
              tableCell: {},
              tableCellValue: {},
            },
          }}
          axisBottom={{
            tickSize: 4,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Mois",
            legendPosition: "middle",
            legendOffset: 38,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Nombre de rendez-vous",
            legendPosition: "middle",
            legendOffset: -45,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
        />
      </Paper>
    </Stack>
  );
};

export default BarChart;
