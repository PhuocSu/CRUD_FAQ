import React from 'react';
import { Layout } from 'antd';

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
    return (
        <Header style={headerStyle}>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 32, width: '100%' }}>
                    <div style={{ cursor: 'pointer' }}>로그인</div>
                    <div style={{ cursor: 'pointer' }}>회원가입</div>
                </div>
            </div>
        </Header>
    );
};

export default AppHeader;
