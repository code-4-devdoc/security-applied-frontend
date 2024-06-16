import React, {useState} from 'react';
import AddRecord from "../../ResumeCommon/AddRecord";
import SectionContainer from "../../ResumeCommon/SectionContainer";
import LanguageRecord from "./LanguageRecord";

const Language = () => {

    const [languages, setLanguages] = useState([
        <LanguageRecord key={0} onRemove={() => removeLanguage(0)} />
    ]);

    const addLanguage = () => {
        setLanguages(prev => [
            ...prev,
            <LanguageRecord key={prev.length} onRemove={() => removeLanguage(prev.length)} />
        ]);
    };

    const removeLanguage = (index) => {
        setLanguages(prev => prev.filter((_, idx) => idx !== index));
    };

    return (
        <SectionContainer title="Language">
            {languages}
            <div style={{height: 10}}></div>
            <AddRecord fieldName="어학 점수" onClick={addLanguage}></AddRecord>
        </SectionContainer>
    );
};

export default Language;
