/**
 * 리스트 필터 기능 구현
 * 1. 선택된 메뉴, 위험도, 진행상태를 저장할 변수를 정의합니다.
 * 2. 각 필터링 조건에 맞는 데이터를 필터링하는 함수를 만듭니다.
 * 3. 모든 필터링 조건을 적용하여 최종 데이터를 구하는 함수를 작성합니다.
 * 4. 이벤트 핸들러에서 해당 필터 상태를 업데이트하고, 최종 필터링 된 데이터로 화면을 업데이트합니다.
 *
 * TODO: 일정 상태 / 진행 상태 구분하여 적용 필요
 * TODO: 테이블 NODATA 구현
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
  drawList(filteredArr);
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
        currentFilter.checkedRisk.includes(item.status)
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
      if (filterProperty === "status") {
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
  handleCheckboxChange(data, ".status-check", "status");
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
 * TODO: [ ] priority parser
 * TODO: [ ] specs parser
 * TODO: [ ] modfy parser
 * TODO: [ ] new icon parser
 */
function drawTable(columns, rows) {
  var wrapper = document.querySelector(".page-list-wrapper");
  var _table = document.createElement("table");
  var _thead = document.createElement("thead");
  var _tbody = document.createElement("tbody");
  _table.setAttribute("class", "table page-list");
  var _tr = document.createElement("tr");

  // thead
  columns.forEach(function (column) {
    var _th = document.createElement("th");
    _th.textContent = column.label;
    _tr.appendChild(_th);
  });
  _thead.appendChild(_tr);

  // tbody
  rows.forEach(function (row) {
    var _trBody = document.createElement("tr");
    var riskStatus = curRiskStatus(row);
    Object.assign(row, {
      riskStatus,
    });
    columns.forEach(function (column) {
      _trBody.appendChild(createCell(row, column.key));
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
  switch (type) {
    case "fileName":
      _td.appendChild(createLink(data));
      return _td;
    case "author":
      _td.textContent = data.author !== "" ? data.author : "인스플래닛";
      return _td;
    case "isComplete":
      _td.textContent =
        data.isComplete === 0
          ? "진행대기"
          : data.isComplete === 1
          ? "진행중"
          : "완료";
      return _td;
    case "riskStatus":
      var _status = document.createElement("span");
      _status.setAttribute("class", `status ${data.riskStatus}`);
      _td.appendChild(_status);
      return _td;
    case "comments":
      var _comment = createComment(data);
      console.debug("_comment", _comment);
      _td.appendChild(_comment);
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

// comment parser
function createComment(data) {
  var { comments } = data;
  if (!comments) {
    var _empty = document.createDocumentFragment();
    return _empty;
  } else {
    var wrapper = document.createElement("ul");
    wrapper.setAttribute("class", "comment-list");
    comments.split("|").map(function (item) {
      var list = document.createElement("li");
      console.debug("createComment", item);
      var _text = replaceWithTag(item, "strong");
      list.innerHTML = _text;
      wrapper.appendChild(list);
    });
    return wrapper;
  }
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
 * @param {*} tags :replace tag name
 * TODO: [ ] 특수 문자 치환 종류 파악 후 활용
 */
function replaceWithTag(str, tags) {
  switch (tags) {
    case "strong":
      var count = 0;
      return str.replace(/\*/g, function () {
        count++;
        return count % 2 === 0 ? `</${tags}>` : `<${tags}>`;
      });
  }
}
