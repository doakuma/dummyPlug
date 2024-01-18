# dummyPlug for HTML

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](Link)[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](Link)[![License](https://img.shields.io/badge/license-MIT-blue.svg)](Link)

화면 개발을 위한 초기 템플릿으로 다음과 같은 내용을 담고 있습니다

## Features

- Dashboard(todo)
- page Style Guide(todo)

### Dashboard

html 파일 페이지를 확인할 수 있는 파일 구조도입니다

#### Overview

제공하는 기능은 다음과 같습니다

- overview : 메뉴명과 페이지명 페이지 url정보를 담고 있으며 기타 기능들도 포함하여 작업 중인 페이지 리스트를 전체적으로 확인할 수 있습니다
- filter : 메뉴 / 작업상태 / 위험도 등의 분류 항목을 통해 필터링 기능도 포함하고 있어 작업 상태와 위험도를 파악할 수 있습니다
- 진행률 : 진행 상태에 따라 완료된 건수와 백분율을 표기하여 진척 상황을 쉽게 파악할 수 있습니다

#### 사용 방법

- resources/js/dashboard/pageListData.js 정보 사용
- ```javascript
  var pageList = [
    ...,
    {
      menuNm: "메뉴명1", // 메뉴명
      menuCode: "MENU_CD001", // 메뉴 코드
      pageNm: "페이지명_1", // 페이지명
      fileFolder: "temp", // 페이지 폴더
      fileName: "temp.html", // 파일명
      author: "", // 작성자
      isComplete: 2, // 완료 여부 0(진행대기) | 1(작업중) | 2(완료)
      completeDate: "2024-01-09", // 완료일
      dueToDate: "2024-01-11", // 완료 예정일
      priority: 3, // 우선순위
      // pageType: , // 페이지 형식 고민 후 재정의
      modifyInfo: { // 수정사항 정보
        requestDate: "2024-01-15", // 수정 요청일
        completeDate: "", // 수정 완료일
        requestContent: "수정요청 사항입니다", // 수정내역
        requestStatus: 0, // 진행상태 0(접수) | 1(수정중) | 2(완료)
      },
      functionSpec: [ // 기능 명세
        "기능을 나열합니다",
        "기능을 나열합니다",
        "기능을 나열합니다",
      ],
      comments: // 비고 : '|' (줄바꿈), '*~~~*'(강조)
        "*줄바꿈 되나요* first|줄바꿈 *되나요* second|*줄바꿈* 되나요 *third*",
      },
  ]
  ```
-
