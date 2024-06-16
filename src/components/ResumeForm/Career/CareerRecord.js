import React, {useState} from "react";
import styled from "styled-components";
import CheckboxLabels from "../../ResumeCommon/CheckboxLabels";
import SkillSearchComponent from "../SearchSkills/SkillSearchComponent";

const Border = styled.div`
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
    border-color: rgba(18, 73, 156, 50%);
    margin-bottom: 10px;
    padding-left: 20px;
    padding-bottom: 20px;
`

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
    width: 150px;
`;

const CareerRecord = ({onRemove}) => {

    const checkboxOption = "재직"
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        if (event.target.checked) {
            setEndDate('');  // 체크박스 선택시 endDate 초기화
        }
    };

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');

    const validateDate = (date) => {
        return /^\d{4}\.\d{2}$/.test(date);
    };

    const handleDateChange = (setDate, value) => {
        setDate(value);
        if (validateDate(value) || value === '') {
            setError('');
        } else {
            setError('날짜 형식을 확인해 주세요.');
        }
    };

    return (
        <Border>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <button style={{
                    cursor: "pointer",
                    borderRadius: "0px 8px 0px 3px",
                    width: 30,
                    height: 20,
                    backgroundColor: "rgba(18, 73, 156, 50%)",
                    color: "white",
                    border: "none"
                }} onClick={onRemove}>-
                </button>
            </div>
            <div style={{display: "flex", gap: 5}}>
                <Input placeholder="회사명"/>
                <Input placeholder="부서명/직책"/>
            </div>
            <div style={{display: "flex", height: 35, alignItems: "center", marginTop: 5, gap: 5}}>
                <Input style={{width: 70}} placeholder="YYYY.MM" value={startDate}
                       onChange={(e) => handleDateChange(setStartDate, e.target.value)}/>
                <span>-</span>
                <Input style={{width: 70, marginRight: 10}} placeholder="YYYY.MM"
                       value={endDate}
                       onChange={(e) => handleDateChange(setEndDate, e.target.value)}
                       disabled={isChecked}
                />
                <CheckboxLabels option={checkboxOption} checked={isChecked}
                                onChange={handleCheckboxChange}></CheckboxLabels>
            </div>
            {error && <div style={{fontSize: 13, color: 'rgba(202, 5, 5, 1)'}}>{error}</div>}
            <div style={{height: 5}}></div>
            <SkillSearchComponent></SkillSearchComponent>
            <Input as="textarea"
                   style={{marginTop: 5, width: 620, height: 60, fontFamily: "inherit"}}
                   placeholder="업무 내용 또는 성과를 입력하세요."
            />
        </Border>
    );
}

export default CareerRecord;