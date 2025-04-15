import { ResponsiveLine } from "@nivo/line";
import { Paper, Stack, Typography } from "@mui/material";

const LineChart = ({ data }) => {
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
          Répartition des Rendez-vous selon les Spécialités
        </Typography>

        <ResponsiveLine
          height={360}
          data={data}
          colors={["#3f51b5", "#f44336", "#009688", "#ff9800", "#9c27b0"]} // Couleurs personnalisées
          margin={{ top: 30, right: 130, bottom: 60, left: 80 }}
          padding={0.3}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          theme={{
            background: "rgba(208, 208, 208, 0.7)",
            text: {
              fontSize: 16,
              fill: "#333333",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Spécialités",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Nombre de Rendez-vous",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="data.yFormatted"
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              translateX: 100,
              translateY: 0,
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 15,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .05)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Paper>
    </Stack>
  );
};

export default LineChart;
