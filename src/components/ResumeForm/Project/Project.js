import React, {useState} from 'react';
import SectionContainer from "../../ResumeCommon/SectionContainer";
import ProjectRecord from "./ProjectRecord";
import AddRecord from "../../ResumeCommon/AddRecord";


const Project = ({onRemove}) => {

    const [projects, setProjects] = useState([
        <ProjectRecord key={0} onRemove={() => removeProject(0)} />
    ]);

    const addProject = () => {
        setProjects(prev => [
            ...prev,
            <ProjectRecord key={prev.length} onRemove={() => removeProject(prev.length)} />
        ]);
    };

    const removeProject = (index) => {
        setProjects(prev => prev.filter((_, idx) => idx !== index));
    };

    return (
        <SectionContainer title="Project">
            {projects}
            <div style={{height: 10}}></div>
            <AddRecord fieldName="프로젝트" onClick={addProject}></AddRecord>
        </SectionContainer>
    );
};

export default Project;
