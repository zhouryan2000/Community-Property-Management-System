import React from "react";
import { CreditCardOutlined, CalendarOutlined, NumberOutlined } from '@ant-design/icons';
import { Form, Button, Input, message } from 'antd';

function Payment() {
  const onFinish = (values) => {
    const { cardnumber, expirationdate, cvv } = values;

    if ( cardnumber !== '' && expirationdate !=='' && cvv !== '' ) {
      message.success ("Rent successfully paid!");
    }
  }



  return (
    <div className="payment-form-class">
        <Form name="payment-form" onFinish = {onFinish}>
            <h2 align="left">Payment</h2>
            <div align="left"> Your payment for this month is $3890 </div>
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
                    type="password"
                    placeholder="000"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="payment-form-button">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
  );
}

export default Payment;