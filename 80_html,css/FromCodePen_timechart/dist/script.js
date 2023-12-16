var h = 200;
var margin = {
  top: 30,
  right: 50,
  left: 50,
  bottom: 20 };


var data = [{
  key: 1,
  name: '渋谷',
  start: new Date('2015-07-01 4:00:00'),
  end: new Date('2015-07-01 6:35:00') },
{
  key: 1,
  name: '渋谷',
  start: new Date('2015-07-01 17:00:00'),
  end: new Date('2015-07-01 22:00:00') },
{
  key: 2,
  name: '武蔵小杉',
  start: new Date('2015-06-30 22:00:00'),
  end: new Date('2015-07-01 16:35:00') },
{
  key: 3,
  name: '横浜',
  start: new Date('2015-07-01 15:00:00'),
  end: new Date('2015-07-02 6:35:00') },
{
  key: 4,
  name: 'みなとみらい',
  start: new Date('2015-06-30 15:00:00'),
  end: new Date('2015-07-02 6:35:00') }];


var labels = d3.nest().
key(function (d) {
  return d.key;
}).
entries(data);

function draw() {
  var w = window.innerWidth;

  // svg
  var svg = d3.select("#timeline").
  attr({
    width: w,
    height: h });


  // xAxis
  var x = d3.time.scale().
  domain([
  new Date('2015-07-01 0:00:00'),
  new Date('2015-07-02 0:00:00')]).

  clamp(true).
  range([0, w - (margin.left + margin.right)]);

  var xAxis = d3.svg.axis().
  scale(x).
  orient('top').
  ticks(d3.time.hours, 1).
  tickFormat(d3.time.format('%_H:00')).
  innerTickSize(-(h - (margin.top + margin.bottom))).
  outerTickSize(0);

  svg.append('g').
  attr({
    class: 'axis x-axis',
    transform: 'translate(' + margin.left + ', ' + margin.top + ')' }).

  call(xAxis).
  selectAll('text').
  attr('transform', function () {
    if (w < 980 && w > 768) {
      return 'translate(14, -10) rotate(-45)';
    } else if (w <= 768) {
      return 'translate(7, -15) rotate(-90)';
    } else {
      return null;
    }
  });

  // yAxis
  var y = d3.scale.ordinal().
  domain(labels.map(function (d) {
    return d.key;
  })).
  rangeRoundBands([margin.top, h - margin.bottom], 0.5);

  var yAxis = d3.svg.axis().
  scale(y).
  orient('left').
  innerTickSize(0).
  outerTickSize(0);

  svg.append('g').
  attr({
    class: 'axis y-axis',
    transform: 'translate(' + margin.left + ', 0)' }).

  call(yAxis).
  selectAll('text').
  each(function (d, i) {
    var el = d3.select(this);
    var parent = d3.select(this.parentNode);
    parent.append('foreignObject').
    attr({
      x: -margin.left,
      y: -5,
      width: margin.left,
      height: 20 * 2 }).

    append('xhtml:p').
    attr({
      class: 'y-axis-label' }).

    html(function (d) {
      return labels[i].values[0].name;
    });
    el.remove();
  });

  // Bar
  svg.selectAll('.active').
  data(data).
  enter().
  append('rect').
  attr({
    x: function (d) {
      return x(d.start) + margin.left + 1;
    },
    y: function (d, i) {
      return y(d.key);
    },
    width: 0,
    height: 20,
    fill: '#45A1CF  ',
    class: 'active' }).

  transition().
  attr({
    width: function (d) {
      return x(d.end) - x(d.start) - 1;
    } });

}

draw();

var timer = false;
window.addEventListener('resize', function () {
  if (timer !== false) {
    clearTimeout(timer);
  }
  timer = setTimeout(function () {
    d3.select('#timeline').selectAll('*').remove();
    draw();
  }, 200);
});