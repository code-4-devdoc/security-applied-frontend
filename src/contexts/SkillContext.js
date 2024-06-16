import React, { createContext, useState } from 'react';

export const SkillContext = createContext();

export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);

  return (
    <SkillContext.Provider value={{ skills, setSkills }}>
      {children}
    </SkillContext.Provider>
  );
};
