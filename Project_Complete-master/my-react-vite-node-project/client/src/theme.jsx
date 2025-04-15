const getDesignTokens = (mode) => ({
  palette: {
    mode: mode,
    primary: {
      main: mode === "light" ? "#1976d2" : "#bb86fc", // Bleu dans le mode clair, violet dans le mode sombre
    },
    secondary: {
      main: mode === "light" ? "#ff4081" : "#03dac6", // Rose dans le mode clair, cyan dans le mode sombre
    },
    background: {
      default: mode === "light" ? "#f4f4f4" : "#121212", // Fond blanc dans le mode clair, noir dans le mode sombre
      paper: mode === "light" ? "#ffffff" : "#333333", // Fond des composants (comme Paper)
    },
    text: {
      primary: mode === "light" ? "#000000" : "#ffffff", // Texte noir pour le mode clair, texte blanc pour le mode sombre
      secondary: mode === "light" ? "#757575" : "#bdbdbd", // Texte secondaire ajusté pour chaque mode
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
      color: mode === "light" ? "#000" : "#fff",
    },
    h2: {
      fontSize: "1.75rem",
      color: mode === "light" ? "#000" : "#fff",
    },
    body1: {
      fontSize: "1rem",
      color: mode === "light" ? "#000" : "#e0e0e0", // Ajuste la couleur du texte en fonction du mode
    },
  },
});

export default getDesignTokens;
