import React, { useState } from 'react';
import SkillSelectorModal from "./SkillSelectorModal";
import { icons as skillsData } from '../../../assets/icons';
import styled from "styled-components";

const Button = styled.div`
    min-width: 35px;
    min-height: 35px;
    max-height: 35px;
    max-width: 35px;
    padding: 5px;
    border: none;
    color: white;
    border-radius: 10px;
    font-weight: 600;
    font-size: 16px;
    background-color: rgba(129, 172, 255, 1);
    cursor: pointer;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    margin-right: 10px;
`

const SkillsContainer = styled.div`
    border-style: dashed;
    border-color: rgba(239, 245, 255, 1);
    padding: 5px;
    display: flex;
    align-items: center;
    min-width: 50px;
    min-height: 40px;
    max-height: 40px;
    flex-wrap: wrap;
`

const SkillSearchComponent = ({singleSelection = false}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리

    const openModal = () => setModalIsOpen(true); // 모달 창 열기
    const closeModal = () => {
        setModalIsOpen(false);
        setSearchTerm(""); // 검색어 초기화
    } // 모달 창 닫기

    const handleSelectSkill = (skill) => {
        const skillBaseId = skill.id.split('-')[0];
        if (singleSelection) {
            setSelectedSkills([skill]); // 단일 선택 모드에서는 항상 스킬을 하나만 유지
        } else if (!selectedSkills.find(selected => selected.id.split('-')[0] === skillBaseId)) {
            setSelectedSkills([...selectedSkills, skill]); // 배열에 스킬 추가
        }
        closeModal();
    };

    const handleRemoveSkill = (skillId) => {
        // skillId를 prop으로 받음
        setSelectedSkills(selectedSkills.filter(skill => skill.id !== skillId)); // skillId와 다른 스킬만 배열에 포함
    };

    return (
            <div style={{display:"flex", alignItems:"center"}}>
                <Button onClick={openModal}>검색</Button>
                {selectedSkills && (
                    <SkillsContainer>
                        {selectedSkills.map((skill, index) => (
                            <img key={index}
                                 src={skill.icon}
                                 alt={skill.name}
                                 style={{ width: '35px', height: '35px', margin: '5px' }}
                                 onClick={() => handleRemoveSkill(skill.id)}/>
                        ))}
                        {/*<span>{selectedSkill.name}</span>*/}
                    </SkillsContainer>
                )}
                <SkillSelectorModal
                    isOpen={modalIsOpen}
                    closeModal={closeModal}
                    selectSkill={handleSelectSkill}
                    skillsData={skillsData}
                    searchTerm={searchTerm}
                />
            </div>
    );
};

export default SkillSearchComponent;
