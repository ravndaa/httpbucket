import React from "react";

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            //setAuth: this.setAuth.bind(this),
        }
    }

    componentDidMount() {
        this.setAuth(this.props.value.isAuth)
    }

    setAuth = (isAuth) => {
        this.setState({isAuth:isAuth});
    }


    render() {
        return (
            <AppContext.Provider value={{appContext:{isAuth:this.state.isAuth, setAuth: this.setAuth}}}>
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