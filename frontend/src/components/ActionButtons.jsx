import React from 'react'
import { Button } from 'antd'

const ActionButtons = ({ onSubmit, onCancel, onLoading }) => {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Button
        onClick={() => onSubmit(false)}
        disabled={onLoading}
        data-icon="none" data-shownumber="true" data-size="large" data-state="enabled" data-style="primary" style={{ width: 200, height: 48, paddingLeft: 16, paddingRight: 16, background: 'var(--button-primary-bg-enabled, #2F2C4D)', borderRadius: 2, justifyContent: 'center', alignItems: 'center', gap: 4, display: 'inline-flex' }}>
        <div style={{ color: 'var(--button-primary-fg, white)', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word' }}>확인</div>
      </Button>

      <Button
        onClick={() => onSubmit(true)}
        disabled={onLoading}
        data-icon="none" data-shownumber="true" data-size="large" data-state="enabled" data-style="secondary" style={{ width: 200, height: 48, paddingLeft: 16, paddingRight: 16, background: 'var(--button-secondary-bg-enabled, white)', borderRadius: 2, outline: '1px var(--button-secondary-stroke-enabled, #4F4C6B) solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 4, display: 'inline-flex' }}>
        <div
          style={{ color: 'var(--button-secondary-fg-enabled, #4F4C6B)', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word' }}>임시저장</div>
      </Button>

      <Button data-icon="none" data-shownumber="true" data-size="large" data-state="enabled" data-style="tertiary" style={{ width: 200, height: 48, paddingLeft: 16, paddingRight: 16, background: 'var(--button-tertiary-bg-enabled, white)', borderRadius: 2, outline: '1px var(--button-tertiary-stroke-enabled, #CECED3) solid', outlineOffset: '-1px', justifyContent: 'center', alignItems: 'center', gap: 4, display: 'inline-flex' }}
        onClick={onCancel}>
        <div
          style={{ color: 'var(--button-tertiary-fg-enabled, #666670)', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word' }}>취소</div>
      </Button>
    </div>
  )
}

export default ActionButtons