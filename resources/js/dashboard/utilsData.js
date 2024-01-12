var utilsData = {
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
      isChecked: true,
    },
    {
      value: "at-risk",
      label: "완료일 임박",
      labelClassName: "at-risk",
      riskId: "filterDueTo02",
      isChecked: true,
    },
    {
      value: "high-risk",
      label: "지연",
      labelClassName: "high-risk",
      riskId: "filterDueTo03",
      isChecked: true,
    },
  ],
  filterProgress: [
    {
      value: "0",
      label: "진행 대기",
      labelClassName: "",
      riskId: "filterDueTo01",
      isChecked: true,
    },
    {
      value: "1",
      label: "진행중",
      labelClassName: "",
      riskId: "filterDueTo02",
      isChecked: true,
    },
    {
      value: "2",
      label: "완료",
      labelClassName: "",
      riskId: "filterDueTo03",
      isChecked: true,
    },
  ],
  statusList: [],
};
