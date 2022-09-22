import React, { useState } from "react";
import {
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import {Router} from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Mainpage from "./Mainpage";
import Dashboard from "./Dashboard";
import Payment from "./Payment";
import Booking from "./Booking";
import Posts from "./Posts";

function Main(props) {
    const { isLoggedIn, handleLoggedIn, history } = props;

    const showLogin = () => {
        return isLoggedIn ? (
         <Redirect to="/dashboard" />
        ) : (
         <Login handleLoggedIn={handleLoggedIn} />
        );
    };

    const showPayment = () => {
        console.log("show payment");
        return isLoggedIn ? (
            <Payment />
        ) : (
            <Redirect to="/" />
        );
    }

    const showDashboard = () => {
        console.log("show dashboard");
        return isLoggedIn ? (
            <Dashboard />
        ) : (
            <Redirect to="/" />
        );
    }

    const showBooking = () => {
        console.log("show booking");
        return isLoggedIn ? (
            <Booking />
        ) : (
            <Redirect to="/" />
        );
    }

    const showPosts = () => {
        console.log("show posts");
        return isLoggedIn ? (
            <Posts />
        ) : (
            <Redirect to="/" />
        );
    }


    return (
        <div className="main">
            <Router history={history}>
                <Switch>
                    <Route exact path="/">
                        <Mainpage />
                    </Route>
                    <Route path="/login" render={showLogin} />
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/dashboard" render={showDashboard} />
                    <Route path="/payment" render={showPayment} />
                    <Route path="/booking" render={showBooking} />
                    <Route path="/posts" render={showPosts} />
                </Switch>
            </Router>
        </div>
    );
}

export default Main;