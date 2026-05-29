# SafePB AI Demo Guide

시연용 데모 유저 데이터를 데이터베이스에 적재하고 사용하는 방법입니다.

## 1. 데모 유저 데이터 적재
아래 명령어를 백엔드 디렉토리에서 실행하여 데모 유저 데이터를 생성합니다.
```bash
cd backend
npx ts-node src/seed-demo.ts
```

## 2. 브라우저 localStorage 설정
브라우저 개발자 도구(F12) 콘솔 또는 애플리케이션 탭에서 `localStorage`에 아래 키와 값을 입력합니다.
* **Key:** `safe_pb_user_id`
* **Value:** `142a89b1-1137-4634-898f-1d92517cd2cd`
