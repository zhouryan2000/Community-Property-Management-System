import React from "react";

import moment from 'moment';
import {DatePicker, TimePicker, Select, Button, Form, message} from 'antd';
import axios from "axios"

const { Option } = Select;

const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time!',
        },
    ],
};

const rangeConfig = {
    rules: [
        {
            type: 'array',
            required: true,
            message: 'Please select time!',
        },
    ],
};

function BookingCreater(props) {

    const addBooking = (values) => {
        let type = values["service-picker"];
        let day = values["date-picker"];
        let startTime = values["time-picker"][0];
        let endTime = values["time-picker"][1];
        let requestDate = new Date().toISOString().slice(0, 10);

        // console.log(type, day, startTime, endTime, requestDate);
        const opt = {
            method: 'POST',
            url: `/booking`,
            data: {
                type: type,
                day: day,
                startTime: startTime,
                endTime: endTime,
                requestDate: requestDate
            },
            headers: { 'content-type': 'application/json'}
        };

        axios(opt)
            .then(response => {
                console.log(response);
                if (response.status >= 200 && response.status <= 300) {
                    message.success("Add booking successfully!");
                }
            })
            .catch(error => {
                message.error("Add booking failed!");
                console.log(error);
            })
    }

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().startOf('day');
    };

    const onFinish = (fieldsValue) => {
        // Should format date value before submit.
        const rangeTimeValue = fieldsValue['time-picker'];
        const values = {
            ...fieldsValue,
            'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
            'time-picker': [
                rangeTimeValue[0].format('HH:mm'),
                rangeTimeValue[1].format('HH:mm'),
            ],
        };
        console.log('Received values of form: ', values);
        addBooking(values);
    };
    return (
        <Form name="time_related_controls"  onFinish={onFinish} layout='inline'>
            <Form.Item name="service-picker" label="service" rules={[
                {
                    required: true,
                    message: 'Please select service!',
                },
            ]}>
                <Select placeholder="select service">
                    <Option value="elevator service">Elevator Service</Option>
                    <Option value="common room">Common Room</Option>
                    <Option value="garbage clean">Garage Clean</Option>
                </Select>
            </Form.Item>
            <Form.Item name="date-picker" label="date" {...config}>
                <DatePicker disabledDate={disabledDate}/>
            </Form.Item>
            <Form.Item name="time-picker" label="time" {...rangeConfig}>
                <TimePicker.RangePicker format="HH:mm" minuteStep={15}/>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 16,
                        offset: 8,
                    },
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default BookingCreater;