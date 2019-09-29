import React, { } from 'react'
import { Redirect, Route } from "react-router-dom";
import jwt_decode from 'jwt-decode';



function getToken() {
    try {
        const jwt = localStorage.getItem("token");
        if(jwt === null) {
            
            return false;
        }
        const decodedjwt = jwt_decode(jwt);
        console.log(decodedjwt);
        return true;
    } catch (error) {
        console.log(error)
    }
}

const AuthRoute = ({
    component: Component,
    ...rest
}) => {

    return (
        <Route
            {...rest}
            render={props => {
                if (getToken()) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default AuthRoute;