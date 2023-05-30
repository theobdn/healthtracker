import React, {useEffect} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../../Secondary/Redux/Store/store';

const ProtectedRoute = () => {
    const userLogged = useSelector((state: RootState) => state.profile.user)

    useEffect(() => {
        console.log(userLogged)
    }, [userLogged])

    return userLogged ? <Outlet/> : <Navigate to="/login"/>;
};

export default ProtectedRoute;