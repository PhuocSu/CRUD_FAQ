import React from 'react';
import FaqCard from './FaqCard';
import { Typography } from 'antd';

const FaqList = ({faqs}) => {
  if(!faqs || faqs.length === 0){
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
        <Typography.Title level={5}>데이터가 없습니다.</Typography.Title>
      </div>
    )
  }

  return (
    <div>
      {
        faqs.map((faq) => {
          return (
            <FaqCard 
              key={faq.id}
              faq={faq}
            />
          )
        })
      }
    </div>
  );
};

export default FaqList;