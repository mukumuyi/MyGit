function timeline(frameTimespan,g_height) {

  // basic parameters
  const width0 = 1300;
  const height0 = 500;
  const px0 = 100;
  const py0 = 50;

  // part-group parameters
  const width1 = width0 - px0;
  const height1 = height0 - py0;
  const graphData = [
    {
      area: "xAxis",px: px0,py: 0,clipPath: {
        x: 0,y: 0,width: width1,height: py0,
      },
    },
    {
      area: "yAxis",px: 0,py: py0,clipPath: {
        x: 0,y: 0,width: px0,height: height1,
      },
    },
    {
      area: "plotArea",px: px0,py: py0,clipPath: {
        x: 0,y: 0,width: width1,height: height1,
      },
    },
  ];

  // File parameter
  const requestURL = document.getElementById('FileDirectory').value;
  console.log(requestURL)
  // Local
  // const requestURL = "http://127.0.0.1:5500/data/trialdata.csv";

  // graph parameter
  if (!frameTimespan) {
    frameTimespan = 21600000; // 1フレームの時間（6時間分）
  }
  if (!g_height) {
    g_height = 20; // 1フレームの時間（6時間分）
  }
  var g_margin = g_height / 4; // 1フレームの時間（6時間分）
  var xAxisTimespan = frameTimespan / 6 ; // x軸の1目盛りの時間（1時間分）
  var scaleFactor = (1 / frameTimespan) * width0;

  // append SVG
  const svg = d3
    .select("div#graph")
    .append("svg")
    .attr("width", width0)
    .attr("height", height0);

  // append tooltip
  const tooltip = d3.select("div#graph").append("div").attr("class", "tooltip");

  // append part-groups
  const groups = svg
    .selectAll("g")
    .data(graphData)
    .enter()
    .append("g")
    .attr("id", (d) => `${d.area}-group`)
    .attr("transform", (d) => `translate(${d.px},${d.py})`);

  const selectGroup = (key) => d3.select(`g#${key}-group`);
  const selectClippedGroup = (key) => selectGroup(key).select("g");

  // drag event handler
  const dragCoord = (coord, dx, dy) => {
    const cg = selectClippedGroup(coord);
    // update cx/cy in binded data
    cg.selectAll("circle.marker-circle")
      .attr("cx", (d) => (d.cx += dx))
      .attr("cy", (d) => (d.cy += dy));
    // rewrite attributes with updated cx/cy
    cg.selectAll("rect.marker-rect")
      .attr("x", (d) => d.barX())
      .attr("y", (d) => d.barY());
    cg.selectAll("text.marker-label")
      .attr("x", (d) => d.labelX())
      .attr("y", (d) => d.labelY());
  };
  const dragAllMarker = (dx, dy) => {
    dragCoord("xAxis", dx, 0); // move horizontal
    dragCoord("yAxis", 0, dy); // move vertical
    dragCoord("plotArea", dx, dy);
  };

  const dragHandlerOf = {
    xAxis: () => dragAllMarker(d3.event.dx, 0),
    yAxis: () => dragAllMarker(0, d3.event.dy),
    plotArea: () => dragAllMarker(d3.event.dx, d3.event.dy),
  };

  function loadCSVData() {
    // CSVファイルを取得
    let csv = new XMLHttpRequest();
    let csvArray = []; // 配列を定義
    
    csv.open("GET", requestURL, false); // CSVファイルへのパス
    
    try {      // csvファイル読み込み失敗時のエラー対応
      csv.send(null);
    } catch (err) {     
      console.log(err);
    }
    
    let lines = csv.responseText.split(/\r\n|\n/); // 改行ごとに配列化
    let header = lines[0].split(","); // 先頭行をヘッダとして格納
    lines.shift(); // 先頭行の削除

    csvArray = lines.map((item) => {
      let datas = item.split(",");
      let result = {};
      for (const index in datas) {
        let key = header[index];
        result[key] = datas[index];
      }
      return result;
    });
    return csvArray;
  }

  function makexAxisArray(startingTime, endingTime, span, scale) {
    const recordsArray = [];
    var currentTime = startingTime;
    while (currentTime <= endingTime) {// 時間と分を取得
      const currentTimeD = new Date(currentTime)
      const hours = currentTimeD.getHours();
      const minutes = currentTimeD.getMinutes();
      // スパンごとにループ
      var record = {
        // レコードを作成
        coord: "xAxis",
        cx: (currentTime - startingTime) * scale,
        cy: 50,
        r: 10,        
        label: formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
      };
      recordsArray.push(record); // レコードを配列に追加
      currentTime += span; // 次のスパンへ進める
    }
    return recordsArray;
  }

  function makeyAxisArray(inputArray) {
    const result = {};

    for (const item of inputArray) {
      // 配列をループ
      const group = parseInt(item.group);
      const lane = parseInt(item.lane);
      const label = item.label;

      if (!result[group] || lane < result[group].lane) {
        // Groupごとに最小のkeyの値を更新
        result[group] = {
          group: group,
          lane: lane,
          label: label,
        };
      }
    }
    const resultArray = Object.values(result); // 結果を配列に変換
    return resultArray;
  }


  //  Main Proc Start
  //  Input 

  csvArray = [
    {
        "label": "person_a",
        "class": "a",
        "status": "Run",
        "name": "test1",
        "color": "green",
        "group": "1",
        "lane": "1",
        "starting_time": "1703808000000",
        "ending_time": "1703814500000"
    },
    {
        "label": "person_a",
        "class": "a",
        "status": "Wait",
        "name": "test2",
        "color": "blue",
        "group": "1",
        "lane": "1",
        "starting_time": "1703850510000",
        "ending_time": "1703870010000"
    },
    {
        "label": "person_a",
        "class": "a",
        "status": "Fix",
        "name": "test5",
        "color": "red",
        "group": "1",
        "lane": "2",
        "starting_time": "1703809000000",
        "ending_time": "1703819900000"
    },
    {
        "label": "person_b",
        "class": "b",
        "status": "Run",
        "name": "test3",
        "color": "pink",
        "group": "2",
        "lane": "3",
        "starting_time": "1703807000000",
        "ending_time": "1703808990000"
    },
    {
        "label": "person_c",
        "class": "c",
        "status": "Run",
        "name": "test4",
        "color": "yellow",
        "group": "3",
        "lane": "4",
        "starting_time": "1703808000000",
        "ending_time": "1703810000000"
    }
]
  csvArray = loadCSVData();  // Comment Out For Offline *******

  //  Make Parameter From Input

  const minTimeStamp =
    Math.floor(
      Math.min(
        ...csvArray
          .map((item) => parseInt(item.starting_time))
          .filter((value) => !isNaN(value))
      ) / 3600000
    ) * 3600000;
    
  const maxTimeStamp =
    Math.ceil(
      Math.max(
        ...csvArray
          .map((item) => parseInt(item.ending_time))
          .filter((value) => !isNaN(value))
      ) / 3600000
    ) * 3600000;

  const plotArray = csvArray.map((item) => ({
    ...item,
    coord: "plotArea",
    length: (item.ending_time - item.starting_time) * scaleFactor,
    cx: (item.starting_time - minTimeStamp) * scaleFactor,
    cy: g_margin * item.group + g_height * (item.lane - 1),
    r: 10, // constant: radius of marker circle
    barX: function () {
      return this.cx;
    },
    barY: function () {
      return this.cy;
    },
    barColor: document.getElementById(item[document.getElementById('ColorColumn').value]).value,
    labelX: function () {
      return this.cx;
    },
    labelY: function () {
      return this.cy + (this.coord === "xAxis" ? 0 : g_height);
    },
  }));

  const xAxisArray = makexAxisArray(
    minTimeStamp,
    maxTimeStamp,
    xAxisTimespan,
    scaleFactor
  ).map((item) => ({
    ...item,
    labelX: function () {
      return this.cx;
    },
    labelY: function () {
      return this.cy + (this.coord === "xAxis" ? 0 : g_height);
    },
  }));

  const yAxisArray = makeyAxisArray(plotArray).map((item) => ({
    ...item,
    coord: "yAxis",
    cx: 0,
    cy: g_margin * item.group + g_height * (item.lane - 1),
    r: 10,
    labelX: function () {
      return this.cx;
    },
    labelY: function () {
      return this.cy + g_height
    },
  }));

  const mergedArray = [...plotArray, ...xAxisArray, ...yAxisArray];

  groups
    .append("defs")
    .append("SVG:clipPath")
    .attr("id", (d) => `${d.area}-clip`)
    .append("rect")
    .attr("x", (d) => d.clipPath.x)
    .attr("y", (d) => d.clipPath.y)
    .attr("width", (d) => d.clipPath.width)
    .attr("height", (d) => d.clipPath.height);

  // Add rect to catch drag-event with drag event handler
  // * size of drag-handler is same as clipPath rect.
  // * drag-handler is fixed: out of clipped-group.
  groups
    .append("rect")
    .attr("class", (d) => `${d.area} drag-handler`)
    .attr("x", (d) => d.clipPath.x)
    .attr("y", (d) => d.clipPath.y)
    .attr("width", (d) => d.clipPath.width)
    .attr("height", (d) => d.clipPath.height);

  groups
    .append("g")
    .attr("class", "clipped-group")
    .attr("clip-path", (d) => `url(#${d.area}-clip)`);

  // draw markers
  for (const coord of ["svg", "xAxis", "yAxis", "plotArea"]) {
    // const coordMarkers = markers.filter(d => d.coord === coord)
    const coordMarkers = mergedArray.filter((d) => d.coord === coord);
    const g = coord === "svg" ? svg : selectClippedGroup(coord);
    g.selectAll("circle.marker-circle")
      .data(coordMarkers)
      .enter()
      .append("circle")
      .attr("class", (d) => `${d.coord} marker-circle`)
      .attr("cx", (d) => d.cx)
      .attr("cy", (d) => d.cy)
      .attr("r", (d) => d.r)
      .attr("stroke", "none")
      .attr("fill", "none");
    if (coord === "plotArea") {
      g.selectAll("rect.marker-rect")
        .data(coordMarkers)
        .enter()
        .append("rect")
        .attr("class", (d) => `${d.coord} marker-rect`)
        .attr("x", (d) => d.barX())
        .attr("y", (d) => d.barY())
        .attr("height", g_height)
        .attr("width", (d) => d.length)
        .attr("fill", (d) => d.barColor)
        // tooltipを表示内容の制御。for tooltip002
        .on("mouseover", function (d) {
          starting_time = new Date(parseInt(d.starting_time));
          ending_time = new Date(parseInt(d.ending_time));
          tooltip
            .style("visibility", "visible")
            .html(
              "start : " +
                starting_time.toLocaleDateString() +
                " " +
                starting_time.toLocaleTimeString("it-IT") +
                "<br>end : " +
                ending_time.toLocaleDateString() +
                " " +
                ending_time.toLocaleTimeString("it-IT") +
                "<br>name : " +
                d.name +
                "<br>status : " +
                d.status 
            );
        })
        .on("mousemove", function (d) {
          tooltip
            .style("top", d3.event.pageY - 20 + "px")
            .style("left", d3.event.pageX + 10 + "px");
        })
        .on("mouseout", function (d) {
          tooltip.style("visibility", "hidden");
        });
    }
    if (coord === "xAxis" || coord === "yAxis") {
      g.selectAll("text.marker-label")
        .data(coordMarkers)
        .enter()
        .append("text")
        .attr("class", (d) => `${d.coord} marker-label `)
        .attr("x", (d) => d.labelX())
        .attr("y", (d) => d.labelY())
        .text((d) => d.label);
    }
  }

  Object.keys(dragHandlerOf).forEach((area) => {
    selectGroup(area)
      .select("rect.drag-handler")
      .call(d3.drag().on("drag", dragHandlerOf[area]));
  });
}

// RadioBottomの値で表示期間を変える。
function getSelectedValue() {
  var formTimeSpan = document.getElementById("ChangeTimeSpan");
  var formBarWidth = document.getElementById("ChangeBarWidth");
  var selectedTimeSpan = null;
  var selectedBarWidth = null;
  for (var i = 0; i < formTimeSpan.TimeSpan.length; i++) {              // Loop through radio buttons to find the selected one
    if (formTimeSpan.TimeSpan[i].checked) {
      selectedTimeSpan = parseInt(formTimeSpan.TimeSpan[i].value);
      break;
    }
  }

  for (var i = 0; i < formBarWidth.BarWidth.length; i++) {              // Loop through radio buttons to find the selected one
    if (formBarWidth.BarWidth[i].checked) {
      selectedBarWidth = parseInt(formBarWidth.BarWidth[i].value);
      break;
    }
  }

  if (selectedTimeSpan !== null || selectedBarWidth !== null) {    
    var timeline1Element = document.getElementById("graph");    // id="timeline1"の要素を取得
    if (timeline1Element) {                                     // もし要素が存在する場合は削除
      timeline1Element.innerHTML = "";
    } else {
      console.error("Element with id 'timeline1' not found.");
    }
    timeline(selectedTimeSpan,selectedBarWidth);
  } else {
    alert("Please select a radio bottom");
  }
}

var TempToday = new Date();
console.log(TempToday.toLocaleTimeString("it-IT"))

timeline();
