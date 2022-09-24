import React, {useEffect} from 'react';
import {Button, Form, Input, message, Spin, Tabs} from "antd";
import {useState} from "react";
import PaymentList from "./PaymentList";
import axios from "axios";

const { TabPane } = Tabs;

function AdminPayment(props) {
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState("all-payments");
    const [paymentList, setPayment] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        fetchPaymentList();
    }, [])

    const onFinish = (fieldsValue) => {
        const { amount } = fieldsValue;
        console.log(amount);

        const opt = {
            method: "PUT",
            url: `add_all_balance/${amount}`,
            headers: { 'content-type': 'application/json'}
        };

        setButtonLoading(true);

        axios(opt)
            .then(response => {
                if (response.status === 200) {
                    message.success("Add balance successfully");
                    setButtonLoading(false);
                }
            })
            .catch(error => {
                console.log(error);
                setButtonLoading(false);
            })
    }

    const fetchPaymentList = () => {
        form.resetFields();
        const opt = {
            method: "GET",
            url: '/payment',
            headers: { 'content-type': 'application/json'}
        };

        setIsLoading(true);

        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setPayment(res.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                message.error("Fetch payments failed!");
                console.log("fetch payments failed: ", err.message);
                setIsLoading(false);
            });
    }

    return (
        <div>
            <div className='booking-title'>
                <span>Payment system (Admin)</span>
            </div>
            <Form form={form} name="add-balance"  onFinish={onFinish} layout='inline' style={{marginLeft: "40px"}}>
                <Form.Item name="amount" label="Please input the amount added to all residents" rules={[
                    {
                        message: 'Please input the amount!',
                    },
                ]}>
                   <Input/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        xs: {
                            span: 24,
                            offset: 0,
                        },
                        sm: {
                            span: 16,
                            offset: 8,
                        },
                    }}
                >
                    <Button type="primary" htmlType="submit" loading={buttonLoading}>
                        Add
                    </Button>
                </Form.Item>
            </Form>
            <div className="tab">
                <Tabs defaultActiveKey="all-payments"
                      activeKey={activeTab}
                      onChange={key => setActiveTab(key)}
                >
                    <TabPane tab="All Payments" key="all-payments">
                        {isLoading ?
                            <Spin tip="Loading" size="large"/>
                            :
                            <PaymentList paymentList={paymentList}/>
                        }
                    </TabPane>
                </Tabs>
            </ div>
        </div>
    );
}

export default AdminPayment;