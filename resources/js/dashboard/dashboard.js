/**
 * TODO: [X] 메뉴명으로 분류하여 보기 -> select
 * TODO: [ ] 진행상태 / 일정 기준 별로 분류하여 보기 -> checkbox
 * TODO: [ ] 메뉴마다 따로 진척도 확인 가능하도록 진행해보기
 *
 * TODO: [ ] 각 영역 웹 컴포넌트로 구현 가능한 지 검토
 */
var isTemplate = true; // template 사용을 위한 변수 실제 적용 시에는 false로 설정
var today = isTemplate ? new Date("2024-01-11") : new Date();

// draw list table
function drawList(arr) {
  var listCont = $(".page-list").find("tbody");
  var drawItem = "";
  $.each(arr, function (index, item) {
    var menuNm = item.menuNm;
    var pageNm = item.pageNm;
    var fileFolder = item.fileFolder;
    var fileName = item.fileName;
    var fileLink = fileName
      ? `<a href="${fileFolder}/${fileName}" target='_blank'>${fileName}</a>`
      : "";
    var author = item.author !== "" ? item.author : "인스플래닛";
    var isComplete =
      item.isComplete === 0
        ? "진행대기"
        : item.isComplete === 1
        ? "진행중"
        : "완료";
    var completeDate = item.completeDate;
    var dueToDate = item.dueToDate;
    var comments = item.comments;
    var status = curStatus(dueToDate, item.isComplete);
    var isStatus = { status: status };
    Object.assign(item, isStatus); // list item update with status

    // draw table
    drawItem += `<tr>`;
    drawItem += `<td>${menuNm}</td>`;
    drawItem += `<td class="txt-left">${pageNm}</td>`;
    item.isComplete === 2
      ? (drawItem += `<td class="txt-left">${fileLink}</td>`)
      : (drawItem += `<td class="txt-left">${fileName}</td>`);
    drawItem += `<td>${author}</td>`;
    drawItem += `<td><span class="status ${status}"></span></td>`;
    drawItem += `<td><div class="status-cell">${isComplete}</div></td>`;
    drawItem += `<td>${dueToDate}</td>`;
    drawItem += `<td>${completeDate}</td>`;
    drawItem += `<td class='txt-left'>${comments}</td>`;
    drawItem += "</tr>";
  });
  listCont.html(drawItem);
}

// draw status info
function drawStatusInfo(arr) {
  // isComplete 0 : 진행대기 | 1 : 진행중 | 2 : 완료
  var statusCont = $(".status-info");
  var statusItem = "";
  var total,
    dueTo = 0,
    onGoing = 0,
    complete = 0,
    dueToPer,
    onGoingPer,
    completePer;
  total = arr.length;
  $.each(arr, function (index, item) {
    if (item.isComplete === 0) {
      dueTo++;
    } else if (item.isComplete === 1) {
      onGoing++;
    } else {
      complete++;
    }
  });
  dueToPer = ((dueTo / total) * 100).toFixed(2);
  onGoingPer = ((onGoing / total) * 100).toFixed(2);
  completePer = ((complete / total) * 100).toFixed(2);
  statusItem = `
          <li>진척도:
            <span class="status-bar"><span class="status-bar-inner" style="width: ${completePer}px"></span></span>
            <strong>${completePer}</strong>%</li>
          <li>전체: <strong>${total}</strong>건</li>
          <li>진행대기: <strong>${dueTo}</strong>건(${dueToPer}%)</li>
          <li>진행중: <strong>${onGoing}</strong>건(${onGoingPer}%)</li>
          <li>완료: <strong>${complete}</strong>건</li>
        `;
  statusCont.html(statusItem);
  // reportdate
  var reportedDateWrapper = $(".reported-date");
  var reportedDate = toStringByFormatting(today);
  reportedDateWrapper.html(`기준일: ${reportedDate}`);
}

/**
 * current status 종류
 * 기준은 오늘 날짜
 * 비교 대상은 dueToDate, isComplete
 * isComplete - 0 : 진행대기 | 1 : 진행중 | 2 : 완료
 */
function curStatus(dueToDate, isComplete) {
  var isOver = today > new Date(dueToDate); // 완료 예정일 지난 일정
  var isRisky = isCloseDueDate(new Date(dueToDate)); // 완료 예정일 임박한 일정 : 3일전
  var status = ""; // todo | on-track | at-risk | high-risk | done
  // if (isComplete === 0) {
  //   status = "todo";
  // }
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

// 완료 예정일 임박 계산
function isCloseDueDate(dueToDate) {
  var chkClose =
    (dueToDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  return chkClose <= 3; // 3일 전
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

// 메뉴 선택
function handleChangeSelect(data) {
  var select = document.querySelector(".status-select select");
  var selectedArr = [];
  select.addEventListener("change", function (event) {
    var selectedVal = event.target.value;
    if (selectedVal === "all") {
      selectedArr = data;
    } else {
      var filterdArr = data.filter(function (item) {
        return item.menuCode === selectedVal;
      });
      selectedArr = filterdArr;
    }
    drawList(selectedArr);
    drawStatusInfo(selectedArr);
  });
}

// 위험도 선택
var checkedValue = [];
var chekStatus = document.querySelectorAll(".status-check");
function initCheckValue() {
  chekStatus.forEach(function (status) {
    status.checked
      ? checkedValue.push(status.value)
      : checkedValue.splice(checkedValue.indexOf(status.value), 1);
  });
}
function handleChangeCheck(data) {
  initCheckValue();
  chekStatus.forEach(function (status) {
    status.addEventListener("change", function () {
      status.checked
        ? checkedValue.push(status.value)
        : checkedValue.splice(checkedValue.indexOf(status.value), 1);

      var filteredArr = data.filter(function (item) {
        console.debug("item", checkedValue, item.status);
        return checkedValue.includes(item.status);
      });

      drawList(filteredArr);
    });
  });
}

// 진행상태 선택
var checkedProgress = [];
var chekSProgress = document.querySelectorAll(".progress-check");
function initCheckValueProgress() {
  chekSProgress.forEach(function (status) {
    status.checked
      ? checkedProgress.push(status.value)
      : checkedProgress.splice(checkedProgress.indexOf(status.value), 1);
  });
}
function handleChangeCheckProgress(data) {
  initCheckValueProgress();
  chekSProgress.forEach(function (status) {
    status.addEventListener("change", function () {
      status.checked
        ? checkedProgress.push(status.value)
        : checkedProgress.splice(checkedProgress.indexOf(status.value), 1);

      var filteredArr = data.filter(function (item) {
        return checkedProgress.includes(item.isComplete.toString());
      });

      drawList(filteredArr);
    });
  });
}

/**
 * 리스트 필터 기능 구현
 * 1. 선택된 메뉴, 위험도, 진행상태를 저장할 변수를 정의합니다.
 * 2. 각 필터링 조건에 맞는 데이터를 필터링하는 함수를 만듭니다.
 * 3. 모든 필터링 조건을 적용하여 최종 데이터를 구하는 함수를 작성합니다.
 * 4. 이벤트 핸들러에서 해당 필터 상태를 업데이트하고, 최종 필터링 된 데이터로 화면을 업데이트합니다.
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
