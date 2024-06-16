import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import AddRecord from "../../ResumeCommon/AddRecord";
import MainSkill from "./MainSkill";
import { SkillContext } from '../../../contexts/SkillContext';

const Skill = () => {
    const { resumeId } = useParams();
    const { setSkills } = useContext(SkillContext);
    const [mainSkills, setMainSkills] = useState([]);

    const initSkills = useCallback(() => {                          // updateSkills ID 할당
        const updateSkills = [
            { id: resumeId * 3 - 2, content: null },
            { id: resumeId * 3 - 1, content: null },
            { id: resumeId * 3, content: null }
        ];
        return updateSkills;
    }, [resumeId]);

    const [updateSkills, setUpdateSkills] = useState(initSkills());

    useEffect(() => {
        setUpdateSkills(prev => prev.map((skill, index) => ({       // mainSkills -> updateSkills content 복사
            ...skill,
            content: mainSkills[index]?.content || null
        })));
    }, [mainSkills, initSkills]);

    useEffect(() => {
        setSkills(updateSkills);
     }, [updateSkills, setSkills]);

    const addMainSkill = () => {
        if (mainSkills.length < 3) {    // 최대 3개까지만 추가 가능
            setMainSkills(prev => [...prev, { id: prev.length, content: "" }]);
        }
    }

    const removeMainSkill = (index) => {
        setMainSkills(prev => prev.filter((_, idx) => idx !== index));
        // idx !== index일 경우에만 mainSkills 배열에 추가 (즉, 현재 인덱스 요소만 제외하고 생성 되는 배열)
    };

    const updateMainSkillContent = (index, newValue) => {
        setMainSkills(prev => prev.map((skill, idx) =>
            idx === index ? { ...skill, content: newValue === "null" ? null : newValue } : skill
        ));
    };

    return (
        <SectionContainer title="Skill">
            <div style={{height: 15}}></div>
                {mainSkills && mainSkills.map((skill, index) => (
                    <MainSkill 
                        key={skill.id}
                        onRemove={() => removeMainSkill(index)}
                        onChangeContent={(content) => updateMainSkillContent(index, content)}
                    />
                ))}
            <div style={{height: 15}}></div>
            <div style={{display:"flex", justifyContent:"space-between"}}>
                <AddRecord fieldName="주요 기술" onClick={addMainSkill}></AddRecord>
                <div>
                    <span style={{fontSize: 11, color: "rgba(90, 214, 169, 1)"}}>*</span><span style={{fontSize: 11}}> 주요 기술은 최대 3개까지 추가할 수 있습니다.</span>
                </div>
            </div>
        </SectionContainer>
    );
}

export default Skill;