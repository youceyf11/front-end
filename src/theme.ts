import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#9aaa5f', // New primary color
        },
        secondary: {
            main: '#8e8884', // New secondary color
        },
        background: {
            default: '#e1dada',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
    shape: {
        borderRadius: 10,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
});

export default theme;