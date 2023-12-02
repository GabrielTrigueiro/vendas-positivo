import { createTheme } from "@mui/material";

const PositivoTheme = createTheme({
  palette: {
    primary: {
      main: "#ccc",
      dark: "#ccc",
    },
    secondary: {
      main: "rgb(16, 175, 205)",
      light: "#88e3f7",
    },
  },
  typography: {
    fontFamily: "Nunito",
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: "secondary",
      },
      variants: [
        {
          props: { variant: "contained" },
          style: ({ theme }) => ({
            color: "#fff",
            boxShadow: "none",
            fontSize: "1pc",
            borderColor: "transparent",
            "&:hover": {
              boxShadow: "none",
              backgroundColor: theme.palette.secondary.light,
            },
          }),
        },
      ],
    },
  },
});

export default PositivoTheme;
