import React, { useState, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import './ResumePage.css';
import ResumeNav from "../../components/ResumeCommon/ResumeNav";
import styled from "styled-components";
import CategoryList from "../../components/ResumeCategory/CategoryList";
import FormContent from "../../components/ResumeForm/FormContent";
import { SkillContext } from "../../contexts/SkillContext";

const CategoryContainer = styled.div`
    margin-left: 20px;
    width: 400px;
    height: 600px;
    background-color: rgba(0, 30, 89, 1);
`;

const CategoryContainer2 = styled.div`
    width: 85%;
    height: 90%;
    background-color: white;
    border-radius: 5px;
`;

const Title = styled.h3`
    margin-top: 25px;
    margin-left: 25px;
    margin-bottom: 15px;
    background-color: white;
    color: black;
`;

const Line = styled.div`
    height: 1px;
    margin-left: 20px;
    width: 300px;
    background-color: rgba(0, 30, 89, 1);
`;

const Button = styled.button`
    width: 90px;
    height: 40px;
    background-color: rgba(0, 69, 171, 1);
    color: white;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    border: none;
    cursor: pointer;
`;

const ResumeTitle = styled.input`
    display: flex;
    align-items: center;
    width: 700px;
    height: 40px;
    font-size: 20px;
    padding: 10px;
    border-radius: 5px;
    border-color: rgba(89, 127, 200, 1);
    border-width: 3px;
    border-style: solid;
    line-height: 1.5;
    box-sizing: border-box;
`;

function ResumePage({ baseUrl }) {
    const navigate = useNavigate();
    const { resumeId } = useParams();
    const [activeSections, setActiveSections] = useState([]);
    const [resumeTitle, setResumeTitle] = useState("");
    const { skills } = useContext(SkillContext);

    const handleSectionChange = (sections) => {
        setActiveSections(sections);
    };

    const handleTitleChange = (event) => {
        setResumeTitle(event.target.value);
    };

    const handleSave = () => {
        onUpdateSkills(skills);
    };

    const onUpdateSkills = (updateSkills) => {
        console.log("Updating skills:", updateSkills);

        Promise.all(
            updateSkills.map(skill => {
                return fetch(`${baseUrl}/api/resumes/${skill.id}/skills`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(skill.content)
                });
            })
        )
            .then(responses => {
                console.log("Skills updated successfully", responses);
                alert("Skills updated successfully");
            })
            .catch(error => {
                console.error("Error updating skills:", error);
                alert("Error updating skills");
            });
    };
    // 인쇄 대화 상자
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="app">
            <div className="nav">
                <ResumeNav defaultActive="작성"/>
            </div>
            <div style={{display:'flex'}}>
                <div className="category-container">
                    <CategoryContainer style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                        <CategoryContainer2>
                            <Title>이력서 항목</Title>
                            <Line/>
                            <CategoryList onSectionChange={handleSectionChange}></CategoryList>
                        </CategoryContainer2>
                    </CategoryContainer>
                </div>
                <div className="form-container">
                    <div style={{marginTop: 25, marginRight: 25, display:"flex", justifyContent:'end', gap: 10}}>
                        <Button onClick={() => navigate(`/resumes/${resumeId}/preview`)}>테스트</Button>
                        <Button onClick={handleSave}>저장</Button>
                        <Button onClick={handlePrint}>PDF 인쇄</Button>
                    </div>
                    <div id="printContent" style={{ width: '100%', padding: '20px', background: 'white' }}>
                        <div style={{display:'flex', justifyContent:'center', marginTop: 30, marginBottom:10}}>
                            <ResumeTitle type="text" value={resumeTitle} onChange={handleTitleChange} placeholder="이력서 제목 (저장용)"/>
                        </div>
                        <FormContent activeSections={activeSections}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumePage;
