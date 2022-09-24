import React, {useEffect, useState} from 'react';
import {Avatar, Button, List, message} from "antd";
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

function PostLists(props) {
    let { isAll, list, refresh } = props;
    let deletePost = null;
    const postList = list;


    const handleDelete = () => {
        console.log(deletePost);

        const opt = {
            method: "DELETE",
            url: `/post/${deletePost.id}`,
            headers: { 'content-type': 'application/json'}
        };

        axios(opt)
            .then(response => {
                if (response.status === 200) {
                    message.success("Delete post successfully");
                    refresh();
                    deletePost = null;
                }
            })
            .catch(error => {
                console.log(error);
                deletePost = null;
            })

    }

    return (
        <List
            itemLayout="horizontal"
            dataSource={postList}
            renderItem={item => (
                    isAll
                    ?
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={user} />}
                            title={item.title}
                            description={item.content}
                        />
                        <span> Posted on: {formatDate(new Date(item.date))}</span>
                    </List.Item>
                    :
                    <List.Item
                        actions={[<Button style={{marginLeft: "50px"}} onClick={() => {
                            deletePost = item;
                            handleDelete();
                        }}>Delete</Button>]}>
                        <List.Item.Meta
                            avatar={<Avatar src={user} />}
                            title={item.title}
                            description={item.content}
                        />
                        <span> Posted on: {formatDate(new Date(item.date))}</span>
                    </List.Item>

            )}
        />
    );
}

export default PostLists;