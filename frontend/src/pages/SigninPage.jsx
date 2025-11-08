import React from 'react'
import { Layout } from 'antd'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import SigninForm from '../components/SigninForm'

const { Content } = Layout

const SigninPage = () => {
    return (
        <Layout
            style={{
                minHeight: '100vh', // ✅ full màn hình
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f5f5f5',
            }}
        >
            <AppHeader />

            <Content
                style={{
                    flex: 1, // ✅ chiếm toàn bộ không gian trống
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'linear-gradient(to right, #e0eafc, #cfdef3)', // optional: nền nhẹ
                    padding: '20px',
                }}
            >
                <div
                    style={{
                        backgroundColor: '#fff',
                        padding: '40px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        width: '100%',
                        maxWidth: '400px', // ✅ giới hạn form gọn đẹp
                    }}
                >
                    <SigninForm />
                </div>
            </Content>

            <AppFooter />
        </Layout>
    )
}

export default SigninPage
