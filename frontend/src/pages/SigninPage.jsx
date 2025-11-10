import React from 'react'
import { Layout, message } from 'antd'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import SigninForm from '../components/SigninForm'
import AuthService from '../services/AuthService'
import { useNavigate } from 'react-router-dom' // 👈 để chuyển trang
import UseAuthStore from '../stores/UseAuthStore'

const { Content } = Layout

const SigninPage = () => {
    const navigate = useNavigate()

    // 🧠 Xử lý khi form submit
    const handleSignIn = async (values) => {
        try {
            const res = await AuthService.signin(values.username, values.password)
            console.log('Login response:', res)

            if (res.accessToken) {
                // 1️⃣ Lưu token vào store
                UseAuthStore.getState().setAccessToken(res.accessToken)

                // 2️⃣ Lấy thông tin user từ backend và lưu vào store
                await UseAuthStore.getState().fetchMe()

                // 3️⃣ Lưu token vào localStorage (tùy muốn)
                localStorage.setItem('token', res.accessToken)

                message.success('Đăng nhập thành công!')
                navigate('/')
            } else {
                message.error('Không tìm thấy token trong phản hồi!')
            }
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

