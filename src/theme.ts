import { createTheme } from "@mui/material";

const PositivoTheme = createTheme({
  palette: {
    primary: {
      main: "#00AECB",
      dark: "#858796",
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
            fontSize: "1pc",
            borderColor: "transparent",
            "&:hover": {
              backgroundColor: theme.palette.secondary.light,
            },
          }),
        },
      ],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default PositivoTheme;
