import React, { useState, useEffect } from 'react'
import { Layout, message, Spin } from 'antd'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import MyPageForm from '../components/MyPageForm'
import { useNavigate } from 'react-router-dom'
import UseAuthStore from '../stores/UseAuthStore'
import AuthService from '../services/AuthService'

const { Content } = Layout

const MyPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, updateProfile } = UseAuthStore();
    const navigate = useNavigate();

    const fetchUserInfo = async () => {
        try {
            setLoading(true);
            const user = await AuthService.fetchMe();
            const userInfoWithEmptyPassword = {
                displayedName: user.displayedName || "",
                username: user.username || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                password: ""   // ✔ luôn có trường password
            };

            setUserInfo(userInfoWithEmptyPassword);
            console.log('User info from backend:', user);
        } catch (error) {
            console.error('Error fetching user info:', error);
            message.error('Không thể tải thông tin người dùng');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (values) => {
        try {
            // Chỉ gửi password nếu không rỗng
            const passwordToSend = values.password && values.password.trim() !== '' ? values.password : null;

            await updateProfile(
                values.displayedName,
                passwordToSend,
                values.email,
                values.phoneNumber
            );
            message.success('Cập nhật thông tin thành công!');
            // Refresh lại thông tin sau khi cập nhật
            fetchUserInfo();
        } catch (error) {
            console.error('Error updating profile:', error);
            message.error(error.response?.data?.message || 'Không thể cập nhật thông tin');
        }
    };

    useEffect(() => {
        if (user) {
            fetchUserInfo();
        } else {
            navigate('/signin');
        }
    }, [user, navigate]);

    if (loading) {
        return (
            <Layout style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spin size="large" />
            </Layout>
        );
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
                    <MyPageForm userInfo={userInfo} onSubmit={handleUpdateProfile} />
                </div>
            </Content>

            <AppFooter />
        </Layout>
    )
}

export default MyPage