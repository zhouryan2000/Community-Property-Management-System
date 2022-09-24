import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../constants";

function Login(props) {
    const { handleLoggedIn } = props;

    const onFinish = (values) => {
        const { username, password } = values;

        const opt = {
            method: "POST",
            url: `/login?username=${username}&password=${password}`,
            headers: { "Content-Type": "application/json" }
        };
        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    const { data } = res;
                    handleLoggedIn(data);
                    message.success("Login succeed! ");
                }
            })
            .catch((err) => {
                console.log("login failed: ", err.message);
                message.error("Login failed!");
            });
    };

    return (
        <div className="login-form">
            <Form name="normal_login" onFinish={onFinish}>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!"
                        }
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!"
                        }
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    {/*<Button htmlType="submit" className="maintain-button">Login in as Maintainer</Button>*/}
                    <Link to="/register" className="register-link">register now!</Link>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;