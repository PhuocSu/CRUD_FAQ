import React from 'react'
import FaqDetailsForm from '../components/FaqDetailsForm'
import ActionButtons from '../components/ActionButtons'
import { Layout } from 'antd'


const { Header, Footer, Sider, Content } = Layout;

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

const contentStyle = {
  width: '100%',
  minHeight: 'calc(100vh - 128px)',
  padding: '24px',
  backgroundColor: '#f5f5f5',
  color: '#333',
  margin: 0,
};

const footerStyle = {
  width: '100%',
  textAlign: 'center',
  padding: '16px 0',
  color: '#fff',
  backgroundColor: '#4096ff',
};

const layoutStyle = {
  minHeight: '100vh',
  width: '100vw',
  margin: 0,
  padding: 0,
};

const FaqWrite = () => {
  return (
    <div style={{ width: '100%', margin: 0, padding: 0 }}>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <div style={{ flex: 1 }}>
            {/* CHưa dùng đến */}
          </div>
        </Header>


        <Content style={contentStyle}>
          <div>
            <FaqDetailsForm />
          </div>
        </Content>


        <Footer style={footerStyle}>
          ©2025 FAQ Application
        </Footer>
      </Layout>
    </div>
  )
}

export default FaqWrite