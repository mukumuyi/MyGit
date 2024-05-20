import React, { useState, useEffect } from "react";

import { styled, useTheme } from "@mui/material/styles";
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

import { FaDatabase,FaPlay } from "react-icons/fa";
import { FaChartGantt, FaEarthAsia } from "react-icons/fa6";

import Form from "./Form";
import FormSelect from "./FormSelect";
import FormColor from "./FormColor";
import { HeaderFromLocalFile, DrawGraph, HeaderFromData } from "./DataInput";
import Datagrid from "./Datagrid";
import InputLocal from "./InputLocal";
import InputDB from "./InputDB";
import InputHttp from "./InputHttp";
import { InputTypeSelectDef, SqlDef, FileListDef } from "./Config";

// 画面の表示・非表示ボタンの実装
// 入力タイプの実装（LOCAL、DB、HTTP）
// SQLエディタの実装
// Gridデータの表示
//

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

function ImportArea(props) {
  const {
    setColSelector,
    changeDispState,
    colSelector,
    onChangeCol,
    convDef,
    dateTypeSel,
    onChangeColor,
    colorSelected,
    inputData,
    setInputData,
    setOriginData,
    originData,
    setDrawFlag,
  } = props;

  const inputTypeSelector = InputTypeSelectDef;
  const [inputTypeSelected, setInputTypeSelected] = useState(
    InputTypeSelectDef[0].name
  );
  const [sql, setSql] = useState(SqlDef);
  const [fileList, setFileList] = useState(FileListDef);
  const [selectedFile, setSelectedFile] = useState(FileListDef[0].name);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const testEventHandler = (e) => {
    console.log(e);
    console.log(e.target);
    // console.log(e.target.value);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const executeQuery = async () => {
    try {
      const params = {
        method: "post",
        headers: {
          "Content-Type": "application/json", // JSON形式のデータのヘッダー
        },
        body: JSON.stringify({
          // 基本的にはDBの切り替えはサーバー側の処理で行う。
          // host: "localhost",
          // user: "postgres",
          // database: "world",
          // password: "XXXX",
          // port: "5432",
          sql: sql,
        }),
      };
      const response = await fetch("http://localhost:3000/api/db", params);
      const data = await response.json();
      // console.log(data.rows);
      HeaderFromData(data.rows, setColSelector, setInputData);
    } catch (error) {
      console.error("エラー:", error);
      alert("データ取得エラーが発生しました。\n" + error)
    }
  };

  const makeFileList = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/filelist");
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

  const onDbClick = () => {
    executeQuery();
  };

  const onStartDraw = async function (e) {
    await DrawGraph(convDef, inputData, setInputData, setDrawFlag);
    changeDispState();
  };

  const onChangeInputType = (e) => {
    setInputTypeSelected(e.target.value);
  };

  useEffect(() => {
    if (inputTypeSelected === "HTTP") {
      makeFileList();
    }
  }, [inputTypeSelected]);

  const onChangeSelectedFile = (e) => {
    setSelectedFile(e.target.value);
  };

  function selectFile(e) {
    HeaderFromLocalFile(e, setColSelector, setInputData, setOriginData);
  }

  console.log(
    "=== RENDER ImportArea START  :",
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
                    <FaChartGantt size="15pt" />
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {InputTypeSelectDef.map((item, index) => (
              <ListItem
                key={item.name}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  onClick={() => {
                    setInputTypeSelected(item.name);
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
                      <InputLocal selectFile={selectFile} />
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
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {inputTypeSelected === "LOCAL" && (
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
                label="縦軸選択"
                value={convDef.colGrp}
                onChangeCol={onChangeCol}
                selectItem={colSelector}
              />
              <FormSelect
                id="colColor"
                label="色選択"
                value={convDef.colColor}
                onChangeCol={onChangeCol}
                selectItem={colSelector}
              />
              <FormSelect
                id="colStart"
                label="開始選択"
                value={convDef.colStart}
                onChangeCol={onChangeCol}
                selectItem={colSelector}
              />
              <FormSelect
                id="colEnd"
                label="終了選択"
                value={convDef.colEnd}
                onChangeCol={onChangeCol}
                selectItem={colSelector}
              />
              <FormSelect
                id="colName"
                label="名前選択"
                value={convDef.colName}
                onChangeCol={onChangeCol}
                selectItem={colSelector}
              />
              <FormSelect
                id="colDesc"
                label="コメント選択"
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
          
            {inputTypeSelected === "DB" && (
              <InputDB
                onDbClick={onDbClick}
                onCloseClick={setInputTypeSelected}
                sql={sql}
                handleTextareaChange={handleTextareaChange}
              />
            )}

            {inputTypeSelected === "HTTP" && (
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

export default ImportArea;
