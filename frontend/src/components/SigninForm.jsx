import React from 'react'
import { Form, Input, Button } from 'antd'

const SigninForm = ({ onSubmit }) => {
    const [form] = Form.useForm()

    const handleFinish = (values) => {
        if (onSubmit) {
            onSubmit(values)
        }
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
        >
            <Form.Item
                label="Tên đăng nhập"
                name="username"  // 👈 đổi từ email sang username
                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            >
                <Input placeholder="Nhập tên đăng nhập của bạn" />
            </Form.Item>

            <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
                <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SigninForm

