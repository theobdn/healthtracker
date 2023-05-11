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
import RegisterMoreInfosPage from "./Primary/Pages/Register/RegisterMoreInfosPage";
import axios from "axios";

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
    // const navigation = useNavigate()
    const [isLightTheme, setIsLightTheme] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    const [userLogged, setUserLogged] = useState(undefined)

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

    useEffect(() => {
        axios.get(`http://localhost:8080/api/profil`, {
            headers: {
                "Authorization": `${localStorage.getItem("HealthTrackerJWT")}`
            }
        })
            .then(function (response) {
                setAuthenticated(true)
                setUserLogged(response.data)
                console.log(response)
            })
            .catch(function (error) {
                setAuthenticated(false)
                setUserLogged(undefined)
                localStorage.removeItem("HealthTrackerJWT")
                console.log(error)
            })
    }, [])

    const setTheme = (isLightTheme: boolean) => {
        isLightTheme ? setIsLightTheme(false) : setIsLightTheme(true)
    }

    const handleSubmitClick = (jwt: string) => {
        localStorage.setItem("HealthTrackerJWT", jwt)
    }

    useEffect(() => {
        console.log(userLogged)
        console.log(authenticated)
    }, [authenticated, userLogged])

    return (
        <>
            <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
                <CssBaseline>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={(
                                <>
                                    {authenticated && userLogged ?
                                        <>
                                            <ResponsiveAppBar onThemeChange={setTheme}/>
                                            <Home userLoggedProfile={userLogged}/>
                                        </>
                                        :
                                        <LoginPage onSubmitClick={handleSubmitClick}/>
                                    }
                                </>
                            )}>
                            </Route>
                            <Route path="/journal" element={(
                                <>
                                    {authenticated && userLogged ?
                                        <>
                                            <ResponsiveAppBar onThemeChange={setTheme}/>
                                            <JournalPage/>
                                        </>
                                        :
                                        <LoginPage onSubmitClick={handleSubmitClick}/>
                                    }
                                </>
                            )}>
                            </Route>
                            <Route path="/journalHistory" element={(
                                <>
                                    {authenticated && userLogged ?
                                        <>
                                            <ResponsiveAppBar onThemeChange={setTheme}/>
                                            <JournalPage/>
                                        </>
                                        :
                                        <JournalHystoryPage/>
                                    }
                                </>
                            )}>
                            </Route>
                            <Route path="/recipe" element={(
                                <>
                                    {authenticated && userLogged ?
                                        <>
                                            <ResponsiveAppBar onThemeChange={setTheme}/>
                                            <RecipePage/>
                                        </>
                                        :
                                        <JournalHystoryPage/>
                                    }
                                </>
                            )}>
                            </Route>
                            <Route path="/stats" element={(
                                <>
                                    {authenticated && userLogged ?
                                        <>
                                            <ResponsiveAppBar onThemeChange={setTheme}/>
                                            <StatsPage/>
                                        </>
                                        :
                                        <StatsPage/>
                                    }
                                </>
                            )}>
                            </Route>
                            <Route path="/profile" element={(
                                <>
                                    {authenticated && userLogged ?
                                        <>
                                            <ResponsiveAppBar onThemeChange={setTheme}/>
                                            <ProfilePage/>
                                        </>
                                        :
                                        <LoginPage onSubmitClick={handleSubmitClick}/>
                                    }
                                </>
                            )}>
                            </Route>
                            <Route path="/login" element={(
                                <>
                                    {authenticated && userLogged ?
                                        <>
                                            <ResponsiveAppBar onThemeChange={setTheme}/>
                                            <Home userLoggedProfile={userLogged}/>
                                        </>
                                        :
                                        <LoginPage onSubmitClick={handleSubmitClick}/>
                                    }
                                </>
                            )}>
                            </Route>
                            <Route path="/register" element={<RegisterPage/>}></Route>
                            <Route path="/registerMoreInfos/:userId" element={<RegisterMoreInfosPage/>}></Route>
                            <Route path="/*" element={<NotFound/>}></Route>
                        </Routes>
                    </BrowserRouter>
                </CssBaseline>
            </ThemeProvider>
        </>
    );
}

export default App;
