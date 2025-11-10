import React, { useEffect, useState } from 'react';
import { message, Modal, Tabs } from 'antd';
import FaqList from './FaqList.jsx';
import faqService from '../services/FaqService.js';

const FaqTabs = ({ faqs, onTabChange, setTotal, currentPage, pageSize, onDelete }) => {
  // console.log('2. FaqTabs - onDelete prop:', typeof onDelete, onDelete);

  const [activeKey, setActiveKey] = useState('1')

  //map giữa key tab và topic
  const tabTopic = {
    1: "전체",
    2: "차량 및 계약 절차 관련",
    3: "계약 조건 관련",
    4: "결제/비용 관련",
    5: "인수관련",
    6: "기타"
  }

  // Khi user đổi tab
  const handleTabChange = (key) => {
    setActiveKey(key);

    // Lấy topic tương ứng với key
    const selectedTopic = tabTopic[key];

    //✅ Gọi callback để báo cho component cha biết tab nào đang chọn
    //Cách 1
    if (onTabChange) {
      onTabChange(selectedTopic);
    }
    // Cách 2
    // onTabChange?.(selectedTopic)
  };


  // Lọc FAQ theo tab
  const filteredFaqs = React.useMemo(() => {
    return activeKey === '1'
      ? faqs
      : faqs.filter((faq) => faq.questionTopic === tabTopic[activeKey]);
  }, [activeKey, faqs, tabTopic])

  const start = (currentPage - 1) * pageSize;
  const pageFaqs = filteredFaqs.slice(start, start + pageSize)

  //Mõi khi danh sách hiển thị thay đổi, báo ngược lại total
  useEffect(() => {
    // Cách 1
    if (setTotal) setTotal(filteredFaqs.length)
    //Cách 2
    // setTotal?.(filteredFaqs.length)
  }, [filteredFaqs])

  const items = Object.keys(tabTopic).map((key) => {
    return {
      key,
      label: tabTopic[key],
      children: (
        <div>
          <FaqList
            faqs={key === activeKey ? pageFaqs : []}
            onDelete={onDelete} />
        </div>
      )
    }
  })

  return (
    <Tabs
      defaultActiveKey="1"
      activeKey={activeKey}
      onChange={handleTabChange}
      items={items}
    />
  );
};

export default FaqTabs;