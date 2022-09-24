import React, {useEffect, useState} from "react";
import {Avatar, List, message, Spin} from 'antd';
import user from "../assets/images/user.svg";
import axios from "axios"

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

function Dashboard(props) {

    const [announcementList, setAnnouncementList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchList();
    }, [])

    const fetchList = () => {
        const opt = {
            method: "GET",
            url: '/announcement',
            headers: { 'content-type': 'application/json'}
        };

        setIsLoading(true);

        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setAnnouncementList(res.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                message.error("Fetch posts failed!");
                console.log("fetch posts failed: ", err.message);
                setIsLoading(false);
            });
    }

    return (
        <div>
            <span className="announcement-title">Announcements</span>
            <div className='announcement'>
                {
                    isLoading
                        ?
                        <Spin tip="Loading" size="large"/>
                        :

                        <List
                            itemLayout="horizontal"
                            dataSource={announcementList}
                            renderItem={item => (
                                <List.Item className="announcement-item">
                                    <List.Item.Meta
                                        avatar={<Avatar src={user} style={{marginLeft: "30px"}}/>}
                                        title={item.title}
                                        description={item.content}
                                    />
                                    <span style={{marginRight: "30px"}}> Posted on: {formatDate(new Date(item.date))}</span>
                                </List.Item>
                            )}
                        />
                }
            </div>
        </div>
    );
}



export default Dashboard;