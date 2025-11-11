import React from 'react'
import { Layout, message } from 'antd'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import SigninForm from '../components/SigninForm'
import { useNavigate } from 'react-router-dom'
import UseAuthStore from '../stores/UseAuthStore'

const { Content } = Layout

const SigninPage = () => {
    const navigate = useNavigate()
    const { signin } = UseAuthStore()

    // 🧠 Xử lý khi form submit
    const handleSignIn = async (values) => {
        try {
            const res = await signin(values.username, values.password)
            console.log('Login response:', res)

            message.success('Đăng nhập thành công!')
            navigate('/')
        } catch (error) {
            console.error('Login error:', error)
            message.error('Sai tên đăng nhập hoặc mật khẩu!')
        }
    }


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
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
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
                        maxWidth: '400px',
                    }}
                >
                    {/* 👇 Truyền hàm vào form */}
                    <SigninForm onSubmit={handleSignIn} />
                </div>
            </Content>

            <AppFooter />
        </Layout>
    )
}

export default SigninPage

