import React, {useState} from 'react';
import styled from "styled-components";

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
`;


const CertificateRecord = ({onRemove}) => {

    const [date, setDate] = useState('');
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
            <div style={{display: "flex", height: 35, marginTop: 5, gap: 5}}>
                <Input style={{width: 150}} placeholder="자격증명"/>
                <Input style={{width: 150}} placeholder="발행처"/>
                <div>
                    <Input style={{width: 70}} placeholder="YYYY.MM" value={date}
                           onChange={(e) => handleDateChange(setDate, e.target.value)}/>
                    {error && <div style={{fontSize: 13, color: 'rgba(202, 5, 5, 1)'}}>{error}</div>}
                </div>
            </div>
        </Border>
    );
};

export default CertificateRecord;
