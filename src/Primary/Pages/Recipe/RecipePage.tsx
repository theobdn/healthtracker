import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {decrement, increment, incrementByAmount} from "../../../Secondary/Redux/Slices/counterSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../Secondary/Redux/Store/store";

const RecipePage = () => {

    const count = useSelector((state: RootState) => state.counter.count);
    const USER = useSelector((state: RootState) => state.profile.user);
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(increment());
    };

    const handleDecrement = () => {
        dispatch(decrement());
    };

    const handleIncrementByAmount = () => {
        dispatch(incrementByAmount(5));
    };

    return (
        <Box sx={{width: '100%', bgcolor: "white"}}>
            {count}
            <Button onClick={handleIncrement}>+</Button>
            <Button onClick={handleDecrement}>-</Button>
            <Button onClick={handleDecrement}>get user</Button>
            <Typography>
                {USER?.name}
            </Typography>
            {/*<Button onClick={handleDecrement()}>-</Button>*/}
        </Box>
    );
};

export default RecipePage;