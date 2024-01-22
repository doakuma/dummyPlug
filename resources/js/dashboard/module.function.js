/**
 * 리스트 필터 기능 구현
 * 1. 선택된 메뉴, 위험도, 진행상태를 저장할 변수를 정의합니다.
 * 2. 각 필터링 조건에 맞는 데이터를 필터링하는 함수를 만듭니다.
 * 3. 모든 필터링 조건을 적용하여 최종 데이터를 구하는 함수를 작성합니다.
 * 4. 이벤트 핸들러에서 해당 필터 상태를 업데이트하고, 최종 필터링 된 데이터로 화면을 업데이트합니다.
 *
 * TODO: [X]일정 상태 / 진행 상태 구분하여 적용 필요
 * TODO: [ ]테이블 NODATA 구현
 */

// 필터링 상태 저장
var currentFilter = {
  selectedMenu: "all",
  checkedRisk: [],
  checkedProgress: [],
};

// 필터링된 데이터로 UI 업데이트
function updateDisplay(filteredArr, isSelectFilter) {
  if (isSelectFilter) {
    drawStatusInfo(filteredArr);
  }
  drawTable(COLUMNS, filteredArr);
}

// 데이터 필터링 함수
function filterData(data) {
  return data
    .filter(
      (item) =>
        currentFilter.selectedMenu === "all" ||
        item.menuCode === currentFilter.selectedMenu
    )
    .filter(
      (item) =>
        currentFilter.checkedRisk.length === 0 ||
        currentFilter.checkedRisk.includes(item.riskStatus)
    )
    .filter(
      (item) =>
        currentFilter.checkedProgress.length === 0 ||
        currentFilter.checkedProgress.includes(item.isComplete.toString())
    );
}

// 메뉴 선택 이벤트 핸들러
function handleMenuChange(data, selectedVal) {
  currentFilter.selectedMenu = selectedVal;
  var flitered = filterData(data);
  updateDisplay(flitered, true);
}

// 위험도 체크박스 이벤트 핸들러
function handleRiskChange(data, checkedValues) {
  currentFilter.checkedRisk = checkedValues;
  var flitered = filterData(data);
  updateDisplay(flitered, false);
}

// 진행상태 체크박스 이벤트 핸들러
function handleProgressChange(data, checkedValues) {
  currentFilter.checkedProgress = checkedValues;
  var flitered = filterData(data);
  updateDisplay(flitered, false);
}

// 체크박스 상태 변경 이벤트 처리 함수
function handleCheckboxChange(data, className, filterProperty) {
  var checks = document.querySelectorAll(className);
  checks.forEach((check) => {
    check.addEventListener("change", () => {
      var checkedValues = Array.from(checks)
        .filter((check) => check.checked)
        .map((check) => check.value);
      if (filterProperty === "riskStatus") {
        handleRiskChange(data, checkedValues);
      } else if (filterProperty === "isComplete") {
        handleProgressChange(data, checkedValues);
      }
    });
  });
}

// 필터링 및 이벤트 리스너 초기화
function initializeFilters(data) {
  var select = document.querySelector(".status-select select");
  select.addEventListener("change", (event) =>
    handleMenuChange(data, event.target.value)
  );
  handleCheckboxChange(data, ".status-check", "riskStatus");
  handleCheckboxChange(data, ".progress-check", "isComplete");
}

// filter is select
function drawFilterSelect(item, parent, curr, currCnt) {
  curr = document.createElement("option");
  curr.setAttribute("value", item.value);
  currCnt = document.createTextNode(item.label);
  curr.appendChild(currCnt);
  parent.append(curr);
}

// filter is Checkbox
function drawFilterCheckBox(item, parent, curr, currCnt) {
  curr = document.createElement("li");
  var currInput = document.createElement("input");
  var currLabel = document.createElement("label");
  var inputOption = {
    value: item.value,
    type: "checkbox",
    id: item.riskId,
    checked: item.isChecked,
    class: item.statusClassname,
  };
  var labelOption = {
    for: item.riskId,
    class: `label-checkbox ${item.labelClassName}`,
  };
  createElement(currInput, inputOption);
  createElement(currLabel, labelOption);
  currCnt = document.createTextNode(item.label);
  currLabel.appendChild(currCnt);
  curr.append(currInput);
  curr.append(currLabel);
  parent.append(curr);

  // create Element
  function createElement(target, option) {
    Object.entries(option).forEach(function ([key, value]) {
      target.setAttribute(key, value);
    });
  }
}

/**
 *
 * @param {} columns: table header object array
 * @param {} rows: table body object array
 *
 * TODO: [X] create page link
 * TODO: [X] author parser
 * TODO: [X] is complete parser
 * TODO: [X] risk status parser
 * TODO: [X] comment parser
 * TODO: [X] emphasis parser
 * TODO: [X] priority parser
 * TODO: [X] specs parser
 * TODO: [X] new icon parser
 * TODO: [X] modify content parser
 * TODO: [ ] modify status parser
 */
function drawTable(columns, rows) {
  COLUMNS = columns;
  var wrapper = document.querySelector(".page-list-wrapper");
  while (wrapper.firstChild) {
    wrapper.removeChild(wrapper.firstChild);
  }
  var _table = document.createElement("table");
  var _thead = document.createElement("thead");
  var _tbody = document.createElement("tbody");
  _table.setAttribute("class", "table page-list");

  var _tr = document.createElement("tr");
  var _trChild = null;

  // thead
  COLUMNS.forEach(function (column) {
    var _th = document.createElement("th");
    _th.textContent = column.label;

    if (column.child && column.child.length) {
      // child가 있는 경우 colspan 적용
      _th.setAttribute("colspan", column.child.length);
      // child 행 생성
      if (!_trChild) {
        _trChild = document.createElement("tr");
      }
      column.child.forEach(function (childColumn) {
        var _thChild = document.createElement("th");
        _thChild.textContent = childColumn.label;
        _trChild.appendChild(_thChild);
      });
    } else {
      // child가 없는 경우 rowspan 적용
      _th.setAttribute("rowspan", 2);
    }

    _tr.appendChild(_th);
  });

  _thead.appendChild(_tr);
  if (_trChild) {
    _thead.appendChild(_trChild);
  }

  // tbody
  rows.forEach(function (row) {
    var _trBody = document.createElement("tr");
    var riskStatus = curRiskStatus(row);
    Object.assign(row, {
      riskStatus,
    });
    COLUMNS.forEach(function (column) {
      // child가 있는 경우 각 child에 대한 셀을 생성
      if (column.child && column.child.length) {
        column.child.forEach(function (childColumn) {
          var childColKey = childColumn.key;
          var childData = row[column.key] ? row[column.key] : "";
          var _td = createCell(childData, childColKey); // createCell 함수를 사용하여 셀 생성
          _trBody.appendChild(_td);
        });
      } else {
        // child가 없는 경우 단일 셀을 생성
        var _td = createCell(row, column.key); // createCell 함수를 사용하여 셀 생성
        _trBody.appendChild(_td);
      }
    });
    _tbody.appendChild(_trBody);
  });

  _table.appendChild(_thead);
  _table.appendChild(_tbody);
  wrapper.appendChild(_table);
}

// create cell
function createCell(data, type) {
  var _td = document.createElement("td");
  var _text = document.createDocumentFragment();
  var isNew = createNewIcon(data);
  switch (type) {
    case "fileName": // 파일명
      _td.appendChild(createLink(data)).appendChild(isNew);
      return _td;
    case "author": // 담당자
      _td.textContent = data.author !== "" ? data.author : "인스플래닛";
      return _td;
    case "riskStatus": // 위험도
      var _status = document.createElement("span");
      _status.setAttribute("class", `status ${data.riskStatus}`);
      _td.appendChild(_status);
      return _td;
    case "requestContent": // 수정 요청 사항
    case "comments": // 비고
      var _comment = createComment(data, type);
      _td.appendChild(_comment);
      return _td;
    case "requestStatus": // 수정 진행 상태
    case "isComplete": // 작업 진행 상태
      var _comment = createProgress(data, type);
      _td.appendChild(_comment);
      return _td;
    case "priority": // 우선순위
      var _priority = creatPriority(data);
      _td.appendChild(_priority);
      return _td;
    case "functionSpec": // 기능 명세
      var _specs = createSpecs(data);
      _td.appendChild(_specs);
      return _td;
    default:
      _td.textContent = data[type];
      return _td;
  }
}

// create link
function createLink(data) {
  var { fileFolder, fileName, isComplete } = data;
  if (isComplete === 2) {
    var _link = document.createElement("a");

    _link.setAttribute("href", `${fileFolder}/${fileName}`);
    _link.setAttribute("target", "_blank");
    _link.textContent = fileName;
    return _link;
  } else {
    var _filename = document.createDocumentFragment();
    _filename.textContent = fileName;
    return _filename;
  }
}

// create risk icon
function curRiskStatus(data) {
  var { dueToDate, isComplete } = data;
  var isOver = TODAY > new Date(dueToDate); // 완료 예정일 지난 일정
  var isRisky = isCloseDueDate(new Date(dueToDate)); // 완료 예정일 임박한 일정 : 3일전
  var status = "";
  if (isComplete === 2 || (isComplete === 1 && !isRisky)) {
    status = "on-track";
  }
  if (isRisky && isComplete !== 2) {
    status = "at-risk";
  }
  if (isOver && isComplete !== 2) {
    status = "high-risk";
  }

  return status;
}

// comment parser : 비고, 수정사항(내용)에서 사용
function createComment(data, key) {
  var commentData = data[key];
  if (!commentData) {
    var _empty = document.createDocumentFragment();
    return _empty;
  } else {
    var wrapper = document.createElement("ul");
    wrapper.setAttribute("class", "comment-list");
    commentData.split("|").map(function (item) {
      var list = document.createElement("li");
      var _text = replaceWithTag(item);
      list.innerHTML = _text;
      wrapper.appendChild(list);
    });
    return wrapper;
  }
}

// priority parser
function creatPriority(data) {
  var { priority } = data;
  var wrapper = document.createElement("div");
  wrapper.setAttribute("class", `wrap-priority lv-${priority}`);
  for (i = 0; i < priority; i++) {
    var item = document.createElement("span");
    item.setAttribute("class", "item-priority");
    wrapper.appendChild(item);
  }
  return wrapper;
}

// specs parser
function createSpecs(data) {
  var { functionSpec } = data;
  var wrapper = document.createElement("div");
  wrapper.setAttribute("class", "wrap-specs");
  functionSpec.forEach(function (spec) {
    var item = document.createElement("p");
    item.setAttribute("class", "item-specs");
    var _text = replaceWithTag(spec);
    item.innerHTML = _text;
    wrapper.append(item);
  });
  return wrapper;
}

// new icon parser
function createNewIcon(data, where) {
  var { isComplete, completeDate } = data;
  var empty = document.createDocumentFragment();
  if (isComplete !== 2) return empty;
  var cmpDate = new Date(completeDate);
  var isNew = (TODAY.getTime() - cmpDate.getTime()) / (60 * 60 * 24 * 1000);
  var newIcon = document.createElement("i");
  newIcon.setAttribute("class", "icon-new");
  var iconText = document.createTextNode("NEW");
  newIcon.appendChild(iconText);
  return isNew <= NEW_MEASURE ? newIcon : empty;
}

// progress status parser
function createProgress(data, key) {
  console.debug("data, key", data, key);
  var _data = data[key];
  var wrapper = document.createElement("span");
  var status = _data === 2 ? "done" : _data === 1 ? "ongoing" : "pending";
  var progressText = _data === 2 ? "완료" : _data === 1 ? "진행중" : "진행대기";
  wrapper.setAttribute("class", `progress status-${status}`);
  wrapper.textContent = progressText;
  return wrapper;
}

/**
 * features
 * isCloseDueDate : 완료 예정일 임박 계산
 * replaceWithTag : 특수 문자 치환
 */

// 완료 예정일 임박 계산
function isCloseDueDate(dueToDate) {
  var chkClose =
    (dueToDate.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24);
  return chkClose <= 3; // 3일 전
}

/**
 * 특수문자 치환
 * @param {*} str : target string
 * markdown 문법 사용 : *(강조) | ~(취소선)
 */
function replaceWithTag(str) {
  // 태그 변환을 위한 토큰 저장 객체
  var tokens = {};

  // 지시자와 해당 HTML 태그 매핑
  var indicators = {
    "*": "strong",
    "~": "del",
  };

  // 모든 지시자를 고유한 토큰으로 대체
  Object.keys(indicators).forEach((indicator, index) => {
    // 고유 토큰 생성
    var token = `__TOKEN${index}__`;
    tokens[token] = indicators[indicator];

    // 지시자에 해당하는 정규식 생성
    let regex = new RegExp(`\\${indicator}`, "g");

    // 문자열 내의 지시자를 토큰으로 대체
    str = str.replace(regex, () => token);
  });

  // 토큰을 해당 태그로 변환
  Object.keys(tokens).forEach((token) => {
    // 태그 삽입을 위한 카운터
    let count = 0;
    // 토큰에 해당하는 정규식 생성
    let regex = new RegExp(`${token}`, "g");

    // 문자열 내의 토큰을 태그로 변환
    str = str.replace(regex, () => {
      count++;
      // 짝수번째일 때 종료 태그, 홀수번째일 때 시작 태그 삽입
      return count % 2 === 0 ? `</${tokens[token]}>` : `<${tokens[token]}>`;
    });
  });

  return str;
}

// 날짜 변경
function leftPad(value) {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
}
function toStringByFormatting(source, delimiter = "-") {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());

  return [year, month, day].join(delimiter);
}
