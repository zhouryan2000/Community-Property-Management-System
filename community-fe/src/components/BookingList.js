import React, {useState} from 'react';
import {Avatar, Button, List, message} from "antd"
import elevator from '../assets/images/elevator.svg';
import garbage from '../assets/images/garbage.svg';
import room from '../assets/images/room.svg';
import axios from "axios";

function BookingList(props) {
    const { bookingList, refresh } = props;
    const isPending = props.isPending === true;
    let pendingBooking = null;

    const handleApprove = () => {
        console.log(pendingBooking );

        const opt = {
            method: "PUT",
            url: `/approve/${pendingBooking.id}`,
            headers: { 'content-type': 'application/json'}
        };

        axios(opt)
            .then(response => {
                if (response.status === 200) {
                    refresh();
                    message.success("approve successfully");
                    pendingBooking = null;
                }
            })
            .catch(error => {
                console.log(error);
                pendingBooking = null;
            })
    }

    const handleReject = () => {
        console.log(pendingBooking);

        const opt = {
            method: "PUT",
            url: `/reject/${pendingBooking.id}`,
            headers: { 'content-type': 'application/json'}
        };

        axios(opt)
            .then(response => {
                if (response.status === 200) {
                    refresh();
                    message.success("reject successfully");
                    pendingBooking = null;
                }
            })
            .catch(error => {
                console.log(error);
                pendingBooking = null;
            })
    }

    const getImage = (service) => {
        if (service === 'elevator service') {
            return elevator;
        }
        if (service === 'garbage clean') {
            return garbage;
        }
        return room;
    }

    return (
        isPending
            ?
            <List
                className="booking-list"
                itemLayout="horizontal"
                dataSource={bookingList}
                size="small"
                renderItem = {(item) => (
                    <List.Item
                        style={{height: "70px"}}
                        actions={[
                            <Button style={{marginLeft: "30px"}} onClick={() => {
                                pendingBooking = item;
                                handleApprove();
                            }}>Approve</Button>,
                            <Button style={{marginLeft: "10px"}} onClick={() => {
                                pendingBooking = item;
                                handleReject();
                            }}>Reject</Button>
                        ]}>
                        <Avatar style={{margin: "20 60 20 20"}} shape="square" src={getImage(item.type)} />
                        <span style={{fontSize: "large", color: "skyblue"}}>{item.type}</span>
                        <span>Date: {item.day} </span>
                        <span>Time:{item.startTime} - {item.endTime}</span>
                        <span>Requested on: {item.requestDate}</span>
                    </List.Item>

                )
                }
            />
            :
            <List
                className="booking-list"
                itemLayout="horizontal"
                dataSource={bookingList}
                size="small"
                renderItem = {(item) => (
                    <List.Item style={{height: "70px"}}>
                        <Avatar style={{margin: "20 60 20 20"}} shape="square" src={getImage(item.type)} />
                        <span style={{fontSize: "large", color: "skyblue"}}>{item.type}</span>
                        <span>Status: {item.status}</span>
                        <span>Date: {item.day} </span>
                        <span>Time:{item.startTime} - {item.endTime}</span>
                        <span>Requested on: {item.requestDate}</span>
                    </List.Item>

                )
                }
            />
    );
}

export default BookingList;