import React, {useEffect, useState} from "react";

import {Tabs, message, Spin} from 'antd';
import BookingList from "./BookingList";
import axios from "axios";

const { TabPane } = Tabs;

function AdminBooking(props) {
    const [activeTab, setActiveTab] = useState("all-booking");
    const [bookingList, setBookingList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pendingList, setPendingList] = useState([]);

    useEffect(() => {
        fetchBookingList();
    }, []);

    useEffect(() => {
        let newList = bookingList.filter(item => item.status == 'pending');
        setPendingList(newList);
        console.log('pending list -> ', pendingList);
    }, [bookingList])

    const refresh = () => {
        setTimeout(() => {
            fetchBookingList();
        }, 1000)
    }


    const fetchBookingList = () => {
        const opt = {
            method: "GET",
            url: '/all-bookings',
            headers: { 'content-type': 'application/json'}
        };

        setIsLoading(true);

        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setBookingList(res.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                message.error("Fetch bookings failed!");
                console.log("fetch bookings failed: ", err.message);
                setIsLoading(false);
            });
    }

    return (
        <div>
            <div className='booking-title'>
                <span>Booking system (Admin)</span>
            </div>
            <div className="tab">
                <Tabs defaultActiveKey="my-booking"
                      activeKey={activeTab}
                      onChange={key => setActiveTab(key)}
                >
                    <TabPane tab="All Bookings" key="all-booking">
                        {isLoading ?
                            <Spin tip="Loading" size="large"/>
                            :
                            <BookingList bookingList={bookingList}/>
                        }
                    </TabPane>
                    <TabPane tab="Pending Booking" key="pending-booking">
                        {isLoading ?
                            <Spin tip="Loading" size="large"/>
                            :
                            <BookingList bookingList={pendingList} isPending={true} refresh={refresh}/>
                        }
                    </TabPane>
                </Tabs>
            </ div>
        </div>
    );
}

export default AdminBooking;