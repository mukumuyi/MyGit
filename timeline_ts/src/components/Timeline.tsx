import React, { useState, useEffect } from "react";

import { styled } from "@mui/material/styles"; //消すと動かなくなる可能性大注意
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import { DrawerHeader } from "./atoms/DrawerHeader";
import { TopBar } from "./organism/TopBar";
import { SideBar } from "./organism/SideBar";
import { PlotArea } from "./module/PlotArea";
import { ImportArea } from "./organism/ImportArea";
import InputDB from "./organism/InputDB";
import InputHttp from "./organism/InputHttp";
import { ColorSelectDef, ColSelectDef, InputDataDef, ConvDef } from "./Config";

// TimelineChartは基本的には全体の骨組みを定義する。
// Component間で受け渡しが必要なHookを定義する。
// 原則的にはProcedureは追加しない。

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
//      PlotAreaのwidthとtimeSpan Arange
//
// 不具合
// 001.ImportAreaで色カラム選択後、画面切り替えをすると描画されない。 -> 完了
// 002.Filter設定後に表示されていない領域のデータを描画できない。 -> 完了
// 003.左端が早めに切れてしまう件 -> 未着手
// 004.色を選択して、カテゴリが多い場合、上の各種ドロップダウンボックスが横に伸びて戻せない
// 005.カラム名が一緒で中身が違う場合、カラーカテゴリが足りなくても気づけない。
// 006.SerchとFilterの対象項目を選んでも反映されない。
// 007.PlotArea表示中にファイル選択した場合、読み込みがされない。
// 008.PlotAreaで色選択を変更した場合、PlotAreaの描画でエラーになる。
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

type ColorOption = {
  id: number;
  name: string;
  value: string;
  label: string;
};

type ConvDefType = {
  colStart: string;
  colEnd: string;
  colName: string;
  colGrp: string;
  colColor: string;
  colDesc: string;
  dateType: string;
};

type InputDataType = {
  label: string;
  class: string;
  name: string;
  time1: string;
  time2: string;
  status: string;
  starting_time: number;
  ending_time: number;
  id: number;
  grpname: string;
  desc: string;
  color: string;
  group: number;
  lane: number;
};

function Timeline() {
  // ** declare state **
  // display control
  const [dispType, setDispType] = useState("Import");

  // parameter for sidebar -> separate other component
  const [drawerOpenFlag, setDrawerOpenFlag] = useState(false);

  // inputDate更新前に描画を行うとエラーが発生するため、描画処理を停止するフラグ
  // const [drawFlag, setDrawFlag] = useState(true);

  // parameter convert input data
  const [colSelector, setColSelector] = useState<Array<ColorOption>>(ColSelectDef);
  const [colorSelected, setColorSelected] = useState<Array<ColorOption>>(ColorSelectDef);
  const [convDef, setConvDef] = useState<ConvDefType>(ConvDef);

  // about input data
  const [inputData, setInputData] = useState<Array<InputDataType>>(InputDataDef);
  const [originData, setOriginData] = useState<Array<InputDataType>>(InputDataDef);
  const [minStart, setMinStart] = useState<number>(0);

  // Constant
  const drawerWidth = 240;

  console.log(
    "=== RENDER TIMELINE START  :",
    new Date().toLocaleTimeString("it-IT") + "." + new Date().getMilliseconds(),
    "===",
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopBar
          drawerWidth={drawerWidth}
          open={drawerOpenFlag}
          setOpen={setDrawerOpenFlag}
        />
        <SideBar
          convDef={convDef}
          drawerWidth={drawerWidth}
          inputData={inputData}
          open={drawerOpenFlag}
          setColSelector={setColSelector}
          setDispType={setDispType}
          // setDrawFlag={setDrawFlag}
          setInputData={setInputData}
          setMinStart={setMinStart}
          setOriginData={setOriginData}
          setOpen={setDrawerOpenFlag}
        />

        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
          <DrawerHeader />
          {dispType === "Draw" && (
            // && drawFlag
            <PlotArea
              colorSelected={colorSelected}
              colSelector={colSelector}
              convDef={convDef}
              inputData={inputData}
              minStart={minStart}
              originData={originData}
              setColorSelected={setColorSelected}
              setConvDef={setConvDef}
              // setDrawFlag={setDrawFlag}
              setInputData={setInputData}
            />
          )}
          {dispType === "Import" && (
            <ImportArea
              convDef={convDef}
              colorSelected={colorSelected}
              colSelector={colSelector}
              inputData={inputData}
              originData={originData}
              setColorSelected={setColorSelected}
              setConvDef={setConvDef}
              // setDrawFlag={setDrawFlag}
            />
          )}

          {dispType === "DB" && (
            <InputDB
              onCloseClick={setDispType}
              setColSelector={setColSelector}
              setInputData={setInputData}
              setOriginData={setOriginData}
            />
          )}

          {dispType === "HTTP" && (
            <InputHttp
              onCloseClick={setDispType}
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
