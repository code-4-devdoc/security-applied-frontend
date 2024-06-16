import React, {useState} from "react";
import styled from "styled-components";
import SkillSearchComponent from "../SearchSkills/SkillSearchComponent";

const Border = styled.div`
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
    border-color: rgba(18, 73, 156, 50%);
    margin-bottom: 10px;
`

const Input = styled.input`
    padding: 8px;
    margin-right: 8px; margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: block;
    font-size: 15px;
`;

const Button = styled.button`
    width: 25px; height: 25px;
    background-color: ${props => props.active ? 'rgba(175, 175, 175, 1)' : 'rgba(129, 172, 255, 1)'};
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
`;


const MainSkill = ({ onRemove, onChangeContent }) => {
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState("");

    const toggleActive = () => {
        setIsActive(prev => !prev);
        if (isActive) {
            setValue("");           // 비활성화 시 텍스트 초기화
            onChangeContent("");    // 비활성화 시 Content 초기화
        }
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);             // MainSkill 내에서 value 상태 업데이트
        onChangeContent(newValue);      // Skill 컴포넌트로 value 상태 업데이트 신호 전달
    };

    return (
        <Border>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button style={{ cursor: "pointer", borderRadius: "0px 8px 0px 3px", width: 30, height: 20, backgroundColor: "rgba(18, 73, 156, 50%)", color: "white", border: "none" }} onClick={onRemove}>-</button>
            </div>
            <div style={{ height: 5 }}></div>
            <span style={{ fontWeight: 600, marginLeft: 40 }}>주요 기술</span>
            <div style={{ display: "flex", alignItems: 'center', gap: 15, paddingLeft: 15, paddingRight: 15, marginBottom: 5 }}>
                <SkillSearchComponent singleSelection={true}></SkillSearchComponent>
                <Input as="textarea"
                       style={{width: 500, height: 60, fontFamily: "inherit"}}
                       placeholder="부연 설명을 입력하세요."
                       disabled={!isActive}
                       value={value}
                       onChange={handleChange}
                />
                <Button style={{ marginTop: 35, marginLeft: -15 }} onClick={toggleActive} active={isActive}>
                    {isActive ? '-' : '+'}
                </Button>
            </div>
        </Border>
    );
}

export default MainSkill;