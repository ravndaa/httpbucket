import React, { } from 'react'
import { Redirect, Route } from "react-router-dom";




function getToken() {
    try {
        const jwt = localStorage.getItem("token");
        if(jwt === null) {
            
            return false;
        }
        
        
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