import React, {useEffect, useState} from "react";

import {Tabs, message, Spin} from 'antd';
import BookingCreater from "./BookingCreater";
import BookingList from "./BookingList";
import axios from "axios"

const { TabPane } = Tabs;

function Booking(props) {
    const [activeTab, setActiveTab] = useState("my-booking");
    const [bookingList, setBookingList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchBookingList();
    }, [activeTab])

    const fetchBookingList = () => {
        const opt = {
            method: "GET",
            url: '/booking',
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
                <span>Booking system</span>
            </div>
            <div className="tab">
                <Tabs defaultActiveKey="my-booking"
                      activeKey={activeTab}
                      onChange={key => setActiveTab(key)}
                >
                    <TabPane tab="My Bookings" key="my-booking">
                        {isLoading ?
                            <Spin tip="Loading" size="large"/>
                            :
                            <BookingList bookingList={bookingList}/>
                        }
                    </TabPane>
                    <TabPane tab="New Booking" key="new-booking">
                        <BookingCreater />
                    </TabPane>
                </Tabs>
            </ div>
        </div>
    );
}

export default Booking;