// チャートの1ページの表示期間とバーの幅 初期値
export const BasicProperty = {
  timeSeleced: "172800000",
  widthSelected: "8",
};
// 検索・フィルタ対象列名 初期値
const itemList = ["name", "grpname", "color", "desc", "id"];
// 列選択対象列名 初期値
const colList = [
  "label",
  "class",
  "name",
  "status",
  "starting_time",
  "ending_time",
];
// 入力方法の選択値
export const InputTypeSelectDef = [
  { id: 1, name: "LOCAL", value: "LOCAL", label: "LOCAL" },
  { id: 2, name: "DB", value: "DB", label: "DB" },
  { id: 3, name: "HTTP", value: "HTTP", label: "HTTP" },
];
// httpファイル名 初期値
const httpFileList = ["input00.csv", "input01.csv"];
// db向けSQL 初期値
export const SqlDef = "SELECT id, name FROM public.users";
// 色選択 初期値
export const ColorSelectDef = [
  { id: 1, name: "Wait", value: "#c7cacc", label: "Wait" },
  { id: 2, name: "Fix", value: "#7f8b94", label: "Fix" },
  { id: 3, name: "Run", value: "#203b4c", label: "Run" },
  { id: 4, name: "Mente", value: "#e66465", label: "Mente" },
];
// チャートの1ページの表示期間 初期値
export const TimeSpanDef = [
  { id: 1, name: "Span1h", value: "3600000", label: "1時間" },
  { id: 2, name: "Span2h", value: "7200000", label: "2時間" },
  { id: 3, name: "Span6h", value: "21600000", label: "6時間" },
  { id: 4, name: "Span12h", value: "43200000", label: "12時間" },
  { id: 5, name: "Span1d", value: "86400000", label: "1日" },
  { id: 6, name: "Span2d", value: "172800000", label: "2日" },
];
// チャートのバーの幅 初期値
export const BarWidthDef = [
  { id: 1, name: "BarThick", value: "40", label: "太" },
  { id: 2, name: "BarRegular", value: "20", label: "標準" },
  { id: 3, name: "BarThin", value: "12", label: "細" },
  { id: 4, name: "BarThinest", value: "8", label: "超細" },
];
// 日付型選択肢 初期値
const dateTypeList = [{
  name: "ISO8601_BASE",value: "YYYYMMDDHHmmSS",
},{
  name: "DATETIME_UNIX",value: "UNIX",
},{
  name: "DATETIME001",value: "YYYY/MM/DD HH:mm:SS",
},
];
// 列選択 初期値
export const ConvDef = {
  colStart: "starting_time",
  colEnd: "ending_time",
  colName: "name",
  colGrp: "label",
  colColor: "status",
  colDesc: "label",
  dateType: "YYYY/MM/DD HH:mm:SS",
}
// 表示データ 初期値
export const InputDataDef = [
  {
    label: "PERSON_B",
    class: "H",
    name: "NAME_43",
    time1: "1703808000000 ",
    time2: "1703814500000 ",
    status: "Fix",
    starting_time: 1703775600000,
    ending_time: 1703776560000,
    id: 0,
    grpname: "PERSON_B",
    desc: "PERSON_B",
    color: "Fix",
    group: 1,
    lane: 1,
  },
];


export const DateTypeDef = dateTypeList.map((item, index) => {
  return { id: index, name: item.name, value: item.value, label: item.value };
});

export const FileListDef = httpFileList.map((item, index) => {
  return { id: index, name: item, value: item, label: item };
});

export const ItemSelectDef = itemList.map((item, index) => {
  return { id: index, name: item, value: item, label: item };
});

export const ColSelectDef = colList.map((item, index) => {
  return { id: index, name: item, value: item, label: item };
});
