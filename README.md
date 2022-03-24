# Nwitter
> React와 Firebase를 활용해 트위터 클론코딩

# 링크

[Nwitter](https://kimoony.github.io/nwitter/#/)

# 기능사항

- 간단한 코멘트 및 사진 업로드 후 등록하기
- 유저 본인이 작성한 뉴윗 내용 수정하기
- 유저 본인이 작성한 뉴윗 삭제하기
- 프로필에서 닉네임 변경하기
- 뉴윗 실시간 업로드

# 개발환경
- node 버전: v16.13.2
- npm 버전: 8.1.2

# 기술스택
- HTML, CSS, JavaScript
- React
- firebase
  - Authentication
  - Firestore Database
  - Realtime Database
  - Storage

# 시작
- Repository clone 후 `npm install`
- `npm start` 로 React 실행
- Firebase를 이용하기 위해 `npm i firebase@9.6.1` 설치
- 랜덤 index를 만들기 위해 `npm i uuid@8.3.2` 설치

# 배포
- `package.json` scripts 부분 수정
```js
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "deploy": "gh-pages -d build",
  "predeploy": "npm run build"
},
```
- 배포 작업 준비를 위해 `npm i gh-pages@3.2.3 --save-dev` 설치
- GitHub Repository 에 `gh-pages` branch 생성
- `npm run deploy` 입력
- Git-Hub에 gs-pages를 통해 [Nwitter](https://kimoony.github.io/nwitter/#/) 를 볼 수 있다.

# 작성자
👨‍💻 **김 훈**
- GitHub: [@kimoony](https://github.com/kimoony/)


