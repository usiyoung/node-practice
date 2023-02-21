# node-practice

**패키지 매니저**

**package.json 파일 직접 만들기**

```
npm init
```

**package.json 살펴보기**

```
// npm run [스크립트 명]으로 스크립트 실행
// npm run test
"scripts" : {
  "test": "echo \"Error: no test specified\" && exit 1"
}

// 설치한 패키지가 저장되는 곳
// ^가 붙을 경우 버전 유지
"dependencies" : {
  "body-parser": "^1.19.0"
}

// 개발용으로 사용할 패키지
"devDependencies": {

}
```

**글로벌로 패키지를 설치할 경우**

```
npm i -g rimraf

// 글로벌로 설치한 rimraf 사용법 
rimraf node_modules // *rimraf는 파일 삭제 해주는 모듈
```

전역으로 패키지를 설치할 경우 명령어처럼 패키지를 사용할 수 있다. 
단, devDependencies에 패키지를 설치한 이력이 남지않는다. 프로젝트를 다른 사람에게 이관할 경우 기록이 남지 않아 해당 패키지 사용 여부를 알 수 없다.

- 해결방법 : 전역 설치를 하지 않고 npx 사용해 명령어 처럼 사용한다.

**패키지 버전 SemVer(유의적 버저닝)**

```
1.0.8
Major(주버전) / Minor(부버전) / Patch(수버전)
하위 호환이 되지 않는 변경 사항 / 하위 호환이 되는 변경 사항 / 간단한 버그 수정
```

