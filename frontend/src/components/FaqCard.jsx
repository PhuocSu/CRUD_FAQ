import React from 'react'
import { Button, Col, Row, Typography } from 'antd'
import dropdownIcon from '@/assets/dropdown-arrow-svgrepo-com.svg';

const FaqCard = ({ faq }) => {
  return (
    <div style={{
      width: '100%',
      padding: '16px 0',
      borderBottom: '1px solid #E0E0E3',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px'
    }}>

      <Row style={{ 
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        height: '100%'
      }}>
        <Col 
          span={12}
          style={{
            color: '#1A1A1A',
            fontSize: '16px',
            fontWeight: '500',
            lineHeight: '24px',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            padding: '8px 0'
          }}
        >
          {faq?.title}
        </Col>
        <Col 
          span={12} 
          style={{
            color: '#666666',
            fontSize: '14px',
            lineHeight: '20px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: '100%',
            padding: '8px 0'
          }}
        >
          {faq?.questionTopic}
        </Col>
      </Row>
      
      <div style={{
        display: 'flex',
        gap: '8px',
        marginRight: '16px'
      }}>
        <Button 
          type="text"
          style={{
            color: '#666666',
            border: '1px solid #CECED3',
            fontSize: '13px',
            height: '32px',
            padding: '0 12px'
          }}
        >
          수정
        </Button>
        <Button 
          type="text"
          style={{
            color: '#666666',
            border: '1px solid #CECED3',
            fontSize: '13px',
            height: '32px',
            padding: '0 12px'
          }}
        >
          삭제
        </Button>
      </div>
      
      <div style={{
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}>
        <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L6 5L11 1" stroke="#666666" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
};

export default FaqCard