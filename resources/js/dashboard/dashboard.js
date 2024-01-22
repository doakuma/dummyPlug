/**
 * TODO: [X] 메뉴명으로 분류하여 보기 -> select
 * TODO: [X] 진행상태 / 일정 기준 별로 분류하여 보기 -> checkbox
 * TODO: [ ] 메뉴마다 따로 진척도 확인 가능하도록 진행해보기
 *
 * TODO: [ ] 각 영역 웹 컴포넌트로 구현 가능한 지 검토
 */
var IS_TEMPLATE = true; // template 사용을 위한 변수 실제 적용 시에는 false로 설정
var TODAY = IS_TEMPLATE ? new Date("2024-01-11") : new Date();
var NEW_MEASURE = 2; // 신규 파일 생성일 기준 일자
var COLUMNS = []; // 테이블 컬럽 전역 설정

// draw title
function drawTitle(title) {
  var titleBox = document.querySelector(".header-title");
  titleBox.insertAdjacentHTML("afterbegin", `[${title}]`);
}

// modify info rendrer
function drawModifyInfo(data) {
  var wrapper = document.createDocumentFragment(); // fragment 생성
  Object.entries(data).forEach(function ([key, value]) {
    var item = document.createElement("td");
    if (key === "requestStatus" && data.requestDate !== "") {
      var status = document.createElement("span");
      var indicator =
        value === 0 ? "pending" : value === 1 ? "ongoing" : "done";
      var indicatorText =
        value === 0 ? "접수" : value === 1 ? "수정중" : "완료";
      status.setAttribute("class", `modify-status status-${indicator}`);
      status.textContent = indicatorText;
      item.appendChild(status);
    } else {
      item.textContent = data.requestDate !== "" ? value : ""; // 보안상 더 안전
    }
    wrapper.appendChild(item);
  });
  var tempDiv = document.createElement("div"); // 임시 div 요소 생성
  tempDiv.appendChild(wrapper.cloneNode(true)); // fragment를 복제하여 div에 추가

  return tempDiv.innerHTML;
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
  arr.forEach(function (item) {
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
          <li class="status-bar-wrapper">
            <strong class="status-bar-tit">진행률</strong>
            <strong>${completePer}%</strong>
            <span class="status-bar">
              <span class="status-bar-inner" style="width: ${completePer}px"></span>
            </span>
          </li>
          <li>전체: <strong>${total}</strong>건</li>
          <li>진행대기: <strong>${dueTo}</strong>건(${dueToPer}%)</li>
          <li>진행중: <strong>${onGoing}</strong>건(${onGoingPer}%)</li>
          <li>완료: <strong>${complete}</strong>건</li>
        `;
  statusCont.html(statusItem);
}

// draw filters
function drawFilters(data, target, type) {
  // filter wrapper 지정
  var wrapper = document.querySelector(target);

  // 요소 생성
  var filter = document.createElement(type);
  var filterItem, filterContent;
  data.forEach(function (item) {
    if (type === "select") {
      drawFilterSelect(item, filter, filterItem, filterContent);
    }
    if (type === "ul") {
      drawFilterCheckBox(item, filter, filterItem, filterContent);
    }
  });
  wrapper.append(filter);
}

/**
 * current status 종류
 * 기준은 오늘 날짜
 * 비교 대상은 dueToDate, isComplete
 * isComplete - 0 : 진행대기 | 1 : 진행중 | 2 : 완료
 */
function curStatus(dueToDate, isComplete) {
  var isOver = TODAY > new Date(dueToDate); // 완료 예정일 지난 일정
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

function initUtilities(data) {
  var projectTitle = data.projectTitle;
  var filterSelect = data.filterSelect;
  var filterRisk = data.filterRisk;
  var filterProgress = data.filterProgress;

  // reportdate
  var reportedDateWrapper = document.querySelector(".reported-date");
  var reportedDate = toStringByFormatting(TODAY);
  reportedDateWrapper.append(`TODAY: ${reportedDate}`);

  drawTitle(projectTitle);
  drawFilters(filterSelect, ".box-select", "select");
  drawFilters(filterRisk, ".status-risk", "ul");
  drawFilters(filterProgress, ".status-progress", "ul");
}
