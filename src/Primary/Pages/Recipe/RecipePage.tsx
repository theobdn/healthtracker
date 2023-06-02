import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../Secondary/Redux/Store/store";

const RecipePage = () => {

    const USER = useSelector((state: RootState) => state.profile.user);
    const dispatch = useDispatch();



    return (
        <Box sx={{width: '100%', bgcolor: "white"}}>
            <Typography>
                {USER?.name}
            </Typography>
            {/*<Button onClick={handleDecrement()}>-</Button>*/}
        </Box>
    );
};

export default RecipePage;