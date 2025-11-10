import React, { useEffect, useState } from 'react'
import faqService from '../services/FaqService.js' //lấy từ frontend

const TotalShow = ({ total }) => { //component được selected (SelectedTopic)

  return (
    <div className="justify-start" style={{ display: 'flex', alignItems: 'center' }}>
      <span
        className="text-base-fg-color-base-fg-70 text-base font-semibold font-['Pretendard'] leading-normal"
        value={total}
      >
        총 {total}건
      </span>

      <span className="text-base-fg-color-base-fg-70 text-base font-normal font-['Pretendard'] leading-normal">
        의 게시글

      </span>
    </div>
  )
}

export default TotalShow