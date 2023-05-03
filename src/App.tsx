import React, {useEffect, useState} from 'react';
import './App.css';
import Home from "./Primary/Pages/Home/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFound from "./Primary/Pages/NotFound";
import ResponsiveAppBar from "./Primary/Navbar";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import StatsPage from "./Primary/Pages/Stats/StatsPage";
import ProfilePage from "./Primary/Pages/Profile/ProfilePage";
import RegisterPage from "./Primary/Pages/Register/RegisterPage";
import LoginPage from "./Primary/Pages/Login/LoginPage";
import JournalPage from "./Primary/Pages/Journal/JournalPage";
import RecipePage from "./Primary/Pages/Recipe/RecipePage";
import JournalHystoryPage from "./Primary/Pages/JournalHistory/JournalHystoryPage";

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
                        <Routes>
                            <Route path="/" element={(
                                <>
                                    <ResponsiveAppBar onThemeChange={setTheme}/>
                                    <Home/>
                                </>
                            )}></Route>
                            <Route path="/journal" element={(
                                <>
                                    <ResponsiveAppBar onThemeChange={setTheme}/>
                                    <JournalPage/>
                                </>
                            )}></Route>
                            <Route path="/journalHistory" element={(
                                <>
                                    <ResponsiveAppBar onThemeChange={setTheme}/>
                                    <JournalHystoryPage/>
                                </>
                            )}></Route>
                            <Route path="/recipe" element={(
                                <>
                                    <ResponsiveAppBar onThemeChange={setTheme}/>
                                    <RecipePage/>
                                </>
                            )}></Route>
                            <Route path="/stats" element={(
                                <>
                                    <ResponsiveAppBar onThemeChange={setTheme}/>
                                    <StatsPage/>
                                </>
                            )}></Route>
                            <Route path="/profile" element={(
                                <>
                                    <ResponsiveAppBar onThemeChange={setTheme}/>
                                    <ProfilePage/>
                                </>
                            )}></Route>
                            <Route path="/login" element={<LoginPage/>}></Route>
                            <Route path="/register" element={<RegisterPage/>}></Route>
                            <Route path="/*" element={<NotFound/>}></Route>
                        </Routes>
                    </BrowserRouter>
                </CssBaseline>
            </ThemeProvider>
        </>
    );
}

export default App;
