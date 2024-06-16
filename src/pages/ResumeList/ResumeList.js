import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function ResumeList({ baseUrl }) {
  const [resumes, setResumes] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const navigate = useNavigate();

  // Resume 목록 조회 & 새로고침
  const fetchResumes = useCallback(async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN"); // 추가된 부분: 로컬 스토리지에서 토큰 가져오기
      const response = await fetch(`${baseUrl}/api/resumes`, {
        headers: {
          'Authorization': `Bearer ${token}`, // 추가된 부분: 인증 헤더에 토큰 추가
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const formattedResumes = data.map(resume => ({
        id: resume.id,
        title: resume.title             // ID 와 Title 추출
      }));
      setResumes(formattedResumes);
    } catch (error) {
      console.error('Failed to fetch resumes', error);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  // Resume 생성
  const createResume = useCallback(async () => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN"); // 추가된 부분: 로컬 스토리지에서 토큰 가져오기
      const response = await fetch(`${baseUrl}/api/resumes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // 추가된 부분: 인증 헤더에 토큰 추가
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }), // 수정된 부분: JSON 형식으로 전송
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchResumes();
      setNewTitle(''); // Title 입력값 초기화
    } catch (error) {
      console.error('Failed to create resume', error);
    }
  }, [baseUrl, fetchResumes, newTitle]);

  // Resume 삭제
  const deleteResume = useCallback(async (resumeId) => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN"); // 추가된 부분: 로컬 스토리지에서 토큰 가져오기
      const response = await fetch(`${baseUrl}/api/resumes/${resumeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // 추가된 부분: 인증 헤더에 토큰 추가
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchResumes();
    } catch (error) {
      console.error('Failed to delete resume', error);
    }
  }, [baseUrl, fetchResumes]);

  return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Resume List</h2>
        <div style={{ marginBottom: '1rem' }}>
          <input
              type="text"
              placeholder="Enter title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ fontSize: '1rem', padding: '0.5rem' }}
          />
          <button onClick={createResume} style={{ fontSize: '1rem', padding: '0.5rem' }}>+</button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {resumes.map(resume => (
              <li key={resume.id} style={{ marginTop: '1rem' }}>
                <button onClick={() => navigate(`/resumes/${resume.id}`)}>{`이력서 ${resume.id}. ${resume.title}`}</button>
                <button onClick={() => deleteResume(resume.id)}>X</button>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default ResumeList;
