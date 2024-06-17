import React from 'react';
import LanguageSection from './Language/LanguageSection';
import AwardSection from './Award/AwardSection';

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


