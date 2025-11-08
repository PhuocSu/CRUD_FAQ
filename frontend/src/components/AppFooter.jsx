import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const footerStyle = {
  width: '100%',
  textAlign: 'center',
  padding: '16px 0',
  color: '#fff',
  backgroundColor: '#4096ff',
};

const AppFooter = () => {
  return (
    <Footer style={footerStyle}>
      ©2025 FAQ Application
    </Footer>
  );
};

export default AppFooter;
