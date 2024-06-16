# 전체 개요  
## https://github.com/code-4-devdoc/DevDoc  
## https://github.com/code-4-devdoc/DevDoc-FE  
## https://github.com/code-4-devdoc/DevDoc-BE  
<br/>

---

# 메모
## H2-Console
#### http://localhost:8080/h2-console  
- JDBC URL : jdbc:h2:mem:testdb  
- UserName : root  
- Password : root
<br/>

---

# 코드리뷰
> https://github.com/code-4-devdoc/devdoc-front-resume-0607

> 마지막 커밋 기준 : add frontend component - Projects, Training, Activities, Awards, Cert…

> for Deploy 커밋 : 배포 관련 파일 및 개발환경 셋팅
<br/>

> 1:N Table Test 커밋 : 
<br/>

`index.js`: Skill Context 추가  
`Apps.js`: 라우팅주소 변경 & baseUrl(API주소) 전달  
`SkillContext.js`: ResumePage-Skill 사이 데이터 전달용 리액트 API  
`ResumeList.js`: Resume 생성 & 삭제 & /resumeId 라우팅 연결  
`ResumePage.js`: 저장버튼에 Skill 항목들 각각 /skillId/skills 로 API 요청 연결  
`Skill.js`: Skill 항목 저장 (content만) ~ `SkillContext` ~ `ResumePage.js`에 전달  
`MainSkill.js`: content 입력을 `Skill.js`에 전달  
`ResumePreview.js`: 모든 테이블 (status : F 포함) / status : T 인 테이블만  
<br/>

#### 입력폼-DB테이블 연결방법  
1. 입력폼 컨테이너에 content 입력 (컨테이너의 id는 기본 배열의 0,1,2임)
   <br/>
   
2. content 항목 입력받으면 mainSkills 배열에 저장 (useState로 추적)
   <br/>
   
   : 컨테이너 2개 생성 후 ABC / DEF 입력 시 -> mainSkills = [{ id : 0, content : "ABC" }, { id : 1, content : "DEF" }, { id : 2, content :  "" }]
   <br/>
   
3. 저장 버튼 클릭 시 `Skill.js`에서 updateSkills 배열 생성 ~ 초기화 ~ mainSkills의 content 복사
   <br/>
   
   : Ex) resumeId = 4 -> skillId = 10 11 12
   <br/>
   
   : updateSkills = [{ id : 10, content : null }, { id : 11, content : null }, { id : 12, content : null }] 초기화
   <br/>
   
   : mainSkills의 content를 updateSkills의 content에 복사 (빈컨테이너의 content 값은 null임)
   <br/>

   : updateSkills = [{ id : 10, content : "ABC" }, { id : 11, content : "DEF" }, { id : 12, content : null }]
   
4. `ResumePage.js`에서 updateSkills 배열을 받아와서 각각 /skillId/skills 로 PUT 요청 보내기
