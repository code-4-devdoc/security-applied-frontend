import React from 'react';
import LanguageSection from './Language/LanguageSection';

const FormContent = ({ activeSections, languages, setLanguages, resumeId }) => {
    return (
        <div className="section-content">
            {activeSections.includes('Language') && (
                <LanguageSection languages={languages} setLanguages={setLanguages} resumeId={resumeId} />
            )}
        </div>
    );
};

export default FormContent;

