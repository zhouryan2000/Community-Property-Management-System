import React, {useState} from "react";

import {Col, Row, Tabs} from 'antd';
import BookingCreater from "./BookingCreater";
import BookingList from "./BookingList";

const { TabPane } = Tabs;

function Booking(props) {
    const [activeTab, setActiveTab] = useState("my-booking");
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
                        <BookingList />
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