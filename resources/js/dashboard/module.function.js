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
