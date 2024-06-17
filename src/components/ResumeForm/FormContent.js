import React from 'react';
import LanguageSection from './Language/LanguageSection';

const FormContent = ({ activeSections, languages, setLanguages }) => {
    return (
        <div className="section-content">
            {activeSections.includes('Language') && (
                <LanguageSection languages={languages} setLanguages={setLanguages} />
            )}
        </div>
    );
};

export default FormContent;
