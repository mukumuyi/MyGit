import React, { useState ,useEffect} from "react";
import PlotArea from "./PlotArea";
import Radiobutton from "./Radiobutton";

// 実装したいこと　～Googleマップ風のTimelineチャートを作る。～
// 1.SVGを一枚にする。
// 3.線幅、描画期間
// 4.色選択、検索ウィンドウ、フィルタ
// 5.軸変更
// 
// 3.コンポーネントの分割をする。
// 4.データ選択画面を追加する。（読込形式と指定、カラムの紐づけ、）
// 5.画面遷移を実装する。
// データ選択画面
// 　-> Timeline画面
// 
// 機能拡張
// 2.画面の表示設定メニューを追加する。
// 6.ズームスライダーの実装

function Timeline(props) {
  const [isParmPanelShow ,setIsParmPanelShow] = useState({TimeSpan:false,BarWidth:false,})

  const [screenWidth, setScreenWidth] = useState(document.documentElement.clientWidth);
  const [screenHeight, setScreenHeight] = useState(document.documentElement.clientHeight);
  
  const [timeSelected, setTimeSelected] = useState("43200000");
  const [widthSelected, setWidthSelected] = useState("12");

  const timeSpan = [
    { id: 1, name: "Span1h", value: "3600000", label: "1時間" },
    { id: 2, name: "Span2h", value: "7200000", label: "2時間" },
    { id: 3, name: "Span6h", value: "21600000", label: "6時間" },
    { id: 4, name: "Span12h", value: "43200000", label: "12時間" },
    { id: 5, name: "Span1d", value: "86400000", label: "1日" },
    { id: 6, name: "Span2d", value: "172800000", label: "2日" },
  ];

  const barWidth = [
    { id: 1, name: "BarThick", value: "40", label: "太" },
    { id: 2, name: "BarRegular", value: "20", label: "標準" },
    { id: 3, name: "BarThin", value: "12", label: "細" },
    { id: 4, name: "BarThinest", value: "8", label: "超細" },
  ];

  const onChangeTime = (e) => {
    setTimeSelected(e.target.value);
  };
  
  const onChangeWidth = (e) => {  
    setWidthSelected(e.target.value);
  };

  function overTimeSpan() {
    setIsParmPanelShow({TimeSpan:true,BarWidth:false,});
  }

  function overBarWidth() {
    setIsParmPanelShow({TimeSpan:false,BarWidth:true,});
  }

  function outParmPanel() {
    setIsParmPanelShow({TimeSpan:false,BarWidth:false,});
  };

function handleResize(){
  console.log("Resize to ",document.documentElement.clientWidth);
  setScreenWidth(document.documentElement.clientWidth);
  setScreenHeight(document.documentElement.clientHeight);
}

  window.addEventListener('resize', handleResize);

  return (
        <div>
          <div className="param-panel" style={{position:"absolute"}}>
            <div className="inline-header">
              <label onMouseOver={overTimeSpan}>表示期間</label>
              <label onMouseOver={overBarWidth}>バーの幅</label>
            </div>
            {isParmPanelShow.TimeSpan && (
              <div className="container8">
                <form className="inline-radio">
                  {timeSpan.map((item) => {
                    return (
                      <Radiobutton
                        key={item.id}
                        item={item}
                        onChange={onChangeTime}
                        selected={timeSelected}
                      />
                    );
                  })}
                </form>
              </div>
            )}
            {isParmPanelShow.BarWidth && (
              <div className="container8">
                <form className="inline-radio">
                  {barWidth.map((item) => {
                    return (
                      <Radiobutton
                        key={item.id}
                        item={item}
                        onChange={onChangeWidth}
                        selected={widthSelected}
                      />
                    );
                  })}
                </form>
              </div>
            )}
          </div>
          <PlotArea
            width={screenWidth}
            height={screenHeight}
            fontSize="20"
            gHeight={widthSelected}
            frameTimespan={timeSelected}
            style={{position: "absolute" ,left:"0" ,top:"0"}}
          />
        </div>
      )}

export default Timeline;
