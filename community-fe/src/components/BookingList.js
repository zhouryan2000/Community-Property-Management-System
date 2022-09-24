import React, {useState} from 'react';
import {Avatar, List, Skeleton} from "antd"
import elevator from '../assets/images/elevator.svg';
import garbage from '../assets/images/garbage.svg';
import room from '../assets/images/room.svg';

function BookingList(props) {
    const { bookingList } = props;

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