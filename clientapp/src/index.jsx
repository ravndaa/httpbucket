import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { blue } from "@material-ui/core/colors";
import { AppProvider } from './Services/AuthContext';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: blue,
    },
});

function hasToken () {
    try {
        
        const jwt = localStorage.getItem("token");
        
        if(jwt === null) {
            
            return false;
        }else {
            return true;
        }
        
        
    } catch (error) {
        console.log("DAMN: " +error)
        return false;
    }
}


const data = {
    isAuth: hasToken(),
}
ReactDOM.render(
    
    <ThemeProvider theme={theme}>
        <AppProvider value={data}>
            <App />
        </AppProvider>
    </ThemeProvider>,

    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
