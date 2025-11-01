import React, { useEffect, useState } from 'react';
import { Col, Row, Input, Select, Button, message } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import ActionButtons from './ActionButtons';
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from 'react';

const { Option } = Select;

const FaqDetailsForm = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const faqData = location.state?.faqData || null;

    const [title, setTitle] = useState("")
    const [questionTopic, setQuestionTopic] = useState(undefined) // hoặc null là hiện placeholder
    const [attachFile, setAttachFile] = useState(null)
    const [selectedFileName, setSelectedFileName] = useState("선택된 파일 없음") //chỉ dùng đẻ hiển thị tên file ra giao diện người dùng
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (faqData) {
            setTitle(faqData.title || "");
            setQuestionTopic(faqData.questionTopic || undefined);
            setContent(faqData.content || "");
            setAttachFile(faqData.attachFile || null);
            setSelectedFileName(faqData.attachFileName || "선택된 파일 없음");
        }
    }, [faqData]);


    //dùng ref để trigger click cho input hidden
    const fileInputRef = useRef(null)

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleQuestionTopicChange = (value) => {
        setQuestionTopic(value)
    }
    const handleContentChange = (content) => {
        setContent(content)
    }

    //Click button "파일선택"
    const handleFileButtonClick = () => {
        fileInputRef.current.click()
    }

    //Khi chọn file
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setAttachFile(file)
            setSelectedFileName(file.name)
        } else {
            setAttachFile(null)
            setSelectedFileName("선택된 파일 없음")
        }
    }

    const handleSubmit = async (isTemporarySave) => {
        if (!title.trim()
            || !questionTopic
            || !content.trim()
        ) {
            message.error("Input repetively. Plz!!!")
            return;
        }

        const formData = new FormData();
        formData.append("title", title)
        formData.append("questionTopic", questionTopic)
        formData.append("content", content)
        formData.append("isTemporarySaved", isTemporarySave)
        if (attachFile) {
            formData.append("attachFile", attachFile) // key phải khớp upload.single('attachFile')
        }

        try {
            setLoading(true)
            // console.log("📝 Creating FAQ:", { title, questionTopic, content, attachFile });

            if (faqData?.id) {
                // Update existing FAQ
                const res = await axios.put(`http://localhost:3002/faqs/${faqData.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                // console.log(faqData.id)
                // console.log(res.data)
                message.success("저장되었습니다.");
                navigate('/faq'); // Navigate to FAQ list after update
            } else {
                // Create new FAQ
                const res = await axios.post("http://localhost:3002/faqs", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                console.log(res.data)
                message.success("저장되었습니다.");

                // Reset form and navigate for new FAQ creation
                setTitle("");
                setQuestionTopic(undefined);
                setAttachFile(null);
                setSelectedFileName("선택된 파일 없음");
                setContent("");
                navigate('/faq');
            }

        } catch (error) {
            console.error("Error creating FAQ:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            message.error(error.response?.data?.message || "Không thể tạo FAQ. Vui lòng thử lại sau.");
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = (e) => {
        setTitle('')
        setQuestionTopic(undefined)
        setAttachFile(null)
        setSelectedFileName("선택된 파일 없음")
        setContent('')
        message.info('작성한 내용이 초기화되었습니다.')
        //Turn back faq page
        navigate('/faq')
    }

    return (
        <div style={{ width: '100%', padding: '20px' }}>
            <div style={{
                textAlign: 'center',
                color: '#37373E',
                fontSize: 28,
                fontFamily: 'Noto Sans KR',
                fontWeight: '700',
                marginBottom: '24px'
            }}>
                자주묻는 질문
            </div>

            {/* Title Row */}
            <Row style={{ marginBottom: '16px', alignItems: 'center' }}>
                <Col span={5} style={{ fontWeight: 'bold' }}>글제목</Col>
                <Col span={19}>
                    <Input
                        placeholder="제목을 입력해주세요."
                        style={{
                            width: '100%',
                            height: '40px',
                            borderRadius: '2px',
                            border: '1px solid #CECED3',
                        }}
                        value={title}
                        onChange={handleTitleChange}
                    />
                </Col>
            </Row>

            {/* questionTopic Row */}
            <Row style={{ marginBottom: '16px', alignItems: 'center' }}>
                <Col span={5} style={{ fontWeight: 'bold' }}>카테고리</Col>
                <Col span={19}>
                    <Select
                        placeholder="카테고리를 선택해주세요."
                        style={{ width: '100%', height: '40px' }}
                        value={questionTopic}
                        onChange={handleQuestionTopicChange}
                    >
                        <Option value="차량 및 계약 절차 관련">차량 및 계약 절차 관련</Option>
                        <Option value="계약 조건 관련">계약 조건 관련</Option>
                        <Option value="결제비용 관련">결제비용 관련</Option>
                        <Option value="인수관련">인수관련</Option>
                        <Option value="기타">기타</Option>

                    </Select>
                </Col>
            </Row>

            {/* Attach file */}
            <Row style={{ marginBottom: '24px', alignItems: 'center' }}>
                <Col span={5} style={{ fontWeight: 'bold' }}>파일첨부</Col>
                <Col span={19}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px', // tạo khoảng cách giữa input và button
                        }}
                    >
                        <Input
                            disabled
                            value={selectedFileName}
                            style={{
                                flex: 1,
                                height: '40px',
                                borderRadius: '4px',
                                border: '1px solid #CECED3',
                            }}
                        />
                        {/* Thẻ input không tương thích với INPUT của ant-design => thêm therinput nhỏ*/}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <Button
                            type="primary"
                            style={{
                                height: '40px',
                                width: '120px',
                                borderRadius: '4px',
                                border: '1px solid #1890FF',
                                backgroundColor: '#1890FF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onClick={handleFileButtonClick}
                        >
                            파일선택
                        </Button>
                    </div>
                </Col>
            </Row>

            {/* Content Section */}
            <Row style={{ marginBottom: '16px' }}>
                <Col span={5} style={{ fontWeight: 'bold' }}>내용</Col>
                <Col span={19}>
                    <div style={{ border: '1px solid #CECED3', borderRadius: '2px' }}>
                        <Editor
                            value={content}
                            //sử dụng onEditorChange trong tinyMCE
                            onEditorChange={(newContent) => handleContentChange(newContent)}
                            apiKey='gtrrvznvynw7ba9glwoidczthkzb1ox435c6w4nh7ejm5y6w'
                            init={{
                                plugins: [
                                    // Core editing features
                                    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                                    // Your account includes a free trial of TinyMCE premium features
                                    // Try the most popular premium features until Nov 10, 2025:
                                    'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
                                ],
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                tinycomments_mode: 'embedded',
                                tinycomments_author: 'Author name',
                                mergetags_list: [
                                    { value: 'First.Name', title: 'First Name' },
                                    { value: 'Email', title: 'Email' },
                                ],
                                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                                uploadcare_public_key: '40bcfa96c1b7a6f1d0b0',
                            }}
                        />
                    </div>
                </Col>
            </Row>

            <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ActionButtons
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    onLoading={loading}
                />
            </Row>
        </div>
    );
};

export default FaqDetailsForm;