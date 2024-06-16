import React, {useState} from "react";
import styled from "styled-components";

const Container = styled.div`
    height: 45px;
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    justify-content: space-between;
    width: 1470px;
`

const LogoLabel = styled.div`
    height: 40px;
    width: 120px;
    font-size: 24px;
    font-weight: bold;
    color: white;
    padding-left: 15px;
    padding-top: 5px;
    border-radius: 5px 5px 0 0;
    background-color: rgba(0, 30, 89, 1);
`

const NavButton = styled.button`
    height: 45px;
    width: 75px;
    font-size: 18px;
    font-weight: bold;
    padding: 10px;
    border: none;
    border-radius: 5px 5px 0 0;
    background-color: ${props => props.active ? 'white' : 'rgba(0, 30, 89, 1)'};
    color: ${props => props.active ? 'rgba(0, 30, 89, 1)' : 'white'};
    margin-left: 10px;
    &:first-child {
        margin-left: 0;
    }
`

const ResumeNav = ({defaultActive}) => {
    const [activeButton, setActiveButton] = useState(defaultActive);

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };
    return (
        <Container>
            <LogoLabel>DevDoc</LogoLabel>
            <div>
                <NavButton onClick={() => handleButtonClick('작성')} active={activeButton === '작성'}>작성</NavButton>
                <NavButton onClick={() => handleButtonClick('관리')} active={activeButton === '관리'}>관리</NavButton>
            </div>
        </Container>
    );
};

export default ResumeNav;