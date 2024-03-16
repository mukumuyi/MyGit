function timeline(csvArray,frameTimespan,g_height) {

  function makexAxisArray(startingTime, endingTime, span, scale) { //横軸のラベル用データ作成 
    const recordsArray = [];
    let currentTime = startingTime;
    let record
    while (currentTime <= endingTime) {// 時間と分を取得
      const currentTimeD = new Date(currentTime);
      const dates = currentTimeD.toLocaleDateString("ja-JP",{month: "numeric",day: "numeric"});
      const hours = currentTimeD.getHours();
      const minutes = currentTimeD.getMinutes();
      // スパンごとにループ
      if((hours * 60 + minutes) % (xAxisTimespan/10000) == 0 || currentTime == startingTime){
        record = {
          // レコードを作成
          coord: "xAxis0",
          cx: (currentTime - startingTime) * scale + tx,
          cy: 25,
          r: 10,
          label: formattedTime = `${dates}`,
          labelX: function () {
            return this.cx;
          },
          labelY: function () {
            return this.cy ;
          },
        };
        recordsArray.push(record); // レコードを配列に追加
      }
      
      record = {
        // レコードを作成
        coord: "xAxis1",
        cx: (currentTime - startingTime) * scale + tx,
        cy: 25,
        r: 10,
        label: formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`,
        labelX: function () {
          return this.cx;
        },
        labelY: function () {
          return this.cy ;
        },
        lineX1: function () {
          return this.cx;
        },
        lineX2: function () {
          return this.cx; 
        },
        lineY1: function () {
          return 0;
        },
        lineY2: function () {
          return height0;
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
            return this.cy + g_height;
          },
          lineX1: function () {
            return 0;
          },
          lineX2: function () {
            return width0;
          },
          lineY1: function () {
            return this.group !== 1 ? this.cy - g_margin / 2: 0; 
          },
          lineY2: function () {
            return this.group !== 1 ? this.cy - g_margin / 2: 0; 
          },
        };
      }
    }
    const resultArray = Object.values(recordsArray); // 結果を配列に変換
    return resultArray;
  }

  // basic parameters
  const width0 = 1350;
  const height0 = 650;
  const px0 = 100;
  const py1 = 25;
  const py0 = 50;

  // part-group parameters
  const width1 = width0 - px0;
  const height1 = height0 - py0;
  const graphData = [
    {
      area: "xAxis0",px: px0,py: 0,clipPath: {
        x: 0,y: 0,width: width1,height: py1,
      },
    },
    {
      area: "xAxis1",px: px0,py: py1,clipPath: {
        x: 0,y: 0,width: width1,height: py0 - py1,
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
    cg.selectAll("line.marker-line")
      .attr("x1", (d) => d.lineX1())
      .attr("x2", (d) => d.lineX2())
      .attr("y1", (d) => d.lineY1())
      .attr("y2", (d) => d.lineY2());
  };

  const dragAllMarker = (dx, dy) => {
    if(tx + dx > 0 && dx >0 ){dx = 0}
    if(ty + dy > 0 && dy >0 ){dy = 0}
    dragCoord("xAxis0", dx, 0); // move horizontal
    dragCoord("xAxis1", dx, 0); // move horizontal
    dragCoord("yAxis", 0, dy); // move vertical
    dragCoord("plotArea", dx, dy);
    tx += dx; // 画面を開いてからのトータルの移動量
    ty += dy; // 画面を開いてからのトータルの移動量
    $("#xTotalMove").val(tx)
    $("#yTotalMove").val(ty)
  };

  const dragHandlerOf = {
    xAxis0: () => dragAllMarker(d3.event.dx, 0),
    xAxis1: () => dragAllMarker(d3.event.dx, 0),
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
    barColor: (item[$('#SearchItem').get(0).value].match(RegExp("^" + $('#SearchText').get(0).value.replace(/\*/g, ".*") + "$")) ? "red" : $("#" + $("#ColorPallette > ." + item[$('#ColorColumn').get(0).value]).get(0).id).get(0).value), 
    labelX: function () {
      return this.cx;
    },
    labelY: function () {
      return this.cy;
    },
  }));

  const xAxis0Array = makexAxisArray(minTimeStamp,maxTimeStamp,xAxisTimespan,scaleFactor);
  const yAxisArray = makeyAxisArray(plotArray,g_margin,g_height);
  const mergedArray = [...plotArray, ...xAxis0Array, ...yAxisArray];

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
  for (const coord of ["svg", "xAxis0", "xAxis1", "yAxis", "plotArea"]) {
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
    
      if (coord === "xAxis1" || coord === "yAxis") {
        g.selectAll("line.marker-line")
        .data(coordMarkers)
        .enter()
        .append("line")
        .attr("class", (d) => `${d.coord} marker-line `)
        .attr("x1", (d) => d.lineX1()) // 始点の x 座標
        .attr("y1", (d) => d.lineY1()) // 始点の y 座標
        .attr("x2", (d) => d.lineX2()) // 終点の x 座標
        .attr("y2", (d) => d.lineY2()) // 終点の y 座標
        .attr("stroke",$("#LineStroke").get(0).value);
      }   
    if (coord === "plotArea") {
      g.selectAll("line.marker-line")
        .data(mergedArray.filter((d) => d.coord === "yAxis" || d.coord === "xAxis1"))
        .enter()
        .append("line")
        .attr("class", (d) => `plotArea marker-line `)
        .attr("x1", (d) => d.lineX1()) // 始点の x 座標
        .attr("y1", (d) => d.lineY1()) // 始点の y 座標
        .attr("x2", (d) => d.lineX2()) // 終点の x 座標
        .attr("y2", (d) => d.lineY2()) // 終点の y 座標
        .attr("stroke",$("#LineStroke").get(0).value);

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
                "<br>" + $('#GroupColumn').get(0).value + " : " +
                d[$('#GroupColumn').get(0).value] +
                "<br>" + $('#RecordColumn').get(0).value + " : " +
                d[$('#RecordColumn').get(0).value] +
                "<br>" + $('#ColorColumn').get(0).value + " : " +
                d[$('#ColorColumn').get(0).value] +
                "<br>" + $('#CommentColumn').get(0).value + " : " +
                d[$('#CommentColumn').get(0).value] 
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
    if (coord === "xAxis0" || coord === "xAxis1" || coord === "yAxis") {
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
