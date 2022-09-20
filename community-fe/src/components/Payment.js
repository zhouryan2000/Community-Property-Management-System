import React from "react";
import { CreditCardOutlined, CalendarOutlined, NumberOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

const Payment =()=>(
    <>
        <h2 align="left">Payment</h2>
        <div align="left"> Your payment for this month is $3890 </div>
        <Input placeholder="Card Number" prefix={<CreditCardOutlined />} />
        <br />
        <br />
        <Input placeholder="Expiration Dates" prefix={<CalendarOutlined />} />
        <br />
        <br />
        <Input placeholder="CVV Number" prefix={<NumberOutlined />} />
        <br />
        <br />
        <Button type="primary" htmlType="submit"> Submit </Button>
    </>
)

export default Payment;