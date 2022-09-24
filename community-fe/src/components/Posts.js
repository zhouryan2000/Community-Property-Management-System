import React, {useEffect, useState} from "react";
import {Avatar, Button, List, message, Spin, Tabs} from "antd";
import PostLists from "./PostLists";
import axios from "axios";
import uploadPostButton from "./UploadPostButton";
import UploadPostButton from "./UploadPostButton"

const { TabPane } = Tabs;

function Posts(props) {
    const [activeTab, setActiveTab] = useState("all-posts");
    const [postList, setPostList] = useState([]);
    const [myPostList, setMyPostList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchPostList();
        fetchMyPostList();
    }, [])

    const fetchPostList = () => {
        const opt = {
            method: "GET",
            url: '/all-post',
            headers: { 'content-type': 'application/json'}
        };

        setIsLoading(true);

        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setPostList(res.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                message.error("Fetch posts failed!");
                console.log("fetch posts failed: ", err.message);
                setIsLoading(false);
            });
    }

    const fetchMyPostList = () => {
        const opt = {
            method: "GET",
            url: '/post',
            headers: { 'content-type': 'application/json'}
        };

        setIsLoading(true);

        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setMyPostList(res.data);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                message.error("Fetch my posts failed!");
                console.log("fetch my posts failed: ", err.message);
                setIsLoading(false);
            });
    }

    const refresh = () => {
        setTimeout(() => {
            fetchPostList();
            fetchMyPostList();
        }, 1000)
    }

    const operations = <UploadPostButton refresh={refresh}/>

    return (
        <div>
            <div className='booking-title'>
                <span>Posts</span>
            </div>
            <div className="tab">
                <Tabs defaultActiveKey="all-posts"
                      activeKey={activeTab}
                      onChange={key => setActiveTab(key)}
                      tabBarExtraContent={operations}
                >
                    <TabPane tab="All Posts" key="all-posts">
                        {isLoading ?
                            <Spin tip="Loading" size="large"/>
                            :
                            <PostLists postList={postList} isAll={true} refresh={refresh}/>
                        }
                    </TabPane>
                    <TabPane tab="My Posts" key="my-posts">
                        {isLoading ?
                            <Spin tip="Loading" size="large"/>
                            :
                            <PostLists postList={myPostList} isAll={false} refresh={refresh}/>
                        }
                    </TabPane>
                </Tabs>
            </ div>
        </div>
    )
}

export default Posts;