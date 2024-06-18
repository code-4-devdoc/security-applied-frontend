import React from 'react';
import LanguageSection from './Language/LanguageSection';
import AwardSection from './Award/AwardSection';

// FormContent.js: 활성화된 항목들에 대응되는 컴포넌트들을 랜더링하는 역할

const FormContent = ({ activeSections, languages, setLanguages, awards, setAwards, resumeId }) => {
    return (
        <div className="section-content">
            {activeSections.includes('Language') && (
                <LanguageSection languages={languages} setLanguages={setLanguages} resumeId={resumeId} />
            )}
            {activeSections.includes('Award') && (
                <AwardSection awards={awards} setAwards={setAwards} resumeId={resumeId} />
            )}
        </div>
    );
};

export default FormContent;



