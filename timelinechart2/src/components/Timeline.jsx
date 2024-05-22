import React, { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";


import { FaDatabase, FaFolderOpen } from "react-icons/fa";
import { FaChartGantt, FaEarthAsia } from "react-icons/fa6";

import { PlotArea } from "./PlotArea";
import FormSelect from "./FormSelect";
import FormColor from "./FormColor";
import {
  HeaderFromLocalFile,
  DrawGraph,
  DrawNewProperty,
} from "./DataInput";
import Datagrid from "./Datagrid";
import InputDB from "./InputDB";
import InputHttp from "./InputHttp";
import ControlPanel from "./ContolPanel";
import {
  BasicProperty,
  ColorSelectDef,
  ItemSelectDef,
  ColSelectDef,
  InputDataDef,
  DateTypeDef,
  ConvDef,
  InputTypeSelectDef,
  SqlDef,
  FileListDef,
  url
} from "./Config";

// 実装したいこと　～Googleマップ風のTimelineチャートを作る。
// 機能要件
// !済! 1.SVGを一枚にする。
// !済! 3.線幅、描画期間
// !済! 4.色選択
// !済! 5.検索ウィンドウ、フィルタ
// !済! 7.軸変更機能
// 　　　軸を複数指定して階層化できる機能（レチクルとロットを合わせてみるため。）
// !保! 8.パラメータを外部入力にする。 （コンパイル時に設定する）
// 
//      9.イベント実装
//       (1)各種イベント
// !済!    a.tooltipの表示（Click）
// !済!    b.tooltipの表示（MouseOver）
//         e.tooltipの表示（複数秒MouseOver）
// !済!    c.Drug & Drop による画面移動
//         d.サイドパネルのデータ表示機能
//         e.画面の中心にクリックしたものを持ってくる。
// 　　　(2)イベント切替機能
//
// !着! 10.データ選択画面を追加する。（読込形式と指定、カラムの紐づけ、） 
// !済!  (1)データの形式を選ぶ -> 完了
// !済!  (2)対象データの指定
// !済!   a.ローカルファイルの場合、選択 -> 完了
//        b.DBの場合はDBMS選択、接続DB情報、クエリ作成、データ取得からの処理
// !済!　　　b-1.postgres
// 　　　　　b-2.oracle
// 　　　　　B-3.SQLServer
// 　　　　　クエリの保存・読込機能
// !済!   c.web上のファイルの場合、URLは固定 -> 完了
// !済!  (3)ヘッダー情報を取得して、項目の定義をする。 -> 完了
// !済!  (4)色領域の項目を取得して、色設定を定義できるようにする。 -> 完了
// !済!  (5)サンプルデータの表示 -> 完了
// 
// !着!
// !着!  エラーメッセージを出す。
// !未!　コメントを残す機能。
//
// 非機能要件
// !着! 3.コンポーネントを分割する。 -> 着手
// 
// 不具合
// 001.ImportAreaで色カラム選択後、画面切り替えをすると描画されない。 -> 完了
// 002.Filter設定後に表示されていない領域のデータを描画できない。 -> 完了
// 003.左端が早めに切れてしまう件 -> 未着手
//
//
//   b.DBの場合はDBMS選択、接続DB情報、クエリ作成、データ取得からの処理
// いくつか、イベントアクションを作っておく。
//  ・画面の中心にクリックしたものを持ってくる。
//  ・Tooltipを表示する。（メモもできる。）
//  ・ToolTipの動き（クリックか？マウスオーバーか？）

// 対象を数秒さわり続けたらtooltipが表示
// 対象をクリックしてtooptipを固定表示
// 検索した場合それを画面の中心に持っていく動きを追加する。-> あまり需要なさそう保留
// クリックしたら画面の真ん中に来て詳細を表示してくれる。 ->　一応実装はしたけど使いにくそう。


// フォームやCSSの精査(cssファイルはなくしたい。) -> 着手
// レンダー回数の減少対応 -> 着手
// ファイル読み込み系の処理の整理 -> 着手
// 大量データ向けの対応（JsonまではcsvToJsonで作って、そこから描画をする形式？）
// 最初の表示に戻すボタン リターンボタン。 ->　完了
// 2.画面の表示設定メニューを追加する。
// スクロールによる画面の表示変更。
// 6.ズームスライダーの実装 -> イベントが多発しそうなので、一旦保留。

// 画面の表示・非表示ボタンの実装
// 入力タイプの実装（LOCAL、DB、HTTP） -> 完了
// SQLエディタの実装 -> 完了
// Gridデータの表示 -> 完了

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  // transition: theme.transitions.create(["width", "margin"], {
  //   easing: theme.transitions.easing.sharp,
  //   duration: theme.transitions.duration.leavingScreen,
  // }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Timeline() {
  const [dispType, setDispType] = useState("Import");
  const [dispControlPanel, setDispControlPanel] = useState(0);

  const [screenSize, setScreenSize] = useState({
    screenWidth: document.documentElement.clientWidth,
    screenHeight: document.documentElement.clientHeight,
  });

  // inputDate更新前に描画を行うとエラーが発生するため、描画処理を停止するフラグ
  const [drawFlag, setDrawFlag] = useState(true);
  const [timeSelected, setTimeSelected] = useState(BasicProperty.timeSeleced);
  const [widthSelected, setWidthSelected] = useState(
    BasicProperty.widthSelected
  );
  const [cordinate, setCordinate] = useState({ x: 0, y: 0 });
  const [colorSelected, setColorSelected] = useState(ColorSelectDef);
  const [searchText, setSearchText] = useState({
    item: ItemSelectDef[0].name,
    text: null,
  });
  const [filterText, setFilterText] = useState({
    item: ItemSelectDef[0].name,
    text: null,
  });
  const [colSelector, setColSelector] = useState(ColSelectDef);
  const [convDef, setConvDef] = useState(ConvDef);
  const [inputData, setInputData] = useState(InputDataDef);
  const [originData, setOriginData] = useState(InputDataDef);
  const [minStart,setMinStart] = useState();

  const itemSelector = ItemSelectDef;
  const dateTypeSel = DateTypeDef;

  // const inputTypeSelector = InputTypeSelectDef;
  const [inputTypeSelected, setInputTypeSelected] = useState(
    InputTypeSelectDef[0].name
  );
  const [sql, setSql] = useState(SqlDef);
  const [fileList, setFileList] = useState(FileListDef);
  const [selectedFile, setSelectedFile] = useState(FileListDef[0].name);

  // const theme = useTheme();
  const [open, setOpen] = useState(false);

  const changeDispState = () => {
    if (dispType === "Import") {
      setDispType("Draw");
    } else {
      setDispType("Import");
    }
  };

  const changeDispControlPanelState = () => {
    if (dispControlPanel === 1) {
      setDispControlPanel(0);
    } else {
      setDispControlPanel(1);
    }
  };

  const onChangeTime = (e) => {
    setTimeSelected(e.target.value);
  };

  const onChangeWidth = (e) => {
    setWidthSelected(e.target.value);
  };

  const onChangeCol = (e) => {
    // console.log(e.target)
    // console.log(e.target.id)
    // console.log(e.target.value)
    setDrawFlag(false);
    if (e.target.name === "colGrp") {
      setConvDef({ ...convDef, colGrp: e.target.value });
    } else if (e.target.name === "colColor") {
      setConvDef({ ...convDef, colColor: e.target.value });

      const uniqueStatusList = [
        ...new Set(inputData.map((item) => item[e.target.value])),
      ];
      const assignColor = (index, length) => {
        const hex = Math.floor(((index + 1) * 0xffffff) / length)
          .toString(16)
          .padStart(6, "0"); // インデックスに応じて色を計算
        return `#${hex.toUpperCase()}`; // #FFFFFF 形式の色コードを返す
      };

      setColorSelected(
        uniqueStatusList.map((item, index) => ({
          id: index + 1,
          name: item,
          value: assignColor(index, uniqueStatusList.length),
          label: item,
        }))
      );
    } else if (e.target.name === "colStart") {
      setConvDef({ ...convDef, colStart: e.target.value });
    } else if (e.target.name === "colEnd") {
      setConvDef({ ...convDef, colEnd: e.target.value });
    } else if (e.target.name === "colName") {
      setConvDef({ ...convDef, colName: e.target.value });
    } else if (e.target.name === "colDesc") {
      setConvDef({ ...convDef, colDesc: e.target.value });
    } else if (e.target.name === "dateType") {
      setConvDef({ ...convDef, dateType: e.target.value });
    }
  };

  function onChangeColor(e) {
    const updatedColors = colorSelected.map((color) => {
      if (color.name === e.target.id) {
        // "Wait"の場合は新しい値に更新
        return { ...color, value: e.target.value };
      }
      return color;
    });

    // 更新された配列をセット
    setColorSelected(updatedColors);
  }

  function handleSubmitSerch(e) {
    e.preventDefault();
    setSearchText({ item: e.target[0].value, text: e.target[1].value });
  }

  function handleSubmitFilter(e) {
    e.preventDefault();
    setFilterText({ item: e.target[0].value, text: e.target[1].value });
  }

  let resizeTimer = "";
  window.onresize = () => {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(() => {
      setScreenSize({
        screenWidth: document.documentElement.clientWidth,
        screenHeight: document.documentElement.clientHeight,
      });
    },100);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const makeFileList = async () => {
    try {
      const response = await fetch(url.filelist);
      const tempList = await response.json();
      setFileList(tempList);
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  // textareaの値が変更されたときに実行される関数
  const handleTextareaChange = (event) => {
    setSql(event.target.value);
  };

  const onStartDraw = async function (e) {
    await DrawGraph(convDef, inputData, setInputData, setDrawFlag,setMinStart);
    changeDispState();
  };

  const onChangeSelectedFile = (e) => {
    setSelectedFile(e.target.value);
  };

  function selectFile(e) {
    HeaderFromLocalFile(e, setColSelector, setInputData, setOriginData);
  }

  useEffect(() => {
    if (inputTypeSelected === "HTTP") {
      makeFileList();
    }
  }, [inputTypeSelected]);
  
  useEffect(() => {
    if (dispType === "Draw") {
      DrawNewProperty(
        convDef,
        originData,
        setInputData,
        setDrawFlag,
        filterText
      );
    }
  }, [convDef, filterText]); // convDefが変更されたときだけこのuseEffectが実行される

  // useEffect(() => {
  //   console.log(inputData);
  // }, [inputData]);

  // useEffect(() => {
  //   console.log(originData);
  //   alert("データ取得が完了しました。")
  // }, [originData]);

  console.log(
    "=== RENDER TIMELINE START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "==="
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 1,
                width: 40,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              TIMELINE
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader onClick={handleDrawerClose}>
            <IconButton
              sx={{
                marginRight: 1,
                width: 40,
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {["DRAW"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={onStartDraw}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {dispType === "Draw" && <FaFolderOpen size="15pt" />}
                    {dispType === "Import" && <FaChartGantt size="15pt" />}
                  </ListItemIcon>
                  <ListItemText primary={dispType === "Draw" ? "IMPORT" :  dispType === "Import" ? "DRAW" : "OTHER"} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {dispType === "Import" &&
              InputTypeSelectDef.map((item, index) => (
                <ListItem
                  key={item.name}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    
                    onClick={() => {
                      if(item.name=="LOCAL"){
                        document.getElementById('inputFileUpload').click();
                        setInputTypeSelected(item.name);
                      } else {
                        setInputTypeSelected(item.name);
                      }
                    }}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.name === "LOCAL" ? (
                        // <InputLocal selectFile={selectFile} />
                        <div>
                        <FaFolderOpen size="15pt" />
                        <input type="file" accept=".csv" onChange={selectFile} id="inputFileUpload" style={{ display: "none" }}></input>
                        </div>
                      ) : item.name === "DB" ? (
                        <FaDatabase size="15pt" />
                      ) : (
                        <FaEarthAsia size="15pt" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
          <DrawerHeader />
          {dispType === "Draw" && (
            <ControlPanel
              dispControlPanel={dispControlPanel}
              changeDispControlPanelState={changeDispControlPanelState}
              colSelector={colSelector}
              onChangeCol={onChangeCol}
              convDef={convDef}
              onChangeTime={onChangeTime}
              timeSelected={timeSelected}
              onChangeWidth={onChangeWidth}
              widthSelected={widthSelected}
              onChangeColor={onChangeColor}
              colorSelected={colorSelected}
              itemSelector={itemSelector}
              handleSubmitSerch={handleSubmitSerch}
              handleSubmitFilter={handleSubmitFilter}
              setCordinate={setCordinate}
            />
          )}
          {dispType === "Draw" && drawFlag && (
            <PlotArea
              width={screenSize.screenWidth}
              height={screenSize.screenHeight}
              fontSize="18"
              gHeight={widthSelected}
              frameTimespan={timeSelected}
              style={{ position: "absolute", left: "0", top: "0" }}
              searchText={searchText}
              filterText={filterText}
              colorSelected={colorSelected}
              inputData={inputData}
              setCordinate={setCordinate}
              cordinate={cordinate}
              minStart={minStart}
            />
          )}
          {dispType === "Import" && inputTypeSelected === "LOCAL" && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 2fr",
                  margin: "5pt",
                }}
              >
                <FormSelect
                  id="colGrp"
                  label="縦軸選択(grpname)"
                  value={convDef.colGrp}
                  onChangeCol={onChangeCol}
                  selectItem={colSelector}
                />
                <FormSelect
                  id="colColor"
                  label="色選択(color)"
                  value={convDef.colColor}
                  onChangeCol={onChangeCol}
                  selectItem={colSelector}
                />
                <FormSelect
                  id="colStart"
                  label="開始選択(start)"
                  value={convDef.colStart}
                  onChangeCol={onChangeCol}
                  selectItem={colSelector}
                />
                <FormSelect
                  id="colEnd"
                  label="終了選択(end)"
                  value={convDef.colEnd}
                  onChangeCol={onChangeCol}
                  selectItem={colSelector}
                />
                <FormSelect
                  id="colName"
                  label="名前選択(name)"
                  value={convDef.colName}
                  onChangeCol={onChangeCol}
                  selectItem={colSelector}
                />
                <FormSelect
                  id="colDesc"
                  label="コメント選択(desc)"
                  value={convDef.colDesc}
                  onChangeCol={onChangeCol}
                  selectItem={colSelector}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 3fr 3fr",
                  margin: "5pt",
                }}
              >
                <FormSelect
                  id="dateType"
                  label="日付型選択"
                  value={convDef.dateType}
                  onChangeCol={onChangeCol}
                  selectItem={dateTypeSel}
                />
                <FormColor array={colorSelected} onChange={onChangeColor} />
              </div>
              <div>
                <Datagrid originData={originData} colSelector={colSelector} />
              </div>
            </>
          )}

          {dispType === "Import" && inputTypeSelected === "DB" && (
            <InputDB
              onCloseClick={setInputTypeSelected}
              sql={sql}
              handleTextareaChange={handleTextareaChange}
              setColSelector={setColSelector}
              setInputData={setInputData}
              setOriginData={setOriginData}
            />
          )}

          {dispType === "Import" && inputTypeSelected === "HTTP" && (
            <InputHttp
              selectedFile={selectedFile}
              onChangeSelectedFile={onChangeSelectedFile}
              onCloseClick={setInputTypeSelected}
              fileList={fileList}
              setColSelector={setColSelector}
              setInputData={setInputData}
              setOriginData={setOriginData}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

export default Timeline;
