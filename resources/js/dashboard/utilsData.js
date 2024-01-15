var utilsInfo = {
  projectTitle: "Project명",
  filterSelect: [
    {
      value: "all",
      label: "전체메뉴",
    },
    {
      value: "MENU_CD001",
      label: "메뉴명1",
    },
    {
      value: "MENU_CD002",
      label: "메뉴명2",
    },
  ],
  filterRisk: [
    {
      value: "on-track",
      label: "정상",
      labelClassName: "on-track",
      riskId: "filterDueTo01",
      statusClassname: "checkbox status-check",
      isChecked: true,
    },
    {
      value: "at-risk",
      label: "완료일 임박",
      labelClassName: "at-risk",
      riskId: "filterDueTo02",
      statusClassname: "checkbox status-check",
      isChecked: true,
    },
    {
      value: "high-risk",
      label: "지연",
      labelClassName: "high-risk",
      riskId: "filterDueTo03",
      statusClassname: "checkbox status-check",
      isChecked: true,
    },
  ],
  filterProgress: [
    {
      value: "0",
      label: "진행 대기",
      labelClassName: "",
      riskId: "filterDueTo01",
      statusClassname: "checkbox progress-check",
      isChecked: true,
    },
    {
      value: "1",
      label: "진행중",
      labelClassName: "",
      riskId: "filterDueTo02",
      statusClassname: "checkbox progress-check",
      isChecked: true,
    },
    {
      value: "2",
      label: "완료",
      labelClassName: "",
      riskId: "filterDueTo03",
      statusClassname: "checkbox progress-check",
      isChecked: true,
    },
  ],
  statusList: [],
};
