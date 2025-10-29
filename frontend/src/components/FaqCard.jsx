import React, { useState } from 'react'
import { Button, Col, Row, Typography } from 'antd'

const FaqCard = ({ faq }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to remove HTML tags from content
  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '').trim();
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
              padding: '8px 0',
            }}
          >
            {faq?.questionTopic}
          </Col>
        </Row>

        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginRight: '16px',
          }}
        >
          <Button
            type="text"
            style={{
              color: '#666666',
              border: '1px solid #CECED3',
              fontSize: '13px',
              height: '32px',
              padding: '0 12px',
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
              padding: '0 12px',
            }}
          >
            삭제
          </Button>
        </div>

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
              <Typography.Text>{stripHtml(faq.content)}</Typography.Text>
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
