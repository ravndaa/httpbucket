import React from "react";

export const AppContext = React.createContext(
{
    appContext: {
        isAuth: false,
        setAuth: () => {}
    }
}
);

export class AppProvider extends React.Component {
    constructor() {
        super();
        this.state = {
            isAuth: false,
            setAuth: this.setAuth.bind(this),
        }
    }

    setAuth = (isAuth) => {
        this.setState({isAuth:isAuth});
    }


    render() {
        return (
            <AppContext.Provider value={{appContext:{...this.state}}}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

export function withApp(Component) {
    return function AppComponent(props) {
        return( 
            <AppContext.Consumer>
                {contexts => <Component {...props} {...contexts} />}
            </AppContext.Consumer>
        )
    }
}