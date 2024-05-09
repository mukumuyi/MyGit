import React, { useState, useEffect,memo } from "react";
import ImportArea from "./ImportArea";
import {PlotArea} from "./PlotArea";
import ControlPanel from "./ContolPanel";
import { DrawFromLocalFile, DrawNewProperty } from "./DataInput";
import Trial from "./Trial";

// 実装したいこと　～Googleマップ風のTimelineチャートを作る。～
// 1.SVGを一枚にする。 -> 完了
// 3.線幅、描画期間 -> 完了
// 4.色選択 -> 完了
// 5.検索ウィンドウ、フィルタ -> 完了
// 6.入力ファイルの選択、描画 -> 完了
// 5.軸変更機能 -> 完了
//
// 3.コンポーネントを分割する。
// 4.データ選択画面を追加する。（読込形式と指定、カラムの紐づけ、）
// パラメータを外部入力にする。
// 5.画面遷移を実装する。
// データ選択画面
//  (1)データの形式を選ぶ -> 完了
//  (2)対象データの指定
//   a.ローカルファイルの場合、選択 -> 完了
//   b.DBの場合はDBMS選択、接続DB情報、クエリ作成
//   c.web上のファイルの場合、URLを入力
//  (3)ヘッダー情報を取得して、項目の定義をする。 -> 完了
// 
//  (4)色領域の項目を取得して、色設定を定義できるようにする。 -> 完了
// Timeline画面
// 不具合
// 001.ImportAreaで色カラム選択後、画面切り替えをすると描画されない。
//
// 機能拡張
// コメントを残す機能。
// フォームやCSSの精査
// レンダー回数の減少対応
// ファイル読み込み系の処理の整理
// 大量データ向けの対応（JsonまではcsvToJsonで作って、そこから描画をする形式？）
// 最初の表示に戻すボタン リターンボタン。
// 2.画面の表示設定メニューを追加する。
// 対象を数秒さわり続けたらtooltipが表示
// 対象をクリックしてもtooptipを固定表示
// 6.ズームスライダーの実装
// 検索した場合それを画面の中心に持っていく動きを追加する。
// スクロールによる画面の表示変更。

export const Timeline = ((props) => {
  const [dispType, setDispType] = useState("Trial");
  const [dispControlPanel, setDispControlPanel] = useState(0);

  const [screenSize, setScreenSize] = useState({
    screenWidth: document.documentElement.clientWidth,
    screenHeight: document.documentElement.clientHeight,
  });

  // inputDate更新前に描画を行うとエラーが発生するため、描画処理を停止するフラグ
  const [drawFlag,setDrawFlag] = useState(true);

  const [timeSelected, setTimeSelected] = useState("172800000");
  const [widthSelected, setWidthSelected] = useState("8");

  const [colorSelected,setColorSelected] = useState([
    { id: 1, name: "Wait", value: "#c7cacc", label: "Wait" },
    { id: 2, name: "Fix", value: "#7f8b94", label: "Fix" },
    { id: 3, name: "Run", value: "#203b4c", label: "Run" }, 
    { id: 4, name: "Mente", value: "#e66465", label: "Mente" },
  ])

  const [sampleDate,setSampleDate] = useState("");

  const [searchText, setSearchText] = useState({ item: "name", text: null });
  const [filterText, setFilterText] = useState({ item: "name", text: null });

  const dateTypeSel = [
    { id: 1, name: "ISO8601_BASE", value: "YYYYMMDDHHmmSS", label: "YYYYMMDDHHmmSS" },
    { id: 2, name: "DATETIME_UNIX", value: "UNIX", label: "UNIX" },
    { id: 3, name: "DATETIME001", value: "YYYY/MM/DD HH:mm:SS", label: "YYYY/MM/DD HH:mm:SS" },
  ] 

  const [colSelector, setColSelector] = useState([
    { id: 1, name: "label", value: "label", label: "label" },
    { id: 2, name: "class", value: "class", label: "class" },
    { id: 3, name: "name", value: "name", label: "name" },
    { id: 4, name: "status", value: "status", label: "status" },
    {
      id: 5,
      name: "starting_time",
      value: "starting_time",
      label: "starting_time",
    },
    {
      id: 6,
      name: "ending_time",
      value: "ending_time",
      label: "ending_time  ",
    },
  ]);

  const [convDef, setConvDef] = useState({
    colStart: "starting_time",
    colEnd: "ending_time",
    colName: "name",
    colGrp: "label",
    colColor: "status",
    colDesc: "label",
    dateType: "YYYY/MM/DD HH:mm:SS",
  });

  const [inputData, setInputData] = useState([
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
  ]);

  const itemSelector = [
    { id: 1, name: "name", value: "name", label: "name" },
    { id: 2, name: "grpname", value: "grpname", label: "grpname" },
    { id: 3, name: "color", value: "color", label: "color" },
    { id: 4, name: "desc", value: "desc", label: "desc" },
    { id: 5, name: "id", value: "id", label: "id" },
  ];

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
    // console.log(e.target.id)
    // console.log(e.target.value)
    setDrawFlag(false);
    if (e.target.id === "colGrp") {
      setConvDef({ ...convDef, colGrp: e.target.value });
    } else if (e.target.id === "colColor") {
      setConvDef({ ...convDef, colColor: e.target.value });
  
      const uniqueStatusList = [...new Set(inputData.map(item => item[e.target.value]))];
      const assignColor = (index, length) => {
        const hex = Math.floor((index + 1) * 0xFFFFFF / length).toString(16).padStart(6, '0'); // インデックスに応じて色を計算
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

    } else if (e.target.id === "colStart") {
      setConvDef({ ...convDef, colStart: e.target.value });
      setSampleDate(inputData[1][e.target.value])
    } else if (e.target.id === "colEnd") {
      setConvDef({ ...convDef, colEnd: e.target.value });
    } else if (e.target.id === "colName") {
      setConvDef({ ...convDef, colName: e.target.value });
    } else if (e.target.id === "colDesc") {
      setConvDef({ ...convDef, colDesc: e.target.value });
    } else if (e.target.id === "ISO8601_BASE" || e.target.id === "DATETIME_UNIX" || e.target.id === "DATETIME001") {
      setConvDef({ ...convDef, dateType: e.target.value });
    }
  };

  function onChangeColor(e) {
    const updatedColors = colorSelected.map(color => {
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

  function handleResize() {
    // setScreenWidth(document.documentElement.clientWidth);
    // setScreenHeight(document.documentElement.clientHeight);
    setScreenSize({
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
    });
  }

  function drawFromLocalFile(e) {
    DrawFromLocalFile(e, convDef, setInputData,setColSelector);
  }

  window.addEventListener("resize", handleResize);

  useEffect(() => {
    if (dispType === "Draw") {
      DrawNewProperty(convDef, inputData, setInputData,setDrawFlag);
    }
  }, [convDef]); // convDefが変更されたときだけこのuseEffectが実行される

  // useEffect(() => {
  //   console.log(inputData);
  // }, [inputData]);

  console.log("Render Timeline")

  return (
    <div>
      {dispType === "Trial" && (
        <Trial />
      )}
      {dispType === "Import" && (
        <ImportArea
          setColSelector={setColSelector}
          changeDispState={changeDispState}
          colSelector={colSelector}
          onChangeCol={onChangeCol}
          convDef={convDef}
          dateTypeSel={dateTypeSel}
          onChangeColor={onChangeColor}
          colorSelected={colorSelected}
          inputData={inputData}
          setInputData={setInputData}
          sampleDate={sampleDate}
          setDrawFlag={setDrawFlag}
        />
      )}
      {dispType === "Draw" && (        
          <ControlPanel
            changeDispState={changeDispState}
            dispControlPanel={dispControlPanel}
            changeDispControlPanelState={changeDispControlPanelState}
            colSelector={colSelector}
            onChangeCol={onChangeCol}
            convDef={convDef}
            dateTypeSel={dateTypeSel}
            onChangeTime={onChangeTime}
            timeSelected={timeSelected}
            onChangeWidth={onChangeWidth}
            widthSelected={widthSelected}
            onChangeColor={onChangeColor}
            colorSelected={colorSelected}
            selectFile={drawFromLocalFile}
            itemSelector={itemSelector}
            handleSubmitSerch={handleSubmitSerch}
            handleSubmitFilter={handleSubmitFilter}
            sampleDate={sampleDate}
          />
          )}
          {dispType === "Draw" && drawFlag && (
          <PlotArea
            width={screenSize.screenWidth}
            height={screenSize.screenHeight}
            fontSize="10"
            gHeight={widthSelected}
            frameTimespan={timeSelected}
            style={{ position: "absolute", left: "0", top: "0" }}
            searchText={searchText}
            filterText={filterText}
            colorSelected={colorSelected}
            inputData={inputData}
          />
      )}
    </div>
  );
}
)
