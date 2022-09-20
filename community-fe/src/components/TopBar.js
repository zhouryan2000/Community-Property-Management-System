import React, { useState } from 'react';
import 'antd/dist/antd.min.css';
import '../index.css';
import '../styles/TopBar.css';
import { LogoutOutlined } from "@ant-design/icons"
import { Menu, Button } from 'antd';

const items = [
    {
        label: 'Dashboard',
        key: 'dashboard',
        className: 'menu-item',
    },
    {
        label: 'Payment',
        key: 'payment',
        className: 'menu-item',
    },
    {
        label: 'Booking',
        key: 'booking',
        className: 'menu-item',
        // children: [
        //         {
        //             label: 'Option 1',
        //             key: 'setting:1',
        //         },
        //         {
        //             label: 'Option 2',
        //             key: 'setting:2',
        //         },
        // ]
    },
    {
        label: 'Posts',
        key: 'posts',
        className: 'menu-item',
    },
];

const TopBar = (props) => {
    // const [current, setCurrent] = useState('dashboard');
    const {selected, changeSelected, isLoggedIn, handleLogout} = props;
    // const [isLoggedIn, setIsLoggedIn] = useState(true);

    const onClick = (e) => {
        console.log('click ', e);
        changeSelected(e.key);
    };

    console.log(isLoggedIn);

    return (

        isLoggedIn ?

        <header className="header">
            <span className="title">EasyLife</span>
            <Menu onClick={onClick}
                  selectedKeys={[selected]}
                  mode="horizontal"
                  items={items}
                  className="menu"/>
            <div className="buttons">
                <LogoutOutlined className="logout-button" onClick={handleLogout}/>
            </div>
        </header>
        :
        <header className="header">
            <span className="title">EasyLife</span>
            <div className="not-logged-in-buttons">
                <Button type="text" className="login-in-button" href='./login' target="_self">Login In</Button>
                <Button type="text" className="sign-up-button" href='./register' target="_self">Sign Up</Button>
            </div>
        </header>
    )
};

export default TopBar;