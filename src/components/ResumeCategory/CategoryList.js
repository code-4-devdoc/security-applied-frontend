import React, { useState } from 'react';

const sections = [
    { name: 'About Me', detail: '프로필', isOpen: false },
    { name: 'Skill', detail: '기술 스택', isOpen: false },
    { name: 'Education', detail:'학력', isOpen: false },
    { name: 'Career', detail:'경력', isOpen: false },
    { name: 'Project', detail:'프로젝트', isOpen: false },
    { name: 'Training', detail:'교육 이수', isOpen: false },
    { name: 'Activity', detail:'대외 활동', isOpen: false },
    { name: 'Award', detail:'수상 이력', isOpen: false },
    { name: 'Certificate', detail:'자격증', isOpen: false },
    { name: 'Language', detail:'어학', isOpen: false }
];

const CategoryList = ({ onSectionChange }) => {
    // sectionStates 상태를 초기화 (초기값은 sections 배열을 사용)
    const [sectionStates, setSectionStates] = useState(sections);

    // 사용자가 '+' 또는 '-' 버튼 클릭 시에 호출되는 함수
    // index: 사용자가 클릭한 섹션의 인덱스
    const toggleSection = (index) => {
        const newSections = [...sectionStates];
        newSections[index].isOpen = !newSections[index].isOpen; // 사용자가 클릭한 섹션 인덱스의 'isOpen' 속성을 반대로 설정
        setSectionStates(newSections); // sectionStates를 newSections로 업데이트
        // onSectionChange 콜백 함수를 통해 현재 열려 있는 섹션들의 이름 배열을 부모 컴포넌트로 전달
        onSectionChange(newSections
            .filter(section => section.isOpen) // newSections 배열에서 isOpen 속성이 'true'인 섹션들만 필터링하여 배열을 생성
            .map(section => section.name)); // 필터링된 배열의 각 섹션에서 name 속성만 추출하여 새로운 배열 생성
    };

    return (
        <div className="category-list">
            {sectionStates.map((section, index) => (
                <div key={section.name} className="category-list-item">
                    <span style={{width: 100, fontWeight:'bold'}}>{section.name}</span>
                    <span style={{width: 80, textAlign:'left'}}>{section.detail}</span>
                    <button className={section.isOpen ? 'button-plus' : 'button-minus'} onClick={() => toggleSection(index)}>
                        {section.isOpen ? '-' : '+'}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
