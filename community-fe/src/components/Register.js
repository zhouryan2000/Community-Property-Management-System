import React from "react";
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

import { BASE_URL } from "../constants";
import {useHistory} from "react-router-dom"

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 16,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function Register(props) {
    const [form] = Form.useForm();
    const history = useHistory();

    const onFinish = values => {
        console.log('Received values of form: ', values);
        const { email, unit, password, firstName, lastName, username } = values;

        // just for test
        // message.success('Registration succeed!');
        // history.push('/login');
        
        const opt = {
            method: 'POST',
            url: `/signup`,
            data: {
                email: email,
                unitNumber: unit,
                password: password,
                firstName: firstName,
                lastName: lastName,
                username: username
            },
            headers: { 'content-type': 'application/json'}
        };

        // console.log(email, unit, password, firstName, lastName)

        axios(opt)
            .then( response => {
                console.log(response)
                // case1: registered success
                if(response.status >= 200 && response.status <= 300) {
                    message.success('Registration succeed!');
                    history.push('/login');
                }
            })
            .catch( error => {
                console.log('register failed: ', error.message);
                message.success('Registration failed!');
                // throw new Error('Signup Failed!')
            })
    };

    return (
        <div className="register">
            <Form
                {...formItemLayout}
                form={form}
                onFinish={onFinish}
                className="register"
            >
                <Form.Item
                    name="email"
                    label="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="username"
                    label="User name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your first name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your last name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="unit"
                    label="Unit Number"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Unit Number!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" className="register-btn">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Register;