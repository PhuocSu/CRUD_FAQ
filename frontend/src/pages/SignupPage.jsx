import React from 'react';
import { Layout } from 'antd';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import SignupForm from '../components/SignupForm';

const { Content } = Layout;

const contentStyle = {
    width: '100%',
    minHeight: 'calc(100vh - 128px)', // trừ chiều cao header + footer
    padding: '24px',
    backgroundColor: '#f5f5f5',
    color: '#333',
    margin: 0,

    // ✅ căn giữa form
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const SignupPage = () => {
    return (
        <Layout
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f5f5f5',
            }}
        >
            <AppHeader />

            <Content style={contentStyle}>
                <div
                    style={{
                        backgroundColor: '#fff',
                        padding: '40px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        width: '100%',
                        maxWidth: '450px', // ✅ giới hạn form vừa phải
                    }}
                >
                    <SignupForm />
                </div>
            </Content>

            <AppFooter />
        </Layout>
    );
};

export default SignupPage;
