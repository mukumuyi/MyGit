import React from "react";
import Card from "./Card";
import Contacts from "../contacts";
import Tooltip from "./Tooltip";

function Trial() {
  return (
    <div className="container">
      <p>ここは試し用のページです</p>
      <button>TEST</button>
      <form id="radioTimeSpan">
      <group class="inline-radio">
  <div><input type="radio" name="TimeSpan" /><label>1時間</label></div>
  <div><input type="radio" name="TimeSpan" /><label>2時間</label></div>
  <div><input type="radio" name="TimeSpan" /><label>6時間</label></div>
  <div><input type="radio" name="TimeSpan" /><label>12時間</label></div>
  <div><input type="radio" name="TimeSpan" /><label>1日</label></div>
  <div><input type="radio" name="TimeSpan" /><label>2日</label></div>
</group>
</form>
<form id="radioTimeSpan">
        表示期間
        <input
          type="radio"
          name="TimeSpan"
          value="3600000"
          id="Span1h"
          onchange=""
        />
        <label for="Span1h">1時間</label>
        <input
          type="radio"
          name="TimeSpan"
          value="21600000"
          id="Span6h"
          onchange=""
        />
        <label for="Span6h">6時間</label>
        <input
          type="radio"
          name="TimeSpan"
          value="43200000"
          id="Span12h"
          onchange=""
        />
        <label for="Span12h">12時間</label>
        <input
          type="radio"
          name="TimeSpan"
          value="86400000"
          id="Span1d"
          onchange=""
        />
        <label for="Span1d">1日</label>
        <input
          type="radio"
          name="TimeSpan"
          value="172800000"
          id="Span2d"
          onchange="getSelectedValue()"
          checked
        />
        <label for="Span2d">2日</label>
      </form>
      <p>↓Trial</p>
      <p>Reactで初めてのTooltip実装</p>
      <div>
        <Tooltip content="Tooltipに表示させたい内容をここに記述します">
          <button>Tooltip</button>
        </Tooltip>
        <div>ここから文書は続きます。</div>
      </div>
    </div>
  );
}

export default Trial;
