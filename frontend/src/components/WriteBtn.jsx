import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import UseAuthStore from '../stores/UseAuthStore';

const WriteBtn = () => {
  const navigate = useNavigate();
  const role = UseAuthStore(state => state.role);

  const handleClick = () => {
    navigate('/write');
  };

  return (
    role === "admin" && (
      <Button
        onClick={handleClick}
        data-icon="none"
        data-shownumber="true"
        data-size="small"
        data-state="enabled"
        data-style="primary"
        style={{
          width: 80,
          height: 32,
          paddingLeft: 12,
          paddingRight: 12,
          background: 'var(--button-primary-bg-enabled, #2F2C4D)',
          borderRadius: 2,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'inline-flex',
          cursor: 'pointer'
        }}
      >
        <div style={{
          color: 'var(--button-primary-fg, white)',
          fontSize: 13,
          fontFamily: 'Pretendard',
          fontWeight: '400',
          lineHeight: 18,
          wordWrap: 'break-word'
        }}>
          글쓰기
        </div>
      </Button>
    )
  );
};

export default WriteBtn;