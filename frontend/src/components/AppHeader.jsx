import React from 'react';
import { Layout } from 'antd';
import UseAuthStore from '../stores/UseAuthStore';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const headerStyle = {
    width: '100%',
    color: '#fff',
    height: 'auto',
    padding: '0 24px',
    backgroundColor: '#4096ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
};

const AppHeader = () => {
    const { user, signout } = UseAuthStore();
    const navigate = useNavigate();

    const handleSignout = async () => {
        try {
            await signout();
            navigate('/signin');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    return (
        <Header style={headerStyle}>
            <div style={{ flex: 1 }}>
                {user ? (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 32, width: '100%' }}>
                        <div
                            style={{ cursor: 'pointer' }}
                            onClick={handleSignout}
                        >로그아웃</div>
                        <div
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/myPage')}
                        >마이페이지</div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 32, width: '100%' }}>
                        <div
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/signin')}
                        >로그인</div>
                        <div
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/signup')}
                        >회원가입</div>
                    </div>
                )}
            </div>
        </Header>
    );
};

export default AppHeader;
