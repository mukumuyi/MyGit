import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Main from "./Main";
import Trial from "./Trial";
import PlotArea from "./PlotArea";
import ContactList from "./ContactList";
import Radiobutton from "./Radiobutton";

function App(props) {
  const [dispType, setDispType] = useState("timeline");
  const [resistState, setResistState] = useState(false);
  const [parmPanel, setParmPanel] = useState(true);
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

  const onClick = (x) => {
    setDispType(x);
  };

  const onChangeTime = (e) => {
    setTimeSelected(e.target.value);
  };
  
  const onChangeWidth = (e) => {
    setWidthSelected(e.target.value);
  };

  console.log(dispType);

  return (
    <div>
      {/* <Header onClick={onClick} /> */}
      {dispType === "login" && (
        <Login flag={resistState} submitBottonClick={handleLogInButtonClick} />
      )}
      {dispType === "main" && <Main />}
      {dispType === "timeline" && (
        <div>
          {parmPanel && (
            <div className="panel">
              <div className="container8">
                <form className="inline-radio">表示期間
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
                <form className="inline-radio">バーの幅
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
            </div>
          )}
          <PlotArea
            width="1350"
            height="650"
            fontSize="20"
            gHeight={widthSelected}
            frameTimespan={timeSelected}
          />
        </div>
      )}
      {dispType === "contact" && <ContactList />}
      {dispType === "trial" && <Trial />}
      <Footer />
    </div>
  );
}

export default App;
