document.write(
  '<script src="resources/js/dashboard/pageListData.js"></script>'
);
document.write('<script src="resources/js/dashboard/utilsData.js"></script>');
document.write(
  '<script src="resources/js/dashboard/module.function.js"></script>'
);

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

// draw title
function drawTitle(title) {
  var titleBox = document.querySelector(".header-title");
  titleBox.insertAdjacentHTML("afterbegin", `[${title}]`);
}

// draw list table
function drawList(arr) {
  var listCont = document.querySelector(".page-list tbody");
  var drawItem = "";
  arr.forEach(function (item) {
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
    var status = curStatus(dueToDate, item.isComplete);

    // new Icon
    var isNew = drawNewIcon(item);

    // 위험도 체크
    var isStatus = { status: status };
    Object.assign(item, isStatus); // list item update with status

    // 비고란 텍스트 치환
    var comments = item.comments.split("|");
    var cmtList = commentData(comments);

    // 우선순위
    var priority = drawPriority(item.priority);

    // 기능명세
    var specs = drawSpecs(item.functionSpec);

    // 수정사항
    var modifyInfo = drawModifyInfo(item.modifyInfo);
    console.debug("drawModifyinfo", modifyInfo);

    // draw table
    drawItem += `<tr>`;
    drawItem += `<td>${menuNm}</td>`;
    drawItem += `<td class="txt-left">${isNew}${pageNm}</td>`;
    item.isComplete === 2
      ? (drawItem += `<td class="txt-left">${fileLink}</td>`)
      : (drawItem += `<td class="txt-left">${fileName}</td>`);
    drawItem += `<td>${author}</td>`;
    drawItem += `<td>${priority}</td>`;
    drawItem += `<td>${specs}</td>`;
    drawItem += `<td><span class="status ${status}"></span></td>`;
    drawItem += `<td><div class="status-cell">${isComplete}</div></td>`;
    drawItem += `<td>${dueToDate}</td>`;
    drawItem += `<td>${completeDate}</td>`;
    drawItem += `<td class='txt-left'><ul class="comment-list">${cmtList}</ul></td>`;
    drawItem += modifyInfo;
    drawItem += "</tr>";
  });
  listCont.innerHTML = drawItem;
}

function drawPageList(arr) {
  // drawPageListHeader()
  // drawPageListBody()
  // drawPageListFooter()
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

// function spec rendrer
function drawSpecs(specs) {
  var wrapper = document.createElement("div");
  wrapper.setAttribute("class", "wrap-specs");
  specs.forEach(function (spec) {
    var item = document.createElement("p");
    item.setAttribute("class", "item-specs");
    item.innerHTML = spec;
    wrapper.append(item);
  });
  return wrapper.outerHTML;
}

// comment renderer
function commentData(cmtArr) {
  return cmtArr
    .map(function (item) {
      var cmtItem = document.createElement("li");
      var formattedText = replaceWithTags(item); // 문자열을 직접 전달
      cmtItem.innerHTML = formattedText; // innerHTML을 사용하여 문자열 삽입
      if (!item) {
        cmtItem.setAttribute("class", "nodata");
      }
      return cmtItem.outerHTML; // li 요소의 HTML을 반환
    })
    .join(""); // 배열을 하나의 문자열로 결합
}

// new icon renderer
function drawNewIcon(item) {
  if (item.isComplete !== 2) return "";
  var cmpDate = new Date(item.completeDate);
  var isNew = (TODAY.getTime() - cmpDate.getTime()) / (60 * 60 * 24 * 1000);
  var newIcon = document.createElement("i");
  newIcon.setAttribute("class", "icon-new");
  var iconText = document.createTextNode("NEW");
  newIcon.appendChild(iconText);
  return isNew <= NEW_MEASURE ? newIcon.outerHTML : "";
}

// priority renderer
function drawPriority(value) {
  var wrapper = document.createElement("div");
  wrapper.setAttribute("class", `wrap-priority lv-${value}`);
  for (i = 0; i < value; i++) {
    var item = document.createElement("span");
    item.setAttribute("class", "item-priority");
    wrapper.appendChild(item);
  }
  return wrapper.outerHTML;
}

// 비고 항목 내 특수문자 사용하여 강조 구문 만들기
function replaceWithTags(str) {
  var count = 0;
  return str.replace(/\*/g, function () {
    count++;
    return count % 2 === 0 ? "</strong>" : "<strong>";
  });
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
  // reportdate
  var reportedDateWrapper = document.querySelector(".reported-date");
  var reportedDate = toStringByFormatting(TODAY);
  reportedDateWrapper.append(`TODAY: ${reportedDate}`);
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

// 완료 예정일 임박 계산
function isCloseDueDate(dueToDate) {
  var chkClose =
    (dueToDate.getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24);
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

function initUtilities(data) {
  var projectTitle = data.projectTitle;
  var filterSelect = data.filterSelect;
  var filterRisk = data.filterRisk;
  var filterProgress = data.filterProgress;
  // console.debug("utilsData", data);

  drawTitle(projectTitle);
  drawFilters(filterSelect, ".box-select", "select");
  drawFilters(filterRisk, ".status-risk", "ul");
  drawFilters(filterProgress, ".status-progress", "ul");
}
