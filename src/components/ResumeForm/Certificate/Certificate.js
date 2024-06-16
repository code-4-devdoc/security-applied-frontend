import React, {useState} from 'react';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import AddRecord from "../../ResumeCommon/AddRecord";
import CertificateRecord from "./CertificateRecord";

const Certificate = () => {
    const [certificates, setCertificates] = useState([
        <CertificateRecord key={0} onRemove={() => removeCertificate(0)} />
    ]);

    const addCertificate = () => {
        setCertificates(prev => [
            ...prev,
            <CertificateRecord key={prev.length} onRemove={() => removeCertificate(prev.length)} />
        ]);
    };

    const removeCertificate = (index) => {
        setCertificates(prev => prev.filter((_, idx) => idx !== index));
    };

    return (
        <SectionContainer title="Certificate">
            {certificates}
            <div style={{height: 10}}></div>
            <AddRecord fieldName="자격증" onClick={addCertificate}></AddRecord>
        </SectionContainer>
    );
};

export default Certificate;
