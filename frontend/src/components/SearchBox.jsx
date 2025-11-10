import React from 'react'
import { Button, Input, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import faqService from '../services/FaqService';
import { useState } from 'react';

const SearchBox = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('')

  const handleClick = () => {
    if (keyword.trim().length < 2) {
      onSearch('')
      message.warning('검색어를 두 글자 이상 입력해주세요.')
      return;
    }
    onSearch(keyword)
  }

  const handleChange = ((e) => {
    const value = e.target.value
    setKeyword(value)
    if (value.trim() === '') {
      onSearch('') //khi user xóa trống hiển thị lại tất cả
    }
  })

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Input
        placeholder="질문을 검색해주세요"
        suffix={<SearchOutlined style={{ fontSize: 20 }} />}
        style={{ width: 250, height: 40, paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, background: 'var(--input-field-bg-enabled, white)', borderRadius: 2, outline: '1px var(--input-field-stroke-enabled, #CECED3) solid', outlineOffset: '-1px', justifyContent: 'flex-end', alignItems: 'center', display: 'inline-flex' }}
        value={keyword}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleClick();
          }
        }}
      />

      <Button
        data-icon="none" data-shownumber="true" data-size="middle" data-state="enabled" data-style="primary" style={{ width: 80, height: 40, paddingLeft: 12, paddingRight: 12, background: 'var(--button-primary-bg-enabled, #2F2C4D)', borderRadius: 2, justifyContent: 'center', alignItems: 'center', gap: 4, display: 'inline-flex' }}
        onClick={handleClick}
      >
        <div style={{ color: 'var(--button-primary-fg, white)', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word' }}>검색</div>
      </Button>
    </div>
  )
}

export default SearchBox