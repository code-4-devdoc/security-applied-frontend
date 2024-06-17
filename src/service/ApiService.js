// ApiService.js: API 호출 및 인증 처리 함수 정의

import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

// API 호출 함수
export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json", // 요청 헤더 설정
  });

  // 로컬 스토리지에서 ACCESS TOKEN 가져오기
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken); // 토큰이 있을 경우 헤더에 추가
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method, // HTTP 메서드 설정
  };

  if (request) {
    options.body = JSON.stringify(request); // 요청 본문 설정
  }

  return fetch(options.url, options)
      .then((response) =>
          response.text().then((text) => {
            if (!response.ok) {
              return Promise.reject(text);
            }
            return text ? JSON.parse(text) : {}; // JSON 응답이 비어있을 경우 처리
          })
      )
      .catch((error) => {
        console.error(error);
        if (error.status === 403) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      });
}

// 로그인 처리 함수
export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO).then((response) => {
    if (response.token) {
      localStorage.setItem(ACCESS_TOKEN, response.token); // 토큰을 로컬 스토리지에 저장
      window.location.href = "/resumes"; // 이력서 생성 페이지로 리디렉트
    }
  });
}

// 로그아웃 처리 함수
export function signout() {
  localStorage.setItem(ACCESS_TOKEN, null); // 토큰 삭제
  window.location.href = "/login"; // 로그인 페이지로 리디렉트
}

// 회원가입 처리 함수
export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO); // 회원가입 요청
}
