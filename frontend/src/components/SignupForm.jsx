import React from 'react';
import { Button, Form, Input } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
};

const SignupForm = ({ onSubmit }) => {
    const onFinish = (values) => {
        if (onSubmit) {
            onSubmit(values);
        }
    };

    return (
        <Form
            {...layout}
            name="signup-form"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            validateMessages={validateMessages}
        >
            <Form.Item
                name="displayedName"
                label="Display Name"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    { required: true },
                    { min: 6, message: 'Password must be at least 6 characters' },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="phoneNumber" label="phoneNumber">
                <Input />
            </Form.Item>

            <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SignupForm;
