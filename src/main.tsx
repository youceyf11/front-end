import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import {CssBaseline, GlobalStyles, ThemeProvider} from "@mui/material";
import theme from "./theme.ts";

createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={{html: { webkitFontSmoothing: "auto"} }} />
          <StrictMode>
              <BrowserRouter>
            <App />
              </BrowserRouter>
          </StrictMode>
    </ThemeProvider>
)


