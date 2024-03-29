(function () {
  d3.timeline = function () {
    var DISPLAY_TYPES = ["circle", "rect"];
    var hover = function () {},
      mouseover = function () {},
      mouseout = function () {},
      click = function () {},
      scroll = function () {},
      labelFunction = function (label) {
        return label;
      },
      navigateLeft = function () {},
      navigateRight = function () {},
      orient = "bottom",
      width = 1000,
      height = 500,
      rowSeparatorsColor = null, // "black",
      backgroundColor = null,
      colorCycle = d3.schemeCategory10,
      colorPropertyName = null,
      display = "rect",
      labelMargin = 0,
      margin = { left: 30, right: 30, top: 30, bottom: 30 },
      beginning = 0,
      ending = 0,
      frametimespan = 21600000,
      stacked = false,
      timeIsRelative = false,
      fullLengthBackgrounds = true,
      itemHeight = 20,
      itemMargin = 5,
      navMargin = 60,
      showTodayFormat = {
        marginTop: 25,
        marginBottom: 0,
        width: 1,
        color: colorCycle,
      },
      showTimeAxis = true,
      showAxisTop = true,
      showTodayLine = false,
      showBorderLine = false,
      showBorderFormat = {
        marginTop: 25,
        marginBottom: 0,
        width: 1,
        color: colorCycle,
      },
      showAxisHeaderBackground = true,
      showAxisNav = false,
      showAxisCalendarYear = false,
      axisBgColor = "white",
      // 軸の設定
      tickFormat = {
        //format: d3.time.format("%Y/%m/%d %H:%M"),
        tickTime: d3.time.hours,
        tickInterval: 1,
        tickSize: 6,
        tickValues: null,
      },
      timeAxisTick = false,
      timeAxisTickFormat = { stroke: "stroke-dasharray", spacing: "4 10" },
      rotateTicks = 0,
      chartData = {};
    // tooltipを作成する。for tooltip001
    var tooltip = d3.select("#mainbody").append("div").attr("class", "tooltip");

    var tickformatDT = function (date) {
      var formatTime = d3.time.format("%H:%M");
      var formatDateAndTime = d3.time.format("%Y-%m-%d %H:%M");
      // 0時の場合は日付と時刻を表示、それ以外は時刻のみを表示
      return date.getHours() % (frametimespan / 3600000) === 0
        ? formatDateAndTime(date)
        : formatTime(date);
    };

    var appendTimeAxis = function (g, xAxis, yPosition) {
      if (showAxisHeaderBackground) {
        appendAxisHeaderBackground(g, 0, 0);
      }
      if (showAxisNav) {
        appendTimeAxisNav(g);
      }
      var axis = g
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 0 + "," + yPosition + ")")
        .call(xAxis);
    };

    var appendTimeAxisCalendarYear = function (nav) {
      var calendarLabel = beginning.getFullYear();
      if (beginning.getFullYear() != ending.getFullYear()) {
        calendarLabel = beginning.getFullYear() + "-" + ending.getFullYear();
      }
      nav
        .append("text")
        .attr("transform", "translate(" + 20 + ", 0)")
        .attr("x", 0)
        .attr("y", 14)
        .attr("class", "calendarYear")
        .text(calendarLabel);
    };

    var appendTimeAxisNav = function (g) {
      var timelineBlocks = 6;
      var leftNavMargin = margin.left - navMargin;
      var incrementValue = (width - margin.left) / timelineBlocks;
      var rightNavMargin = width - margin.right - incrementValue + navMargin;
      var nav = g
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0, 20)");
      if (showAxisCalendarYear) {
        appendTimeAxisCalendarYear(nav);
      }
      nav
        .append("text")
        .attr("transform", "translate(" + leftNavMargin + ", 0)")
        .attr("x", 0)
        .attr("y", 14)
        .attr("class", "chevron")
        .text("<")
        .on("click", function () {
          return navigateLeft(beginning, chartData);
        });
      nav
        .append("text")
        .attr("transform", "translate(" + rightNavMargin + ", 0)")
        .attr("x", 0)
        .attr("y", 1)
        .attr("class", "chevron")
        .text(">")
        .on("click", function () {
          return navigateRight(ending, chartData);
        });
    };

    var appendAxisHeaderBackground = function (g, xAxis, yAxis) {
      g.insert("rect")
        .attr("class", "row-green-bar")
        .attr("x", xAxis)
        .attr("width", width)
        .attr("y", yAxis)
        .attr("height", itemHeight)
        .attr("fill", axisBgColor);
    };

    var appendTimeAxisTick = function (g, xAxis, maxStack) {
      g.append("g")
        .attr("class", "axis")
        .attr(
          "transform",
          "translate(" +
            0 +
            "," +
            (margin.top + (itemHeight + itemMargin) * maxStack) +
            ")"
        )
        .attr(timeAxisTickFormat.stroke, timeAxisTickFormat.spacing)
        .call(
          xAxis
            .tickFormat("")
            .tickSize(
              -(margin.top + (itemHeight + itemMargin) * (maxStack - 1) + 3),
              0,
              0
            )
        );
    };

    var appendBackgroundBar = function (yAxisMapping, index, g, data, datum) {
      var greenbarYAxis =
        (itemHeight + itemMargin) * yAxisMapping[index] + margin.top;
      g.selectAll("svg")
        .data(data)
        .enter()
        .insert("rect")
        .attr("class", "row-green-bar")
        .attr("x", fullLengthBackgrounds ? 0 : margin.left)
        .attr(
          "width",
          fullLengthBackgrounds ? width : width - margin.right - margin.left
        )
        .attr("y", greenbarYAxis)
        .attr("height", itemHeight)
        .attr(
          "fill",
          backgroundColor instanceof Function
            ? backgroundColor(datum, index)
            : backgroundColor
        );
    };

    var appendLabel = function (
      gParent,
      yAxisMapping,
      index,
      hasLabel,
      datum,
      d,
      i
    ) {
      var fullItemHeight = itemHeight + itemMargin;
      // var rowsDown          = margin.top + (fullItemHeight/2) + fullItemHeight * (yAxisMapping[index] || 1);
      var rowsDown =
        margin.top +
        fullItemHeight / 2 +
        itemHeight * datum.times[i].lane +
        itemMargin * datum.times[i].group;
      gParent
        .append("text")
        .attr("class", "timeline-label")
        .attr("transform", "translate(" + labelMargin + "," + rowsDown + ")")
        .text(hasLabel ? labelFunction(datum.label) : datum.id)
        .on("click", function (d, i) {
          click(d, index, datum);
        });
    };

    function timeline(gParent) {
      var g = gParent.append("g");
      var gParentSize = gParent[0][0].getBoundingClientRect();
      var gParentItem = d3.select(gParent[0][0]);

      var yAxisMapping = {},
        maxStack = 1,
        maxgroup = 1,
        maxlane = 1,
        minTime = 0,
        maxTime = 0;

      setWidth();

      // check if the user wants relative time
      // if so, substract the first timestamp from each subsequent timestamps
      if (timeIsRelative) {
        g.each(function (d, i) {
          d.forEach(function (datum, index) {
            datum.times.forEach(function (time, j) {
              if (index === 0 && j === 0) {
                originTime = time.starting_time; //Store the timestamp that will serve as origin
                time.starting_time = 0; //Set the origin
                time.ending_time = time.ending_time - originTime; //Store the relative time (millis)
              } else {
                time.starting_time = time.starting_time - originTime;
                time.ending_time = time.ending_time - originTime;
              }
            });
          });
        });
      }

      // check how many stacks we're gonna need
      // do this here so that we can draw the axis before the graph
      if (stacked || ending === 0 || beginning === 0) {
        g.each(function (d, i) {
          d.forEach(function (datum, index) {
            // create y mapping for stacked graph
            if (stacked && Object.keys(yAxisMapping).indexOf(index) == -1) {
              yAxisMapping[index] = maxStack;
              maxStack++;
            }

            // figure out beginning and ending times if they are unspecified
            datum.times.forEach(function (time, i) {
              maxgroup = datum.times[i].group + 1;
              maxlane = datum.times[i].lane + 1;
              tempname = datum.times[i].name;
              if (beginning === 0)
                if (
                  time.starting_time < minTime ||
                  (minTime === 0 && timeIsRelative === false)
                )
                  minTime = time.starting_time;
              if (ending === 0)
                if (time.ending_time > maxTime) maxTime = time.ending_time;
            });
          });
        });

        if (ending === 0) {
          ending = maxTime;
        }
        if (beginning === 0) {
          beginning = minTime;
        }
      }

      width = (width * (ending - beginning)) / frametimespan;

      var scaleFactor =
        (1 / (ending - beginning)) * (width - margin.left - margin.right);

      // draw the axis
      var xScale = d3.time
        .scale()
        .domain([beginning, ending])
        // .domain([beginning, beginning+defaultspan])
        .range([margin.left, width - margin.right]);

      var xAxis = d3.svg
        .axis()
        .scale(xScale)
        .orient(orient)
        .tickFormat(tickformatDT)
        .tickSize(tickFormat.tickSize);

      var yScale = d3.scale
        .linear()
        .domain([0, 1000]) // データの範囲を指定
        .range([gParentSize.height, 0]);

      if (tickFormat.tickValues != null) {
        xAxis.tickValues(tickFormat.tickValues);
      } else {
        xAxis.ticks(
          tickFormat.numTicks || tickFormat.tickTime,
          tickFormat.tickInterval
        );
      }

      // draw the chart
      g.each(function (d, i) {
        chartData = d;
        d.forEach(function (datum, index) {
          var data = datum.times;
          var hasLabel = typeof datum.label != "undefined";

          // issue warning about using id per data set. Ids should be individual to data elements
          if (typeof datum.id != "undefined") {
            console.warn(
              "d3Timeline Warning: Ids per dataset is deprecated in favor of a 'class' key. Ids are now per data element."
            );
          }

          if (backgroundColor) {
            appendBackgroundBar(yAxisMapping, index, g, data, datum);
          }

          g.selectAll("svg")
            .data(data)
            .enter()
            .append(function (d, i) {
              return document.createElementNS(
                d3.ns.prefix.svg,
                "display" in d ? d.display : display
              );
            })
            .attr("x", getXPos)
            .attr("y", getStackPosition)
            .attr("width", function (d, i) {
              return (d.ending_time - d.starting_time) * scaleFactor;
            })
            .attr("cy", function (d, i) {
              return getStackPosition(d, i) + itemHeight / 2;
            })
            .attr("cx", getXPos)
            .attr("r", itemHeight / 2)
            .attr("height", itemHeight)
            .style("fill", function (d, i) {
              var dColorPropName;
              if (d.color) return d.color;
              if (colorPropertyName) {
                dColorPropName = d[colorPropertyName];
                if (dColorPropName) {
                  return colorCycle(dColorPropName);
                } else {
                  return colorCycle(datum[colorPropertyName]);
                }
              }
              return colorCycle(index);
            })
            .attr("class", function (d, i) {
              return datum.class
                ? "timelineSeries_" + datum.class
                : "timelineSeries_" + index;
            })
            .attr("id", function (d, i) {
              // use deprecated id field
              if (datum.id && !d.id) {
                return "timelineItem_" + datum.id;
              }
              return d.id ? d.id : "timelineItem_" + index + "_" + i;
            })
            // tooltipを表示内容の制御。for tooltip002
            .on("mouseover", function (d, i) {
              starting_time = new Date(datum.times[i].starting_time);
              ending_time = new Date(datum.times[i].ending_time);
              tooltip
                .style("visibility", "visible")
                .html(
                  "name : " +
                    datum.times[i].name +
                    "<br>start : " +
                    starting_time.toLocaleDateString() +
                    " " +
                    starting_time.toLocaleTimeString("it-IT") +
                    "<br>end : " +
                    ending_time.toLocaleDateString() +
                    " " +
                    ending_time.toLocaleTimeString("it-IT") +
                    "<br>group : " +
                    datum.times[i].group +
                    "<br>lane : " +
                    datum.times[i].lane +
                    "<br>description : " +
                    datum.times[i].name +
                    "<br>description2 : " +
                    datum.times[i].name
                );
            })
            .on("mousemove", function (d) {
              tooltip
                .style("top", d3.event.pageY - 20 + "px")
                .style("left", d3.event.pageX + 10 + "px");
            })
            .on("mouseout", function (d) {
              tooltip.style("visibility", "hidden");
            })
            .on("click", function (d, i) {
              click(d, index, datum);
            });

          g.selectAll("svg")
            .data(data)
            .enter()
            .append("text")
            .attr("x", getXTextPos)
            .attr("y", getStackTextPosition)
            .text(function (d) {
              return d.label;
            });

          if (rowSeparatorsColor) {
            var lineYAxis =
              itemHeight +
              itemMargin / 2 +
              margin.top +
              (itemHeight + itemMargin) * yAxisMapping[index];
            gParent
              .append("svg:line")
              .attr("class", "row-separator")
              .attr("x1", 0 + margin.left)
              .attr("x2", width - margin.right)
              .attr("y1", lineYAxis)
              .attr("y2", lineYAxis)
              .attr("stroke-width", 1)
              .attr("stroke", rowSeparatorsColor);
          }

          if (hasLabel) {
            appendLabel(gParent, yAxisMapping, index, hasLabel, datum, d, i);
          }

          function getStackPosition(d, i) {
            if (stacked) {
              return (
                margin.top +
                itemHeight * datum.times[i].lane +
                itemMargin * datum.times[i].group
              ); // Add By muku
            }
            return margin.top;
          }
          function getStackTextPosition(d, i) {
            if (stacked) {
              return (
                margin.top +
                itemHeight * datum.times[i].lane +
                itemMargin * datum.times[i].group +
                itemHeight * 0.75
              ); // Add By muku
            }
            return margin.top + itemHeight * 0.75;
          }
        });
      });

      var belowLastItem =
        margin.top + itemHeight * maxlane + itemMargin * maxgroup;
      var aboveFirstItem = margin.top;
      var timeAxisYPosition = showAxisTop ? aboveFirstItem : belowLastItem;

      if (showTimeAxis) {
        appendTimeAxis(g, xAxis, timeAxisYPosition);
      }
      if (timeAxisTick) {
        appendTimeAxisTick(g, xAxis, maxStack);
      }

      var gSize = g[0][0].getBoundingClientRect();
      setHeight();

      height = gSize.height + gSize.top - gParentSize.top;

      if (width > gParentSize.width || height > gParentSize.height) {
        var axisG = gParent.append("g");

        var move = function () {
          var x = Math.min(
            0,
            Math.max(gParentSize.width - width, d3.event.translate[0])
          );
          var y = Math.min(
            0,
            Math.max(gParentSize.height - height, d3.event.translate[1])
          );

          zoom.translate([x, y]);
          g.attr("transform", "translate(" + x + "," + y + ")");

          // axisG.call(axis);

          scroll(x * scaleFactor, y * scaleFactor, xScale, yScale);
        };

        var zoom = d3.behavior.zoom().x(xScale).y(yScale).on("zoom", move);

        gParent.attr("class", "scrollable").call(zoom);

        // axisG.call(axis);
      }

      if (rotateTicks) {
        g.selectAll(".tick text").attr("transform", function (d) {
          return (
            "rotate(" +
            rotateTicks +
            ")translate(" +
            (this.getBBox().width / 2 + 10) +
            "," + // TODO: change this 10
            this.getBBox().height / 2 +
            ")"
          );
        });
      }

      // var gSize = g[0][0].getBoundingClientRect();
      // setHeight();

      if (showBorderLine) {
        g.each(function (d, i) {
          d.forEach(function (datum) {
            var times = datum.times;
            times.forEach(function (time) {
              appendLine(xScale(time.starting_time), showBorderFormat);
              appendLine(xScale(time.ending_time), showBorderFormat);
            });
          });
        });
      }

      if (showTodayLine) {
        var todayLine = xScale(new Date());
        appendLine(todayLine, showTodayFormat);
      }

      function getXPos(d, i) {
        return margin.left + (d.starting_time - beginning) * scaleFactor;
      }

      function getXTextPos(d, i) {
        return margin.left + (d.starting_time - beginning) * scaleFactor + 5;
      }

      function setHeight() {
        if (!height && !gParentItem.attr("height")) {
          if (itemHeight) {
            // set height based off of item height
            height = gSize.height + gSize.top - gParentSize.top;
            // set bounding rectangle height
            d3.select(gParent[0][0]).attr("height", height);
          } else {
            throw "height of the timeline is not set";
          }
        } else {
          if (!height) {
            height = gParentItem.attr("height");
          } else {
            gParentItem.attr("height", height);
          }
        }
      }

      function setWidth() {
        if (!width && !gParentSize.width) {
          try {
            width = gParentItem.attr("width");
            if (!width) {
              throw "width of the timeline is not set. As of Firefox 27, timeline().with(x) needs to be explicitly set in order to render";
            }
          } catch (err) {
            console.log(err);
          }
        } else if (!(width && gParentSize.width)) {
          try {
            width = gParentItem.attr("width");
          } catch (err) {
            console.log(err);
          }
        }
        // if both are set, do nothing
      }

      function appendLine(lineScale, lineFormat) {
        gParent
          .append("svg:line")
          .attr("x1", lineScale)
          .attr("y1", lineFormat.marginTop)
          .attr("x2", lineScale)
          .attr("y2", height - lineFormat.marginBottom)
          .style("stroke", lineFormat.color) //"rgb(6,120,155)")
          .style("stroke-width", lineFormat.width);
      }
    }

    // SETTINGS

    timeline.margin = function (p) {
      if (!arguments.length) return margin;
      margin = p;
      return timeline;
    };

    timeline.frametimespan = function (p) {
      if (!arguments.length) return frametimespan;
      frametimespan = p;
      return timeline;
    };

    timeline.orient = function (orientation) {
      if (!arguments.length) return orient;
      orient = orientation;
      return timeline;
    };

    timeline.itemHeight = function (h) {
      if (!arguments.length) return itemHeight;
      itemHeight = h;
      return timeline;
    };

    timeline.itemMargin = function (h) {
      if (!arguments.length) return itemMargin;
      itemMargin = h;
      return timeline;
    };

    timeline.navMargin = function (h) {
      if (!arguments.length) return navMargin;
      navMargin = h;
      return timeline;
    };

    timeline.height = function (h) {
      if (!arguments.length) return height;
      height = h;
      return timeline;
    };

    timeline.width = function (w) {
      if (!arguments.length) return width;
      width = w;
      return timeline;
    };

    timeline.display = function (displayType) {
      if (!arguments.length || DISPLAY_TYPES.indexOf(displayType) == -1)
        return display;
      display = displayType;
      return timeline;
    };

    timeline.labelFormat = function (f) {
      if (!arguments.length) return labelFunction;
      labelFunction = f;
      return timeline;
    };

    timeline.tickFormat = function (format) {
      if (!arguments.length) return tickFormat;
      tickFormat = format;
      return timeline;
    };

    timeline.hover = function (hoverFunc) {
      if (!arguments.length) return hover;
      hover = hoverFunc;
      return timeline;
    };

    timeline.mouseover = function (mouseoverFunc) {
      if (!arguments.length) return mouseover;
      mouseover = mouseoverFunc;
      return timeline;
    };

    timeline.mouseout = function (mouseoutFunc) {
      if (!arguments.length) return mouseout;
      mouseout = mouseoutFunc;
      return timeline;
    };

    timeline.click = function (clickFunc) {
      if (!arguments.length) return click;
      click = clickFunc;
      return timeline;
    };

    timeline.scroll = function (scrollFunc) {
      if (!arguments.length) return scroll;
      scroll = scrollFunc;
      return timeline;
    };

    timeline.colors = function (colorFormat) {
      if (!arguments.length) return colorCycle;
      colorCycle = colorFormat;
      return timeline;
    };

    timeline.beginning = function (b) {
      if (!arguments.length) return beginning;
      beginning = b;
      return timeline;
    };

    timeline.ending = function (e) {
      if (!arguments.length) return ending;
      ending = e;
      return timeline;
    };

    timeline.labelMargin = function (m) {
      if (!arguments.length) return labelMargin;
      labelMargin = m;
      return timeline;
    };

    timeline.rotateTicks = function (degrees) {
      if (!arguments.length) return rotateTicks;
      rotateTicks = degrees;
      return timeline;
    };

    timeline.stack = function () {
      stacked = !stacked;
      return timeline;
    };

    timeline.relativeTime = function () {
      timeIsRelative = !timeIsRelative;
      return timeline;
    };

    timeline.showBorderLine = function () {
      showBorderLine = !showBorderLine;
      return timeline;
    };

    timeline.showBorderFormat = function (borderFormat) {
      if (!arguments.length) return showBorderFormat;
      showBorderFormat = borderFormat;
      return timeline;
    };

    timeline.showToday = function () {
      showTodayLine = !showTodayLine;
      return timeline;
    };

    timeline.showTodayFormat = function (todayFormat) {
      if (!arguments.length) return showTodayFormat;
      showTodayFormat = todayFormat;
      return timeline;
    };

    timeline.colorProperty = function (colorProp) {
      if (!arguments.length) return colorPropertyName;
      colorPropertyName = colorProp;
      return timeline;
    };

    timeline.rowSeparators = function (color) {
      if (!arguments.length) return rowSeparatorsColor;
      rowSeparatorsColor = color;
      return timeline;
    };

    timeline.background = function (color) {
      if (!arguments.length) return backgroundColor;
      backgroundColor = color;
      return timeline;
    };

    timeline.showTimeAxis = function () {
      showTimeAxis = !showTimeAxis;
      return timeline;
    };

    timeline.showAxisTop = function () {
      showAxisTop = !showAxisTop;
      return timeline;
    };

    timeline.showAxisCalendarYear = function () {
      showAxisCalendarYear = !showAxisCalendarYear;
      return timeline;
    };

    timeline.showTimeAxisTick = function () {
      timeAxisTick = !timeAxisTick;
      return timeline;
    };

    timeline.fullLengthBackgrounds = function () {
      fullLengthBackgrounds = !fullLengthBackgrounds;
      return timeline;
    };

    timeline.showTimeAxisTickFormat = function (format) {
      if (!arguments.length) return timeAxisTickFormat;
      timeAxisTickFormat = format;
      return timeline;
    };

    timeline.showAxisHeaderBackground = function (bgColor) {
      showAxisHeaderBackground = !showAxisHeaderBackground;
      if (bgColor) {
        axisBgColor = bgColor;
      }
      return timeline;
    };

    timeline.navigate = function (navigateBackwards, navigateForwards) {
      if (!arguments.length) return [navigateLeft, navigateRight];
      navigateLeft = navigateBackwards;
      navigateRight = navigateForwards;
      showAxisNav = !showAxisNav;
      return timeline;
    };

    return timeline;
  };
})();

console.log("");
// 日時設定はUNIX時刻 * 1000を利用している。
var trialdata = [
  // {label: "teamA",persons:[
  {
    label: "person a",
    class: "a",
    times: [
      {
        name: "test1",
        color: "green",
        group: 1,
        lane: 1,
        // "label": "Weeee",
        starting_time: 1355752800000,
        ending_time: 1355759900000,
      },
      {
        name: "test2",
        color: "blue",
        group: 1,
        lane: 1,
        // "label": "Weeee",
        starting_time: 1355767900000,
        ending_time: 1355774400000,
      },
      {
        name: "test5",
        color: "red",
        group: 1,
        lane: 2,
        // "label": "Weeee",
        starting_time: 1355759000000,
        ending_time: 1355769900000,
      },
    ],
  },
  {
    label: "person b",
    class: "b",
    times: [
      {
        name: "test3",
        color: "pink",
        group: 2,
        lane: 3,
        // "label": "Weeee",
        starting_time: 1355759910000,
        ending_time: 1355761900000,
      },
    ],
  },
  // ]}
  // {label:"teamB"[
  {
    label: "person c",
    class: "c",
    times: [
      {
        name: "test4",
        color: "yellow",
        group: 3,
        lane: 4,
        // "label": "Weeee",
        starting_time: 1355761910000,
        ending_time: 1355763910000,
      },
    ],
  },
  // ]}
];

// グラフ領域の広さ
var width = 1000;
var height = 500;

// RadioBottomの値で表示期間を変える。
function timeline(frametimespan) {
  if (arguments.length) {
    var chart = d3
      .timeline()
      .stack()
      .margin({ left: 70, right: 30, top: 0, bottom: 0 })
      .frametimespan(frametimespan)
      .click(function (d, i, datum) {
        alert(datum.label);
      });
  } else {
    var chart = d3
      .timeline()
      .stack()
      .margin({ left: 70, right: 30, top: 0, bottom: 0 })
      .click(function (d, i, datum) {
        alert(datum.label);
      });
  }

  // 外部CSVファイルを使う時。
  var requestURL = "http://127.0.0.1:5500/data/trialdata.csv";
  processCSVData(requestURL)
    .then((result) => {
      console.log(result);
      var svg = d3
        .select("#timeline1")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .datum(result)
        .call(chart);
    })
    .catch((error) => {
      console.error(error);
    });
  // 外部CSVファイルを使う時。

  // // 外部JSONファイルを使う時
  // requestURL = "http://127.0.0.1:5500/data/trialdata.json";
  // let request = new XMLHttpRequest();
  // request.open("GET", requestURL);
  // request.responseType = "json";

  // request.send();

  // request.onload = function () {
  //   let listJSON = request.response.data;
  //   listJSON = JSON.parse(JSON.stringify(listJSON));

  //   var svg = d3
  //     .select("#timeline1")
  //     .append("svg")
  //     .attr("width", width)
  //     .datum(trialdata)
  //     .call(chart);
  // };
  // 外部JSONファイルを使う時
}

// Csvを取り込んでJSON形式のデータを作る関数
async function processCSVData(requestURL) {
  try {
    const response = await fetch(requestURL);
    const csvText = await response.text();

    var rows = csvText.split("\n").map((row) => row.split(","));
    var groupedData = {};

    rows.slice(1).forEach((row) => {
      var labelClassKey = row[0] + "," + row[1];
      if (!groupedData[labelClassKey]) {
        groupedData[labelClassKey] = {
          label: row[0],
          class: row[1],
          times: [],
        };
      }

      var timeData = {
        name: row[2],
        color: row[3],
        group: parseInt(row[4]),
        lane: parseInt(row[5]),
        starting_time: parseInt(row[6]),
        ending_time: parseInt(row[7]),
      };

      groupedData[labelClassKey].times.push(timeData);
    });

    var result = Object.values(groupedData);
    return result;
  } catch (error) {
    console.error("Error loading CSV data:", error);
    throw error;
  }
}

// RadioBottomの値で表示期間を変える関数
function getSelectedValue() {
  var form = document.getElementById("ChangeTimeSpan");
  var selectedTimeSpan = null;

  console.log(form);

  // Loop through radio buttons to find the selected one
  for (var i = 0; i < form.TimeSpan.length; i++) {
    if (form.TimeSpan[i].checked) {
      selectedTimeSpan = form.TimeSpan[i].value;
      break;
    }
  }

  if (selectedTimeSpan !== null) {
    // id="timeline1"の要素を取得
    var timeline1Element = document.getElementById("timeline1");

    // もし要素が存在する場合は削除
    if (timeline1Element) {
      // 要素を削除
      timeline1Element.innerHTML = "";
    } else {
      console.error("Element with id 'timeline1' not found.");
    }
    timeline(selectedTimeSpan);
  } else {
    alert("Please select a TimeSpan");
  }
}

timeline();
