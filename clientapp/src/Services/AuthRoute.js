import React, { } from 'react'
import { Redirect, Route } from "react-router-dom";




function getToken() {
    try {
        const jwt = localStorage.getItem("token");
        if(jwt === null) {
            console.log("NOT LOGGED IN ")
            return false;
        }
        
        return true;
    } catch (error) {
        console.log("DAMN: " +error)
        
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
                if (getToken() === true) {
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