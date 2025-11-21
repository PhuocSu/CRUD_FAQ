import React, { useState } from 'react'
import { Button, Col, message, Modal, Row, Typography } from 'antd'
import { useNavigate } from 'react-router-dom';
import faqService from '../services/FaqService.js';
import axios from 'axios';
import UseAuthStore from '../stores/UseAuthStore'

const FaqCard = ({ faq, onDelete }) => {
  // console.log('4. FaqCard - onDelete prop:', typeof onDelete, onDelete);

  // const role = UseAuthStore(state => state.role);
  const { user } = UseAuthStore();
  const isAdmin = user?.role === 'admin';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate()


  // Khi nhấn "수정"
  const handleEdit = () => {
    navigate('/write', { state: { faqData: faq } })
  }

  //Khi nhấn "임시저장"
  const handleTemporaryEdit = () => {
    navigate('/write', { state: { faqData: faq, isTemporaryMode: true } })
  }

  //Khi nhấn "삭제"
  const handleDelete = (id) => {
    Modal.confirm({
      title: '알림',
      content: '게시물을 삭제하시겠습니까?',
      okText: '확인',
      cancelText: '취소',
      okType: 'danger',
      onOk: async () => {
        // console.log("Confirm pressed for id:", id); // ✅ kiểm tra có chạy tới đây không
        if (typeof onDelete === 'function') {
          await onDelete(id); // 👈 Gọi callback từ Homepage
        } else {
          console.warn("onDelete is not a function");
        }
      }
    });
  }

  const onToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      style={{
        width: '100%',
        padding: '16px 0',
        borderBottom: '1px solid #E0E0E3',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <Row
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            height: '100%',
          }}
        >
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
              padding: '8px 0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: 8 }}>{faq?.title}</div>
              <div>
                {isAdmin && faq?.isTemporarySaved && (
                  <div style={{ width: 53, height: 16, position: 'relative', background: '#555555', borderRadius: 8, cursor: 'pointer' }}>
                    <div style={{ width: 37, height: 13, left: 8, top: 0.50, position: 'absolute', textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'white', fontSize: 10, fontFamily: 'Noto Sans KR', fontWeight: '400', lineHeight: 35, wordWrap: 'break-word' }}
                      onClick={handleTemporaryEdit} >임시저장</div>
                  </div>
                )}</div>
            </div>
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
              padding: '8px 0',
            }}
          >
            {faq?.questionTopic}
          </Col>
        </Row>
        {
          console.log("role", user?.role)
        }
        {
          isAdmin && (
            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginRight: '16px',
              }}
            >
              {
                faq?.isTemporarySaved === false && (
                  <Button
                    type="text"
                    style={{
                      color: '#666666',
                      border: '1px solid #CECED3',
                      fontSize: '13px',
                      height: '32px',
                      padding: '0 12px',
                    }}
                    onClick={handleEdit}
                  >
                    수정
                  </Button>
                )
              }
              <Button
                type="text"
                style={{
                  color: '#666666',
                  border: '1px solid #CECED3',
                  fontSize: '13px',
                  height: '32px',
                  padding: '0 12px',
                }}
                onClick={() => handleDelete(faq.id)}
              >
                삭제
              </Button>
            </div>
          )
        }


        <div
          style={{
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transform: isDropdownOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.3s',
          }}
          onClick={onToggleDropdown}
        >
          <svg
            width="12"
            height="6"
            viewBox="0 0 12 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L6 5L11 1"
              stroke="#666666"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Dropdown Content */}
      {isDropdownOpen && (
        <div
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: '#f9f9f9',
            borderTop: '1px solid #e0e0e0',
            borderBottom: '1px solid #e0e0e0',
            marginTop: '-1px',
          }}
        >
          {faq?.content && (
            <div style={{ marginBottom: '16px', whiteSpace: 'pre-line' }}>
              <Typography.Paragraph>
                <div dangerouslySetInnerHTML={{ __html: faq.content || '' }} />
              </Typography.Paragraph>
            </div>
          )}

          {faq?.attachFile && (
            <div style={{ marginTop: '16px' }}>
              {faq.attachFile.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                <div style={{ maxWidth: '100%', marginTop: '8px' }}>
                  <img
                    src={faq.attachFile}
                    alt="Attachment"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      borderRadius: '4px',
                      border: '1px solid #e0e0e0'
                    }}
                  />
                </div>
              ) : (
                <a
                  href={faq.attachFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '6px 12px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px',
                    color: '#1890ff',
                    textDecoration: 'none',
                    border: '1px solid #d9d9d9'
                  }}
                >
                  {faq.attachFile.split('/').pop()}
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FaqCard;