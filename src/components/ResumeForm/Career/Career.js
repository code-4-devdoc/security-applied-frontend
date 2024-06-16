import React, {useState} from 'react';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import AddRecord from "../../ResumeCommon/AddRecord";
import CareerRecord from "./CareerRecord";



const Career = () => {
    const [careers, setCareers] = useState([
        <CareerRecord key={0} onRemove={() => removeCareer(0)} />
    ]);

    const addCareer = () => {
        setCareers(prev => [
            ...prev,
            <CareerRecord key={prev.length} onRemove={() => removeCareer(prev.length)} />
        ]);
    };

    const removeCareer = (index) => {
        setCareers(prev => prev.filter((_, idx) => idx !== index));
    };

    return (
        <SectionContainer title="Career">
            {careers}
            <div style={{height: 10}}></div>
            <AddRecord fieldName="경력" onClick={addCareer}></AddRecord>
        </SectionContainer>
    )
};

export default Career;
