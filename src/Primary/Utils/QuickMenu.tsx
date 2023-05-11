import * as React from 'react';
import {styled} from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";

const images = [
    {
        url: 'https://www.jaimefruitsetlegumes.ca/wp-content/uploads/2019/09/assiettele%CC%81gumes-nadine-primeau-unsplash-e1568206963609-1170x525.jpg',
        title: 'Ajouter un repas',
        navigationUrl: '/journal',
        width: '100%',
    },
    {
        url: 'https://res.cloudinary.com/hv9ssmzrz/image/fetch/c_fill,f_auto,h_360,q_auto,w_740/https://images-ca-1-0-1-eu.s3-eu-west-1.amazonaws.com/photos/original/850/cuisine_economique_Fotolia_125474618_S.jpg',
        title: 'Ajouter une recette',
        navigationUrl: '/journal',
        width: '100%',
    },
    {
        url: 'https://www.netoffensive.blog/wp-content/uploads/2019/11/statistiques-referencement-naturel.jpg',
        title: 'Statistiques',
        navigationUrl: '/journal',
        width: '100%',
    },
];

const ImageButton = styled(ButtonBase)(({theme}) => ({
    position: 'relative',
    height: 100,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({theme}) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
}));

const ImageBackdrop = styled('span')(({theme}) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({theme}) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

const QuickMenu = () => {
    const navigation = useNavigate()

    return (
        <Grid container minWidth={300} width="100%" spacing={2} p={2}>
            {images.map((image) => (
                <Grid item container>
                    <ImageButton
                        focusRipple
                        key={image.title}
                        style={{
                            width: image.width
                        }}
                        onClick={() => navigation(image.navigationUrl)}
                    >
                        <ImageSrc style={{backgroundImage: `url(${image.url})`, borderRadius: "7px"}}/>
                        <ImageBackdrop className="MuiImageBackdrop-root"/>
                        <Image>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                sx={{
                                    position: 'relative',
                                    p: 4,
                                    pt: 2,
                                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                }}
                            >
                                {image.title}
                                <ImageMarked className="MuiImageMarked-root"/>
                            </Typography>
                        </Image>
                    </ImageButton>
                </Grid>
            ))}
        </Grid>
    );
}

export default QuickMenu;