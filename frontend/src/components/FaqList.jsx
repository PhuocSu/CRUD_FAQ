import React from 'react';
import FaqCard from './FaqCard';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import faqService from '../services/faqService';

const FaqList = ({ faqs, onDelete }) => {

  // console.log('3. FaqList - onDelete prop:', typeof onDelete, onDelete);

  if (!faqs || faqs.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography.Title level={5}>데이터가 없습니다.</Typography.Title>
      </div>
    )
  }

  const sortedFaqs = [...faqs].sort((a, b) => {
    return (b.isTemporarySaved === true) - (a.isTemporarySaved === true);
  });


  return (
    <div>
      {
        sortedFaqs.map((faq) => {
          return (
            <FaqCard
              key={faq.id}
              faq={faq}
              onDelete={onDelete}
            />
          )
        })
      }
    </div>
  );
};

export default FaqList;