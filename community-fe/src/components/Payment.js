import React, {useEffect, useState} from "react";
import { CreditCardOutlined, CalendarOutlined, NumberOutlined } from '@ant-design/icons';
import { Form, Button, Input, message } from 'antd';
import axios from "axios";

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

function Payment() {
    const [balance, setBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchBalance();
    }, [balance]);

    const fetchBalance = () => {
        const opt = {
            method: "GET",
            url: '/balance',
            headers: { 'content-type': 'application/json'}
        };

        axios(opt)
            .then(response => {
                if (response.status === 200) {
                    setBalance(response.data);
                    console.log(response.data);
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    const onFinish = (values) => {
        const { cardnumber, expirationdate, cvv, nameOnCard, amount } = values;

        let time = new Date().toISOString().slice(0, 10);

        const opt = {
            method: 'POST',
            url: `/payment`,
            data: {
                cardNumber: cardnumber,
                expireDate: expirationdate,
                cvv: cvv,
                nameOncard: nameOnCard,
                amount: amount,
                time: time
            },
            headers: { 'content-type': 'application/json'}
        };

        setIsLoading(true);

        axios(opt)
            .then(response => {
                console.log(response);
                if (response.status >= 200 && response.status <= 300) {
                    message.success("Successfully pay!");
                    let newBalance = balance - amount;
                    setBalance(newBalance);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                message.error("Payment failed!");
                console.log(error);
                setIsLoading(false);
            })
    }

    return (
        <div className="payment-form-class">
            <Form name="payment-form" onFinish = {onFinish} {...formItemLayout}>
                <h2 align="left">Payment System</h2>
                <div align="left"> Your account balance is ${balance} </div>
                <br />
                <Form.Item
                    name="cardnumber"
                    label = "Card Number"
                    rules={[
                        {
                            required: true,
                            message: "Please input your card number!"
                        }
                    ]}
                >
                    <Input
                        prefix={<CreditCardOutlined className="site-form-item-icon" />}
                        placeholder="0000 0000 0000 0000"
                    />
                </Form.Item>
                <Form.Item
                    name="expirationdate"
                    label = "Expiration Date"
                    rules={[
                        {
                            required: true,
                            message: "Please input your card expriation date!"
                        }
                    ]}
                  >
                  <Input
                    prefix={<CalendarOutlined className="site-form-item-icon" />}
                    placeholder="MM/YYYY"
                  />


                </Form.Item>

                <Form.Item
                    name="cvv"
                    label = "CVV"
                    rules={[
                        {
                            required: true,
                            message: "Please input your CVV!"
                        }
                    ]}
                >
                    <Input
                        prefix={<NumberOutlined className="site-form-item-icon" />}
                        placeholder="000"
                    />
                </Form.Item>

                <Form.Item
                    name="nameOnCard"
                    label = "Name on Card"
                    rules={[
                        {
                            required: true,
                            message: "Please input your name on card!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="amount"
                    label = "Payment Amount"
                    rules={[
                        {
                            required: true,
                            message: "Please input the payment amount!"
                        }
                    ]}
                >
                    <Input prefix={<NumberOutlined className="site-form-item-icon" />}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="payment-form-button" loading={isLoading}>
                        Pay
                    </Button>
                </Form.Item>
            </Form>
        </div>
      );
}

export default Payment;