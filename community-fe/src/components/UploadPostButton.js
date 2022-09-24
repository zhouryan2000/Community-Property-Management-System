import React, {useState} from 'react';
import {Button, Form, Input, message, Modal} from "antd"
import TextArea from "antd/es/input/TextArea"
import axios from "axios"

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

function UploadPostButton(props) {
    const { refresh } = props;
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        const { title, content } = form.getFieldsValue();
        setConfirmLoading(true);

        const opt = {
            method: "POST",
            url: `/post`,
            data: {
                title: title,
                content: content,
                date: new Date()
            },
            headers: { 'content-type': 'application/json'}
        };

        console.log(opt['data']);

        axios(opt)
            .then(response => {
                if (response.status >= 200 && response.status <= 300) {
                    message.success("Create new post successfully")
                    refresh();
                    setVisible(false);
                    form.resetFields();
                    setConfirmLoading(false);
                }
            })
            .catch(error => {
                message.error("Create new post failed");
                console.log(error);
                setVisible(false);
                form.resetFields();
                setConfirmLoading(false);
            })


    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setVisible(false);
        form.resetFields();
    };

    return (
        <div>
            <Button type="primary"
                    onClick={showModal}
            >
                Create New Post
            </Button>
            <Modal
                title="Create New Post"
                visible={visible}
                onOk={handleOk}
                okText="Create"
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form
                    className="post"
                    form={form}
                    {...formItemLayout}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the Title',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        label="Content"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the content',
                            },
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default UploadPostButton;