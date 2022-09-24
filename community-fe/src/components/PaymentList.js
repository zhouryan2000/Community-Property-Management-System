import React from 'react';
import {List} from "antd";

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

const formatDate = (date) => {
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-'));
}

function PaymentList(props) {
    const { paymentList } = props;

    return (
        <div>
            <List
                className="booking-list"
                itemLayout="horizontal"
                dataSource={paymentList}
                size="small"
                renderItem = {(item) => (
                    <List.Item style={{height: "70px"}}>
                        <span style={{fontSize: "large", color: "skyblue"}}>Payment</span>
                        <span>Amount: {item.amount}</span>
                        <span>Name On Card: {item.nameOncard} </span>
                        <span>Card Number: {item.cardNumber}</span>
                        <span>Date: {formatDate(new Date(item.time))}</span>
                    </List.Item>

                )
                }
            />
        </div>
    );
}

export default PaymentList;