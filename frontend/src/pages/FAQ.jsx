import React, { useState } from 'react';
import axios from 'axios'
import { Button, Row, Col, message } from 'antd'
import SearchBox from "../components/SearchBox.jsx"
import FaqList from "../components/FaqList.jsx"
import WriteBtn from "../components/WriteBtn.jsx"
import TotalShow from "../components/TotalShow.jsx"
import Pagination from "../components/Pagination.jsx"
import FaqTabs from "../components/FaqTabs.jsx"
import FaqCard from '../components/FaqCard.jsx'
import { Flex, Layout } from 'antd';
import { useEffect } from 'react';
import faqService from '../services/faqService.js'


const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  width: '100%',
  color: '#fff',
  height: 'auto',
  padding: '0 24px',
  backgroundColor: '#4096ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const contentStyle = {
  width: '100%',
  minHeight: 'calc(100vh - 128px)',
  padding: '24px',
  backgroundColor: '#f5f5f5',
  color: '#333',
  margin: 0,
};

const footerStyle = {
  width: '100%',
  textAlign: 'center',
  padding: '16px 0',
  color: '#fff',
  backgroundColor: '#4096ff',
};

const layoutStyle = {
  minHeight: '100vh',
  width: '100vw',
  margin: 0,
  padding: 0,
};

const FAQHomepage = () => {
  const [faqs, setFaqs] = useState([])
  const [selectedTopic, setSelectedTopic] = useState('전체')
  const [currentTotal, setCurrentTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredFaqs, setFilteredFaqs] = useState([]) //Faq sau khi đã lọc
  const pageSize = 5

  useEffect(() => {
    faqService.fetchFaqs()
      .then((res) => {
        // Sort FAQs by ID in descending order (newest first)
        const sortedFaqs = [...res].sort((a, b) => b.id - a.id);
        setFaqs(sortedFaqs)
        setFilteredFaqs(sortedFaqs) //ban đầu lấy hết dữ liệu
      })
      .catch((error) => {
        console.error("Error fetching faqs:", error)
        console.log("Failed to fetch faqs")
      })
  }, [])

  const handleTabChange = async (topic) => {
    setSelectedTopic(topic)
    setCurrentPage(1) // Reset to first page when changing tabs

    if (topic === "전체") {
      setFilteredFaqs(faqs)
    } else {
      const filtered = faqs.filter((faq) => faq.questionTopic === topic)
      setFilteredFaqs(filtered)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  //Khi faq lọc dữ liệu xong, nó báo ngược lên tổng hiện tại
  const handleTotalChange = (total) => {
    setCurrentTotal(total)
  }

  const handleSearch = async (keyword) => {
    console.log("handleSearch called with:", keyword); // xem có đúng không
    if (!keyword || keyword.trim() === '') {
      const res = await faqService.fetchFaqs()
      setFaqs(res)
      setFilteredFaqs(res)
      return;
    }

    if (keyword.trim().length < 2) {
      return;
    }

    //fetch dữ liệu đầu tiên
    try {
      const results = await faqService.searchFaqs(keyword);
      // console.log("Search results:", results); // xem có data không
      setFaqs(results);
      setFilteredFaqs(results)
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching FAQs:", error);
      setFaqs([]);
      setFilteredFaqs([])
    }
  }

  const handleDeleteFaq = async (id) => {
    // console.log('1. handleDeleteFaq called with id:', id);
    try {
      await faqService.deleteFaq(id); 
      message.success('삭제되었습니다.');

      // Cập nhật lại danh sách ở local state
      const updatedFaqs = faqs.filter((faq) => faq.id !== id);
      setFaqs(updatedFaqs);

      // Nếu đang lọc theo topic
      if (selectedTopic === "전체") {
        setFilteredFaqs(updatedFaqs);
      } else {
        const filtered = updatedFaqs.filter((faq) => faq.questionTopic === selectedTopic);
        setFilteredFaqs(filtered);
      }

    } catch (error) {
      console.error('Error deleting FAQ:', error);
      message.error('삭제 중 오류가 발생했습니다.');
    }
  };



  return (
    <div style={{ width: '100%', margin: 0, padding: 0 }}>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 32, width: '100%' }}>
              <div style={{ cursor: 'pointer' }}>
                로그인
              </div>
              <div style={{ cursor: 'pointer' }}>
                회원가입
              </div>
            </div>
          </div>
        </Header>


        <Content style={contentStyle}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
            padding: '16px 0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SearchBox onSearch={handleSearch} />
            </div>

            <div>
              <FaqTabs
                faqs={filteredFaqs}
                onTabChange={handleTabChange}
                setTotal={handleTotalChange}
                currentPage={currentPage}
                pageSize={pageSize}
                onDelete={handleDeleteFaq}
              />
            </div>

            <div>
              <Row>
                <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
                  <TotalShow
                    questionTopic={selectedTopic}
                    total={currentTotal} />
                </Col>
                <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end', margin: '16px 0' }}>
                  <WriteBtn />
                </Col>
              </Row>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
              <Pagination
                total={currentTotal}
                pageSize={pageSize}
                current={currentPage}
                onChange={handlePageChange}
              />
            </div>

          </div>
        </Content>


        <Footer style={footerStyle}>
          ©2025 FAQ Application
        </Footer>
      </Layout>
    </div>
  );
};

export default FAQHomepage;