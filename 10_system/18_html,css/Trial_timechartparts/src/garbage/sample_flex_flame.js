// basic parameters
const width0 = 600
const height0 = 400
const px0 = 200
const py0 = 100
// part-group parameters
const width1 = width0 - px0
const height1 = height0 - py0
const graphData = [
  {
    area: 'xAxis',
    px: px0,
    py: 0,
    clipPath: {
      x: 0,
      y: 0,
      width: width1,
      height: py0
    }
  },
  {
    area: 'yAxis',
    px: 0,
    py: py0,
    clipPath: {
      x: 0,
      y: 0,
      width: px0,
      height: height1
    }    
  },
  {
    area: 'plotArea',
    px: px0,
    py: py0,
    clipPath: {
      x: 0,
      y: 0,
      width: width1,
      height: height1
    }
  }
]

// append SVG
const svg = d3.select('div#graph')
  .append('svg')
  .attr('width', width0)
  .attr('height', height0)

// append part-groups
const groups = svg.selectAll('g')
  .data(graphData)
  .enter()
  .append('g')
  .attr('id', d => `${d.area}-group`)
  .attr('transform', d => `translate(${d.px},${d.py})`)
groups
  .append('defs')
  .append('SVG:clipPath')
  .attr('id', d => `${d.area}-clip`)
  .append('rect')
  .attr('x', d => d.clipPath.x)
  .attr('y', d => d.clipPath.y)
  .attr('width', d => d.clipPath.width)
  .attr('height', d => d.clipPath.height)
groups
  .append('g')
  .attr('class', 'clipped-group')
  .attr('clip-path', d => `url(#${d.area}-clip)`)

// label position
//        left   right
//          A  |  B   high
//        --(cx,cy)--
//          D  |  C   low
const makeMarker = (coord, cx, cy, labelXPos, labelYPos) => ({
  coord: coord,
  cx: cx,
  cy: cy,
  r: coord === 'svg' ? 40 : 20, // constant: radius of marker circle
  left: function() { return this.cx - this.r },
  right: function() { return this.cx + this.r },
  top: function() { return this.cy - this.r },
  bottom: function() { return this.cy + this.r },
  labelXPos: labelXPos, // for css text-align
  labelYPos: labelYPos,
  labelX: function() { return this.cx + (this.labelXPos === 'left' ? -this.r : this.r) },
  labelY: function() { return this.cy + (this.labelYPos === 'high' ? -this.r : this.r) },
  label: `${coord}: [${cx},${cy}]`
})

// marker-data
const markers = [
  makeMarker('svg', 0, 0, 'right', 'low'),
  makeMarker('svg', 0, height0, 'right', 'high'),
  makeMarker('svg', width0, 0, 'left', 'row'),
  makeMarker('svg', width0, height0, 'left', 'high'),
  makeMarker('svg', px0, py0, 'right', 'low'),
  makeMarker('xAxis', 0, 0, 'right', 'low'),
  makeMarker('xAxis', width1 / 2, py0 / 2, 'left', 'high'),
  makeMarker('xAxis', width1, py0, 'left', 'high'),
  makeMarker('yAxis', 0, 0, 'right', 'low'),
  makeMarker('yAxis', px0 / 2, height1 / 2, 'right', 'high'),
  makeMarker('yAxis', px0, height1, 'left', 'high'),
  makeMarker('plotArea', 0, 0, 'right', 'low'),
  makeMarker('plotArea', 0, height1, 'right', 'high'),
  makeMarker('plotArea', width1, 0, 'left', 'low'),
  makeMarker('plotArea', width1 / 2, height1 / 2, 'left', 'high'),
  makeMarker('plotArea', width1, height1, 'left', 'high')
]
const selectGroup = key => d3.select(`g#${key}-group`)
const selectClippedGroup = key => selectGroup(key).select('g')

// draw markers
for (const coord of ['svg', 'xAxis', 'yAxis', 'plotArea']) {
  const coordMarkers = markers.filter(d => d.coord === coord)
  const g = coord === 'svg' ? svg : selectClippedGroup(coord)
  g.selectAll('circle.marker-circle')
    .data(coordMarkers)
    .enter()
    .append('circle')
    .attr('class', d => `${d.coord} marker-circle`)
    .attr('cx', d => d.cx)
    .attr('cy', d => d.cy)
    .attr('r', d => d.r)
  g.selectAll('line.marker-x-axis')
    .data(coordMarkers)
    .enter()
    .append('line')
    .attr('class', d => `${d.coord} marker-x-axis`)
    .attr('x1', d => d.left())
    .attr('y1', d => d.cy)
    .attr('x2', d => d.right())
    .attr('y2', d => d.cy)
  g.selectAll('line.marker-y-axis')
    .data(coordMarkers)
    .enter()
    .append('line')
    .attr('class', d => `${d.coord} marker-y-axis`)
    .attr('x1', d => d.cx)
    .attr('y1', d => d.top())
    .attr('x2', d => d.cx)
    .attr('y2', d => d.bottom())
  g.selectAll('line.marker-arrow')
    .data(coordMarkers)
    .enter()
    .append('line')
    .attr('class', d => `${d.coord} marker-arrow`)
    .attr('x1', d => d.cx)
    .attr('y1', d => d.cy)
    .attr('x2', d => d.labelX())
    .attr('y2', d => d.labelY())
  g.selectAll('text.marker-label')
    .data(coordMarkers)
    .enter()
    .append('text')
    .attr('class', d => `${d.coord} marker-label ${d.labelXPos}`)
    .attr('x', d => d.labelX())
    .attr('y', d => d.labelY())
    .text(d => d.label)
}

// drag event handler
const dragCoord = (coord, dx, dy) => {
  const cg = selectClippedGroup(coord)
  // update cx/cy in binded data
  cg.selectAll('circle.marker-circle')
    .attr('cx', d => d.cx += dx)
    .attr('cy', d => d.cy += dy)
  // rewrite attributes with updated cx/cy
  cg.selectAll('line.marker-x-axis')
    .attr('x1', d => d.left())
    .attr('y1', d => d.cy)
    .attr('x2', d => d.right())
    .attr('y2', d => d.cy)
  cg.selectAll('line.marker-y-axis')
    .attr('x1', d => d.cx)
    .attr('y1', d => d.top())
    .attr('x2', d => d.cx)
    .attr('y2', d => d.bottom())
  cg.selectAll('line.marker-arrow')
    .attr('x1', d => d.cx)
    .attr('y1', d => d.cy)
    .attr('x2', d => d.labelX())
    .attr('y2', d => d.labelY())
  cg.selectAll('text.marker-label')
    .attr('x', d => d.labelX())
    .attr('y', d => d.labelY())
}
const dragAllMarker = (dx, dy) => {
  dragCoord('xAxis', dx, 0) // move horizontal
  dragCoord('yAxis', 0, dy) // move vertical
  dragCoord('plotArea', dx, dy)
}

// Add rect to catch drag-event with drag event handler
// * size of drag-handler is same as clipPath rect.
// * drag-handler is fixed: out of clipped-group.
groups
  .append('rect')
  .attr('class', d => `${d.area} drag-handler`)
  .attr('x', d => d.clipPath.x)
  .attr('y', d => d.clipPath.y)
  .attr('width', d => d.clipPath.width)
  .attr('height', d => d.clipPath.height)

const dragHandlerOf = {
  'xAxis': () => dragAllMarker(d3.event.dx, 0),
  'yAxis': () => dragAllMarker(0, d3.event.dy),
  'plotArea': () => dragAllMarker(d3.event.dx, d3.event.dy)
}
Object.keys(dragHandlerOf).forEach(area => {
  selectGroup(area)
    .select('rect.drag-handler')
    .call(d3.drag().on('drag', dragHandlerOf[area]))
})