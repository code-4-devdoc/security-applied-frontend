import React from 'react';
import formSectionComponents from "./FormSectionComponents";

// activeSections 배열을 통해 활성화된 섹션들의 내용을 표시
const FormContent = ({ activeSections }) => {
    return (
        <div className="section-content">
            {/* 배열에 항목이 있으면 '참' */}
            {activeSections.length ? (
                activeSections.map(section => {
                    /*<div key={section}>
                        <h2>{section}</h2>
                        <p>Content for {section}</p>
                    </div>*/
                    const FormSectionComponent = formSectionComponents[section];
                    return FormSectionComponent ? <FormSectionComponent key={section}/> : <div key={section}>No component for {section}</div>;
                })
            ) :  /* 배열에 항목이 없을 경우 '거짓' */
                (
                <p>Please select a section.</p>
            )}
        </div>
    );
};

export default FormContent;