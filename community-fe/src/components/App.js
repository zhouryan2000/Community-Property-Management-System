import TopBar from './TopBar';
import Main from "./Main";
import Footer from './Footer';
import React, {useEffect, useState} from "react";
import {Redirect, useHistory} from 'react-router-dom';


function App(props) {
    const history = useHistory();

    useEffect(() => {
        console.log(selected);
    })
    // const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState(
        // localStorage.getItem(TOKEN_KEY) ? true : false
        false
    );
    const [selected, setSelected] = useState('dashboard');

    const logout = () => {
        console.log("log out");
        // localStorage.removeItem(TOKEN_KEY);
        setIsLoggedIn(false);
    };

    const loggedIn = (token) => {
        if (token) {
            setIsLoggedIn(true);
        }
    }

    const changeSelected = (key) => {
        console.log("change selected -> ", key);
        setSelected(key);
        history.push('/' + key);
        console.log(selected);
    }
    return (
    // <div>
    //     <TopBar />
    // </div>

        <div className="App">
            <TopBar isLoggedIn={isLoggedIn} handleLogout={logout} selected={selected} changeSelected={changeSelected} />
            <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} history={history}/>
            <Footer />
        </div>
    );
}

export default App;
