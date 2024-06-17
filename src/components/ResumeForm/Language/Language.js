import React, { useState, useEffect } from 'react';
import AddRecord from "../../ResumeCommon/AddRecord";
import SectionContainer from "../../ResumeCommon/SectionContainer";
import LanguageRecord from "./LanguageRecord";

const Language = ({ languages, setLanguages }) => {
    useEffect(() => {
        const savedLanguages = JSON.parse(localStorage.getItem('languages'));
        if (savedLanguages) {
            setLanguages(savedLanguages);
        } else {
            setLanguages([{ id: null, language: '', testName: '', score: '', date: '' }]);
        }
    }, [setLanguages]);

    useEffect(() => {
        localStorage.setItem('languages', JSON.stringify(languages));
    }, [languages]);

    const addLanguage = () => {
        setLanguages(prev => [
            ...prev,
            { id: prev.length, language: '', testName: '', score: '', date: '' }
        ]);
    };

    const removeLanguage = (index) => {
        setLanguages(prev => prev.filter((_, idx) => idx !== index));
    };

    const updateLanguage = (index, field, value) => {
        setLanguages(prev => prev.map((lang, idx) => idx === index ? { ...lang, [field]: value } : lang));
    };

    return (
        <SectionContainer title="Language">
            {languages.map((lang, index) => (
                <LanguageRecord
                    key={index}
                    index={index}
                    language={lang}
                    onRemove={() => removeLanguage(index)}
                    onUpdate={updateLanguage}
                />
            ))}
            <div style={{ height: 10 }}></div>
            <AddRecord fieldName="어학 점수" onClick={addLanguage}></AddRecord>
        </SectionContainer>
    );
};

export default Language;
