import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
const onFinish = values => {
    console.log(values);
};

const SignupForm = () => {
    return (
        <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            validateMessages={validateMessages}
        >
            <Form.Item name={['user', 'displayName']} label="displayName" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'username']} label="username" rules={[{ type: 'email' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                    { min: 6, message: 'Password must be at least 6 characters' }
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item name={['user', 'phone']} label="Phone">
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'email']} label="Email">
                <Input />
            </Form.Item>
            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SignupForm