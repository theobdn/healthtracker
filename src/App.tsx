import React, {useEffect, useState} from 'react';
import './App.css';
import Home from "./Primary/Pages/Home/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotFound from "./Primary/Pages/NotFound";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import RegisterPage from "./Primary/Pages/Register/RegisterPage";
import LoginPage from "./Primary/Pages/Login/LoginPage";
import JournalPage from "./Primary/Pages/Journal/JournalPage";
import RegisterMoreInfosPage from "./Primary/Pages/Register/RegisterMoreInfosPage";
import {getProfile} from "./Secondary/Api/AxiosRequests/ProfilRequests";
import {setUser} from "./Secondary/Redux/Slices/profileSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./Secondary/Redux/Store/store";
import ProtectedRoute from "./Primary/Utils/ProtectedRoutes";
import JournalHystoryPage from "./Primary/Pages/JournalHistory/JournalHystoryPage";
import RecipePage from "./Primary/Pages/Recipe/RecipePage";
import StatsPage from "./Primary/Pages/Stats/StatsPage";
import ProfilePage from "./Primary/Pages/Profile/ProfilePage";
import Navbar from "./Primary/Navbar";

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
    const dispatch = useDispatch()
    const userLogged = useSelector((state: RootState) => state.profile.user)
    const [isLightTheme, setIsLightTheme] = useState(false)

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
        const jwtToken = localStorage.getItem('HealthTrackerJWT')

        if (jwtToken) {
            getProfile()
                .then(function (response) {
                    dispatch(setUser(response.data))
                })
                .catch(function (error) {
                    dispatch(setUser(null))
                    console.log(error)
                });
        }
    }, [dispatch])

    const setTheme = (isLightTheme: boolean) => {
        isLightTheme ? setIsLightTheme(false) : setIsLightTheme(true)
    }

    const handleSubmitClick = (jwt: string) => {
        localStorage.setItem("HealthTrackerJWT", jwt)

        getProfile()
            .then(function (response) {
                dispatch(setUser(response.data))
                console.log("userLogged : ", userLogged, response)
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    return (
        <>
            <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
                <CssBaseline>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<ProtectedRoute/>}>
                                <Route path='/' element={
                                    <>
                                        <Navbar onThemeChange={setTheme}/>
                                        <Home userLoggedProfile={userLogged}/>
                                    </>
                                }/>
                            </Route>
                            <Route path='/journal' element={<ProtectedRoute/>}>
                                <Route path='/journal' element={
                                    <>
                                        <Navbar onThemeChange={setTheme}/>
                                        <JournalPage/>
                                    </>
                                }/>
                            </Route>
                            <Route path='/journalHistory' element={<ProtectedRoute/>}>
                                <Route path='/journalHistory' element={
                                    <>
                                        <Navbar onThemeChange={setTheme}/>
                                        <JournalHystoryPage/>
                                    </>
                                }/>
                            </Route>
                            <Route path='/recipe' element={<ProtectedRoute/>}>
                                <Route path='/recipe' element={
                                    <>
                                        <Navbar onThemeChange={setTheme}/>
                                        <RecipePage/>
                                    </>
                                }/>
                            </Route>
                            <Route path='/stats' element={<ProtectedRoute/>}>
                                <Route path='/stats' element={
                                    <>
                                        <Navbar onThemeChange={setTheme}/>
                                        <StatsPage/>
                                    </>
                                }/>
                            </Route>
                            <Route path='/profile' element={<ProtectedRoute/>}>
                                <Route path='/profile' element={
                                    <>
                                        <Navbar onThemeChange={setTheme}/>
                                        <ProfilePage userLoggedProfile={userLogged}/>
                                    </>
                                }/>
                            </Route>
                            <Route path="/login" element={<LoginPage onSubmitClick={handleSubmitClick}/>}/>
                            <Route path="/register" element={<RegisterPage/>}/>
                            <Route path="/registerMoreInfos/:userId" element={<RegisterMoreInfosPage/>}/>
                            <Route path="/*" element={<NotFound/>}/>
                        </Routes>
                    </BrowserRouter>
                </CssBaseline>
            </ThemeProvider>
        </>
    );
}

export default App;
