import React from 'react';
import {Avatar, List, Skeleton} from "antd"
import elevator from '../assets/images/elevator.svg';
import garbage from '../assets/images/garbage.svg';
import room from '../assets/images/room.svg';

function BookingList(props) {
    const bookingList = [
        {
            service: 'elevator service',
            status: 'pending',
        },
        {
            service: 'common room',
            status: 'approved',
        },
        {
            service: 'garbage clean',
            status: 'rejected',
        },
        {
            service: 'elevator service',
            status: 'pending',
        },
        {
            service: 'common room',
            status: 'approved',
        },
        {
            service: 'garbage clean',
            status: 'rejected',
        },
        {
            service: 'elevator service',
            status: 'pending',
        },
        {
            service: 'common room',
            status: 'approved',
        },
        {
            service: 'garbage clean',
            status: 'rejected',
        }
    ]

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
                    <Avatar style={{margin: "20 60 20 20"}} shape="square" src={getImage(item.service)} />
                    <span style={{fontSize: "large", color: "skyblue"}}>{item.service}</span>
                    <span>Status: {item.status}</span>
                    <span>Date: </span>
                    <span>Time: </span>
                    <span>Requested on: {"2022-9-17"}</span>
                </List.Item>

            )
            }
        />
    );
}

export default BookingList;