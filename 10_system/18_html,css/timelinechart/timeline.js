function timeline(csvArray,frameTimespan,g_height) {

  function makexAxisArray(startingTime, endingTime, span, scale) { //横軸のラベル用データ作成 
    const recordsArray = [];
    let currentTime = startingTime;
    while (currentTime <= endingTime) {// 時間と分を取得
      const currentTimeD = new Date(currentTime);
      const dates = currentTimeD.toLocaleDateString("ja-JP",{month: "numeric",day: "numeric"});
      const hours = currentTimeD.getHours();
      const minutes = currentTimeD.getMinutes();
      // スパンごとにループ
      let record = {
        // レコードを作成
        coord: "xAxis",
        cx: (currentTime - startingTime) * scale + tx,
        cy: 50,
        r: 10,
        label: formattedTime = `${dates} \n ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`,
        labelX: function () {
          return this.cx;
        },
        labelY: function () {
          return this.cy ;
        },
      };
      recordsArray.push(record); // レコードを配列に追加
      currentTime += span; // 次のスパンへ進める
    }
    return recordsArray;
  }

  function makeyAxisArray(inputArray,g_margin,g_height) { //縦軸のラベル用データ作成 
    const recordsArray = {};
    for (const item of inputArray) {
      // 配列をループ
      const group = parseInt(item.group);
      const lane = parseInt(item.lane);
      const label = item[$('#GroupColumn').get(0).value];
      if (!recordsArray[group] || lane < recordsArray[group].lane) {
        // Groupごとに最小のkeyの値を更新
        recordsArray[group] = {
          group: group,
          lane: lane,
          label: label,
          coord: "yAxis",
          cx: 0,
          cy: g_margin * group + g_height * (lane - 1) + ty,
          r: 10,
          labelX: function () {
            return this.cx;
          },
          labelY: function () {
            return this.cy + g_height
          },
        };
      }
    }
    const resultArray = Object.values(recordsArray); // 結果を配列に変換
    return resultArray;
  }

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

  // graph parameter
  if (!frameTimespan) {
    frameTimespan = 21600000; // 1フレームの時間（6時間分）
  }
  if (!g_height) {
    g_height = 20; // 1フレームの時間（6時間分）
  }
  let g_margin = g_height / 4; 
  let xAxisTimespan = frameTimespan / 6 ; // x軸の1目盛りの時間（1時間分）
  let scaleFactor = (1 / frameTimespan) * width0;

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
    if(tx + dx > 0 && dx >0){dx = 0}
    if(ty + dy > 0 && dy >0){dy = 0}
    dragCoord("xAxis", dx, 0); // move horizontal
    dragCoord("yAxis", 0, dy); // move vertical
    dragCoord("plotArea", dx, dy);
    tx += dx; // 画面を開いてからのトータルの移動量
    ty += dy; // 画面を開いてからのトータルの移動量
    $("#xTotalMove").val(tx)
    $("#yTotalMove").val(ty)
  };

  const dragHandlerOf = {
    xAxis: () => dragAllMarker(d3.event.dx, 0),
    yAxis: () => dragAllMarker(0, d3.event.dy),
    plotArea: () => dragAllMarker(d3.event.dx, d3.event.dy),
  };

  //  Main Proc Start
  //  Input 
  // csvArray = loadCSVData();  // Comment Out For Offline *******
  // csvArray = convertData(csvArray);
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
    cx: (item.starting_time - minTimeStamp) * scaleFactor + tx,
    cy: g_margin * item.group + g_height * (item.lane - 1) +ty,
    r: 10, // constant: radius of marker circle
    barX: function () {
      return this.cx;
    },
    barY: function () {
      return this.cy;
    },
    barColor: (item[$('#SearchItemSelector').get(0).value] === $("#SearchText").get(0).value ? "red" : $("#" + $("#ColorPallette > ." + item[$('#ColorColumn').get(0).value]).get(0).id).get(0).value ),
    // barColor: (1 === 1 ? "#e66465" : $("#" + $("#ColorPallette > ." + item[$('#ColorColumn').get(0).value]).get(0).id).get(0).value ),
    labelX: function () {
      return this.cx;
    },
    labelY: function () {
      return this.cy + (this.coord === "xAxis" ? 0 : g_height);
    },
  }));

  const xAxisArray = makexAxisArray(minTimeStamp,maxTimeStamp,xAxisTimespan,scaleFactor);
  const yAxisArray = makeyAxisArray(plotArray,g_margin,g_height);

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
        .attr("stroke",$("#RectStroke").get(0).value)
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
        // .html((d) => {
        //   // ラベルを改行して表示する
        //   const lines = d.label.split('\n');
        //   return lines.map((line, index) => `<tspan x="${d.labelX()}" dy="${index === 0 ? 0 : '1.2em'}">${line}</tspan>`).join('');
        // });
    }
  }

  Object.keys(dragHandlerOf).forEach((area) => {
    selectGroup(area)
      .select("rect.drag-handler")
      .call(d3.drag().on("drag", dragHandlerOf[area]));
  });
}


// const rectStroke  = $("#RectStroke").get(0).value;
// const groupColumn = $("#GroupColumn").get(0).value;
// let TempToday = new Date();
// let csvArray = []

// console.log(TempToday.toLocaleTimeString("it-IT"))

// //  Input 
// csvArray = loadCSVData();  // Comment Out For Offline *******
// csvArray = convertData(csvArray);
// timeline(csvArray);
