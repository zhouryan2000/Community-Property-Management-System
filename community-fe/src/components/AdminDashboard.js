import React, {useEffect, useState} from "react";
import {Avatar, Button, List, message, Spin} from 'antd';
import axios from "axios";
import NewAnnouncementButton from "./NewAnnouncementButton";
import admin from '../assets/images/admin.svg';

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

function AdminDashboard(props) {

    const [announcementList, setAnnouncementList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let deleteAnnouncement = null;

    useEffect(() => {
        fetchList();
    }, [])

    useEffect(() => {
        console.log("hi")
    }, [announcementList])

    const refresh = () => {
        fetchList();
    }

    const handleDelete = () => {
        console.log(deleteAnnouncement.id);

        const opt = {
            method: "DELETE",
            url: `announcement/${deleteAnnouncement.id}`,
            headers: { 'content-type': 'application/json'}
        }

        let newList = announcementList.filter(item => item.id !== deleteAnnouncement.id);
        setAnnouncementList(newList);

        axios(opt)
            .then(response => {
                if (response.status === 200) {
                    message.success("Delete announcement successfully")
                    deleteAnnouncement = null;
                }
            })
            .catch(err => {
                console.log("delete announcement failed ", err);
            })
    }

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
            <span className="announcement-title">Announcements (Admin) </span>
            <div className="announcement-button">
                <NewAnnouncementButton refresh={refresh}/>
            </div>
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
                                <List.Item className="announcement-item" actions={[<Button style={{marginLeft: "50px"}} onClick={() => {
                                    deleteAnnouncement = item;
                                    handleDelete();
                                }}>Delete</Button>]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={admin} style={{marginLeft: "30px"}}/>}
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

export default AdminDashboard;