import React, {useState} from 'react';
import AwardRecord from "./AwardRecord"
import SectionContainer from "../../ResumeCommon/SectionContainer";
import AddRecord from "../../ResumeCommon/AddRecord";

const Award = () => {
    const [awards, setAwards] = useState([
        <AwardRecord key={0} onRemove={() => removeAward(0)} />
    ]);

    const addAward = () => {
        setAwards(prev => [
            ...prev,
            <AwardRecord key={prev.length} onRemove={() => removeAward(prev.length)} />
        ]);
    };

    const removeAward = (index) => {
        setAwards(prev => prev.filter((_, idx) => idx !== index));
    };

    return (
        <SectionContainer title="Award">
            {awards}
            <div style={{height: 10}}></div>
            <AddRecord fieldName="수상 이력" onClick={addAward}></AddRecord>
        </SectionContainer>
    );
};

export default Award;
