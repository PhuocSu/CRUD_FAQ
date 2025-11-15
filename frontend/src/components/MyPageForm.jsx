import { Form, Input, Button } from 'antd';
import React, { useEffect } from 'react';

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

const MyPageForm = ({ onSubmit, userInfo }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (userInfo) {
            form.resetFields();
            // Set all fields but force password to be empty
            form.setFieldsValue({
                ...userInfo,
                password: ''
            });
        }
    }, [userInfo]);

    const onFinish = (values) => {
        if (onSubmit) onSubmit(values);
    };

    return (
        <Form
            {...layout}
            name="myPage-form"
            form={form}
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
                <Input disabled />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    { min: 6, message: 'Password must be at least 6 characters' },
                ]}
            >
                <Input.Password placeholder="Leave empty if no change" autoComplete="new-password" />
            </Form.Item>

            <Form.Item name="phoneNumber" label="phoneNumber">
                <Input />
            </Form.Item>

            <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form.Item>
        </Form>
    );
};

export default MyPageForm;
