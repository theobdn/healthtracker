import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {Divider} from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from "react-router-dom";

interface ResponsiveAppBarInterface {
    onThemeChange: (isLightTheme: boolean) => void
}

const ResponsiveAppBar = (props: ResponsiveAppBarInterface) => {
    const navigation = useNavigate()
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
    const [isLightTheme, setIsLightTheme] = useState<boolean>(false)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleThemeChange = () => {
        setIsLightTheme(prevState => !prevState)
        isLightTheme ? props.onThemeChange(true) : props.onThemeChange(false)
    }

    const handleNavigation = (pageName: string) => {
        if (pageName === "journal") {
            navigation("/journal")
        } else if (pageName === "stats") {
            navigation("/stats")
        } else if (pageName === "profile") {
            navigation("/profile")
            handleCloseUserMenu()
        } else if (pageName === "logout") {
            navigation("/")
            handleCloseUserMenu()
        }
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src="./logo.png" alt="logo" style={{width: "50px", height: "50px"}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        HEALTH TRACKER
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>

                        {/********************************RESPONSIVE MENU LINKS*********************************/}
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Mon journal</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Stats</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    {/********************************DEFAULT MENU LINKS*********************************/}
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <Button
                            onClick={() => handleNavigation("journal")}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Mon journal
                        </Button>
                        <Button
                            onClick={() => handleNavigation("stats")}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            Statistiques
                        </Button>
                    </Box>

                    <Box sx={{flexGrow: 0, display: "flex"}}>
                        <Tooltip title="Change theme">
                            <IconButton onClick={handleThemeChange} sx={{p: 0, marginRight: "15px"}}>
                                {isLightTheme ? <DarkModeIcon/> : <LightModeIcon/>}
                            </IconButton>
                        </Tooltip>
                        <Divider flexItem orientation="vertical"/>

                        {/********************************AVATAR MENU*********************************/}
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0, marginLeft: "15px"}}>
                                <Avatar alt="Remy Sharp">
                                    <PersonIcon/>
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={() => handleNavigation("profile")}>
                                <Typography textAlign="center">Mon profil</Typography>
                            </MenuItem>
                            <Divider variant="middle"/>
                            <MenuItem onClick={() => handleNavigation("logout")}>
                                <Typography textAlign="center">Déconnexion</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
