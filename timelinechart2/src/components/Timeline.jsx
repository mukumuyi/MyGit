import React, { useState, useEffect } from "react";
import ImportArea from "./ImportArea";
import PlotArea from "./PlotArea";
import ControlPanel from "./ContolPanel";
import { DrawFromLocalFile, DrawNewProperty } from "./DataInput";

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
//  (1)データの形式を選ぶ
//  (2)対象データの指定
//   a.ローカルファイルの場合、選択
//   b.DBの場合はDBMS選択、接続DB情報、クエリ作成
//   c.web上のファイルの場合、URLを入力
//  (3)ヘッダー情報を取得して、項目の定義をする。（）
//  (4)色領域の項目を取得して、色設定を定義 をする。
// Timeline画面
//
// 機能拡張
// ファイル読み込み系の処理の整理
// 大量データ向けの対応（JsonまではcsvToJsonで作って、そこから描画をする形式？）
// 最初の表示に戻すボタン リターンボタン。
// 2.画面の表示設定メニューを追加する。
// 対象を数秒さわり続けたらtooltipが表示
// 対象をクリックしてもtooptipを固定表示
// 6.ズームスライダーの実装
// 検索した場合それを画面の中心に持っていく動きを追加する。
// スクロールによる画面の表示変更。

function Timeline(props) {
  const [dispType, setDispType] = useState("Draw");
  const [screenWidth, setScreenWidth] = useState(
    document.documentElement.clientWidth
  );

  const [screenHeight, setScreenHeight] = useState(
    document.documentElement.clientHeight
  );

  // const [screenSize,setScreenSize] = useState({screenWidth:document.documentElement.clientWidth,screenHeight:document.documentElement.clientHeight})

  const [timeSelected, setTimeSelected] = useState("172800000");
  const [widthSelected, setWidthSelected] = useState("8");

  const [colorWaitSelected, setColorWaitSelected] = useState("#c7cacc");
  const [colorFixSelected, setColorFixSelected] = useState("#7f8b94");
  const [colorRunSelected, setColorRunSelected] = useState("#203b4c");
  const [colorMenteSelected, setColorMenteSelected] = useState("#e66465");

  const [searchText, setSearchText] = useState({ item: "name", text: null });
  const [filterText, setFilterText] = useState({ item: "name", text: null });
  

  const [colSelector,setColSelector] = useState( [
    { id: 1, name:"label",value: "label" , label: "label"},
    { id: 2, name:"class",value: "class" , label:"class"  },
    { id: 3, name:"name",value: "name", label:  "name"},
    { id: 4, name:"status",value: "status", label:  "status"},
    { id: 5, name:"starting_time",value: "starting_time", label:  "starting_time"},
    { id: 6, name:"ending_time",value: "ending_time", label:  "ending_time  "},
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

  const [inputData,setInputData] = useState([]);

  const colorPalette = [
    { id: 1, name: "Wait", value: colorWaitSelected, label: "Wait" },
    { id: 2, name: "Fix", value: colorFixSelected, label: "Fix" },
    { id: 3, name: "Run", value: colorRunSelected, label: "Run" },
    { id: 4, name: "Mente", value: colorMenteSelected, label: "Mente" },
  ];

  const itemSelector = [
    { id: 1, name:"name",value: "name" , label: "name"},
    { id: 2, name:"grpname",value: "grpname" , label:"grpname"  },
    { id: 3, name:"color",value: "color", label:  "color"},
    { id: 4, name:"desc",value: "desc" , label: "desc" },
    { id: 5, name:"id",value: "id" , label: "id" },
  ];

  const changeDispState = () => {
    if (dispType === "Import") {
      setDispType("Draw");
    } else {
      setDispType("Import");
    }
  };

  const onChangeTime = (e) => {
    setTimeSelected(e.target.value);
  };

  const onChangeWidth = (e) => {
    setWidthSelected(e.target.value);
  };

  const onChangeCol = (e,col) => {
    setConvDef({ ...convDef, colGrp: e.target.value });
  };

  const onChangeColGrp = (e,col) => {
    setConvDef({ ...convDef, colGrp: e.target.value });
  };

  const onChangeColColor = (e,col) => {
    setConvDef({ ...convDef, colColor: e.target.value });
  };

  const onChangeColStart = (e,col) => {
    setConvDef({ ...convDef, colStart: e.target.value });
  };

  const onChangeColEnd = (e,col) => {
    setConvDef({ ...convDef, colEnd: e.target.value });
  };

  const onChangeColName = (e,col) => {
    setConvDef({ ...convDef, colName: e.target.value });
  };

  const onChangeColDesc = (e,col) => {
    setConvDef({ ...convDef, colDesc: e.target.value });
  };

  function onChangeColor(e) {
    if (e.target.id === "Wait") {
      setColorWaitSelected(e.target.value);
    }
    if (e.target.id === "Fix") {
      setColorFixSelected(e.target.value);
    }
    if (e.target.id === "Run") {
      setColorRunSelected(e.target.value);
    }
    if (e.target.id === "Mente") {
      setColorMenteSelected(e.target.value);
    }
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
    setScreenWidth(document.documentElement.clientWidth);
    setScreenHeight(document.documentElement.clientHeight);
  }

  function drawFromLocalFile(e) {
    DrawFromLocalFile(e, convDef, setInputData);
  }

  window.addEventListener("resize", handleResize);

  useEffect(() => {
    if(dispType === "Draw"){
      DrawNewProperty(convDef, inputData, setInputData);
    }
  }, [convDef]); // convDefが変更されたときだけこのuseEffectが実行される

  // const tempArray = DrawNewProperty(inputData,convDef);
  // setInputData(tempArray);

  return (
    <div>
      {dispType === "Import" && (
        <ImportArea changeDispState={changeDispState} 
        setColSelector={setColSelector}
        setInputData={setInputData}
        convDef={convDef}
        colSelector={colSelector}
        onChangeColGrp={onChangeColGrp}
        colSelectedGrp={convDef.colGrp}
        onChangeColColor={onChangeColColor}
        colSelectedColor={convDef.colColor}
        onChangeColStart={onChangeColStart}
        colSelectedStart={convDef.colStart}
        onChangeColEnd={onChangeColEnd}
        colSelectedEnd={convDef.colEnd}
        onChangeColName={onChangeColName}
        colSelectedName={convDef.colName}
        onChangeColDesc={onChangeColDesc}
        colSelectedDesc={convDef.colDesc}
        />
      )}
      {dispType === "Draw" && (
        <>
          <ControlPanel
            handleSubmitSerch={handleSubmitSerch}
            handleSubmitFilter={handleSubmitFilter}
            colSelector={colSelector}
            onChangeTime={onChangeTime}
            timeSelected={timeSelected}
            onChangeWidth={onChangeWidth}
            widthSelected={widthSelected}
            onChangeCol={onChangeCol}
            colSelected={convDef.colGrp}
            colorPalette={colorPalette}
            onChangeColor={onChangeColor}
            selectFile={drawFromLocalFile}
            changeDispState={changeDispState}
            itemSelector={itemSelector}
          />
          <PlotArea
            width={screenWidth}
            height={screenHeight}
            fontSize="10"
            gHeight={widthSelected}
            frameTimespan={timeSelected}
            style={{ position: "absolute", left: "0", top: "0" }}
            searchText={searchText}
            filterText={filterText}
            colorPalette={colorPalette}
            inputData={inputData}
          />
        </>
      )}
    </div>
  );
}

export default Timeline;
