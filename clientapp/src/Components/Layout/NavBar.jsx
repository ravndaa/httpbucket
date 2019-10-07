import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles, useScrollTrigger, Avatar, Grid, IconButton } from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { withApp } from "../../Services/AuthContext";
import logo from './logo.png';


const styles = {
    root: {
       
        
    },
    title: {
        flexGrow: 1,

    },
    logolink: {
        '&:hover': {
            textDecoration: 'none',
        },
        '&:link':{
            textDecoration: 'none',
        },
    },
};



function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}


class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    componentDidMount() {


    }


    render() {
        return (
            <ElevationScroll>
                <AppBar className={this.props.classes.appBar} position="sticky">
                    <Toolbar>
                        <IconButton onClick={this.props.toggleDrawer} edge="start" className={this.props.classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon color="secondary" />
                        </IconButton>
                        <Typography variant="h6" className={this.props.classes.title}>

                            <RouterLink to="/" className={this.props.classes.logolink}>
                                <Grid container justify="flex-start" alignItems="center" >
                                <Avatar alt="logo" src={logo} className={this.props.classes.avatar} />
                                    httpBucket
                                            </Grid>
                            </RouterLink>
                        </Typography>
                        <Grid>
                            <Button component={RouterLink} to="/" color="inherit">Home</Button>
                            <Button component={RouterLink} to="/about" color="inherit">About</Button>

                            {!this.props.appContext.isAuth ? (
                                <Button component={RouterLink} to="/login" color="inherit" > Login</Button>
                            ) : (
                                    <Button component={RouterLink} to="/admin" color="inherit">Admin</Button>
                                )}
                        </Grid>

                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        )
    }
}
export default withStyles(styles)(withApp(NavBar));