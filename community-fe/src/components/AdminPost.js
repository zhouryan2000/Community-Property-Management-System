import React, {useEffect, useState} from "react";
import {message, Spin, Tabs} from "antd";
import PostLists from "./PostLists";
import axios from "axios";

const { TabPane } = Tabs;

function AdminPost(props) {
    const [activeTab, setActiveTab] = useState("all-posts");
    const [postList, setPostList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchPostList();
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

    const refresh = () => {
        setTimeout(() => {
            fetchPostList();
        }, 1000)
    }

    return (
        <div>
            <div className='booking-title'>
                <span>Posts (Admin)</span>
            </div>
            <div className="tab">
                <Tabs defaultActiveKey="all-posts"
                      activeKey={activeTab}
                      onChange={key => setActiveTab(key)}
                >
                    <TabPane tab="All Posts" key="all-posts">
                        {isLoading ?
                            <Spin tip="Loading" size="large"/>
                            :
                            <PostLists postList={postList} isAll={false} refresh={refresh}/>
                        }
                    </TabPane>
                </Tabs>
            </ div>
        </div>
    )
}

export default AdminPost;