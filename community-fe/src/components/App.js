import TopBar from './TopBar';
import Main from "./Main";
import Footer from './Footer';
import React, {useEffect, useState} from "react";
import {Redirect, useHistory} from 'react-router-dom';


function App(props) {
    const history = useHistory();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        console.log(selected);
    })
    const [isLoggedIn, setIsLoggedIn] = useState(
        false
    );
    const [selected, setSelected] = useState('dashboard');

    const logout = () => {
        console.log("log out");
        // localStorage.removeItem(TOKEN_KEY);
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    const loggedIn = (isAdmin) => {
        if (isAdmin) {
            setIsAdmin(true);
        }
        setIsLoggedIn(true);
    }

    const changeSelected = (key) => {
        console.log("change selected -> ", key);
        setSelected(key);
        history.push('/' + key);
        console.log(selected);
    }
    return (

        <div className="App">
            <TopBar isLoggedIn={isLoggedIn} handleLogout={logout} selected={selected} changeSelected={changeSelected} />
            <Main isLoggedIn={isLoggedIn} isAdmin={isAdmin} handleLoggedIn={loggedIn} history={history}/>
            <Footer />
        </div>
    );
}

export default App;
