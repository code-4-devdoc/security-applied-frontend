import React from 'react';
import formSectionComponents from "./FormSectionComponents";

const FormContent = ({ activeSections, languages, setLanguages }) => {
    return (
        <div className="section-content">
            {activeSections.length ? (
                activeSections.map(section => {
                    const FormSectionComponent = formSectionComponents[section];
                    return FormSectionComponent ? (
                        <FormSectionComponent
                            key={section}
                            languages={languages}
                            setLanguages={setLanguages}
                        />
                    ) : (
                        <div key={section}>No component for {section}</div>
                    );
                })
            ) : (
                <p>Please select a section.</p>
            )}
        </div>
    );
};

export default FormContent;
