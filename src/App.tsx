import React, {useEffect, useState} from 'react';
import './App.css';
import Home from "./Primary/Pages/Home/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFound from "./Primary/Pages/NotFound";
import ResponsiveAppBar from "./Primary/Navbar";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import JournalPage from "./Primary/Pages/Journal/JournalPage";
import StatsPage from "./Primary/Pages/Stats/StatsPage";
import ProfilePage from "./Primary/Pages/Profile/ProfilePage";
import SettingsPage from "./Primary/Pages/Settings/SettingsPage";

const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#2196f3",
            dark: "#1769aa",
            light: "#4dabf5"
        },
        secondary: {
            main: "#f50057",
            dark: "#ab003c",
            light: "#f73378"
        },
        background: {
            default: "#000",
            paper: "#2f2f2f"
        },
        text: {
            primary: "#fff",
            secondary: "#d9d9d9"
        }
    }
})

const lightTheme = createTheme({
    palette: {
        primary: {
            main: "#2196f3",
            dark: "#1769aa",
            light: "#4dabf5"
        },
        secondary: {
            main: "#f50057",
            dark: "#ab003c",
            light: "#f73378"
        },
        background: {
            default: "#fff",
            paper: "#f3f3f3"
        },
        text: {
            primary: "#232323",
            secondary: "#444444"
        }
    }
})

function App() {
    const [isLightTheme, setIsLightTheme] = useState<boolean>(false)

    useEffect(() => {
        isLightTheme ? localStorage.setItem("HealthTrackerTheme", "lightTheme") : localStorage.setItem("HealthTrackerTheme", "darkTheme")
    }, [isLightTheme])

    useEffect(() => {
        const theme = localStorage.getItem("HealthTrackerTheme")
        if (theme === "lightTheme") {
            setIsLightTheme(true)
        } else {
            setIsLightTheme(false)
        }
    }, [isLightTheme])

    const setTheme = (isLightTheme: boolean) => {
        isLightTheme ? setIsLightTheme(false) : setIsLightTheme(true)
    }

  return (
      <>
          <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
              <CssBaseline>
                  <BrowserRouter>
                      <ResponsiveAppBar onThemeChange={setTheme}/>
                      <Routes>
                          <Route path="/" element={<Home/>}></Route>
                          <Route path="/journal" element={<JournalPage/>}></Route>
                          <Route path="/stats" element={<StatsPage/>}></Route>
                          <Route path="/profile" element={<ProfilePage/>}></Route>
                          <Route path="/settings" element={<SettingsPage/>}></Route>
                          <Route path="/*" element={<NotFound/>}></Route>
                      </Routes>
                  </BrowserRouter>
              </CssBaseline>
          </ThemeProvider>
      </>
  );
}

export default App;
