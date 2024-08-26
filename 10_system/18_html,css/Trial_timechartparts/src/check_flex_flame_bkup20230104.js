// basic parameters
const width0 = 1000
const height0 = 600
const px0 = 100
const py0 = 50
// part-group parameters
const width1 = width0 - px0
const height1 = height0 - py0
const graphData = [
  {
    area: 'xAxis',px: px0,py: 0,
    clipPath: {
      x: 0,y: 0,width: width1,height: py0
    }
  },
  {
    area: 'yAxis',px: 0,py: py0,
    clipPath: {
      x: 0,y: 0,width: px0,height: height1
    }    
  },
  {
    area: 'plotArea',px: px0,py: py0,
    clipPath: {
      x: 0,y: 0,width: width1,height: height1
    }
  }
]

// graph parameter 
const g_height = 20
const g_margin = 5

// append SVG
const svg = d3.select('div#graph')
  .append('svg').attr('width', width0).attr('height', height0)

// append part-groups
const groups = svg.selectAll('g')
  .data(graphData)
  .enter()
  .append('g').attr('id', d => `${d.area}-group`).attr('transform', d => `translate(${d.px},${d.py})`)
groups
  .append('defs')
  .append('SVG:clipPath').attr('id', d => `${d.area}-clip`)
  .append('rect').attr('x', d => d.clipPath.x).attr('y', d => d.clipPath.y)
    .attr('width', d => d.clipPath.width).attr('height', d => d.clipPath.height)
groups
  .append('g').attr('class', 'clipped-group').attr('clip-path', d => `url(#${d.area}-clip)`)

const makeMarker = (coord, cx, cy,length,label) => ({
  coord: coord,
  cx: cx,
  cy: cy,
  r: 10, // constant: radius of marker circle
  left: function() { return this.cx - this.r },
  right: function() { return this.cx + this.r },
  top: function() { return this.cy - this.r },
  bottom: function() { return this.cy + this.r },
  barX: function() { return this.cx },
  barY: function() { return this.cy },
  labelX: function() { return this.cx },
  labelY: function() { return this.cy + (this.coord === 'xAxis' ? 0 : g_height) },
  label: !label ? `${coord}: [${cx},${cy}]` : label,
  length:length
})

// marker-data
const markers = [
  makeMarker('xAxis', 0, py0, 40,'8:00'),
  makeMarker('xAxis', 200, py0, 40,'9:00'),
  makeMarker('xAxis', 400, py0, 40,'10:00'),
  makeMarker('xAxis', 600, py0, 40,'11:00'),
  makeMarker('xAxis', 800, py0, 40,'12:00'),
  makeMarker('yAxis', 0, 0, 40),
  makeMarker('yAxis', 0, 150,40),
  makeMarker('yAxis', 0, 300, 40),
  makeMarker('plotArea', 0, 0, 40),
  makeMarker('plotArea', 0, 300, 40),
  makeMarker('plotArea', 50, 400, 40),
  makeMarker('plotArea', 120, 300, 40),
  makeMarker('plotArea', 200, 150, 80)
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
    .attr('stroke','none')
    .attr('fill','none')
  if (coord==='plotArea'){
    g.selectAll('rect.marker-rect')
    .data(coordMarkers)
    .enter()
    .append('rect')
    .attr('class', d => `${d.coord} marker-rect`)
    .attr('x', d => d.barX())
    .attr('y', d => d.barY())
    .attr('height', g_height)
    .attr('width', d => d.length)
    .attr('fill','yellow')
  }
  // if(coord==='xAxis' || coord==='yAxis'){
    g.selectAll('text.marker-label')
    .data(coordMarkers)
    .enter()
    .append('text')
    .attr('class', d => `${d.coord} marker-label `)
    .attr('x', d => d.labelX())
    .attr('y', d => d.labelY())
    .text(d => d.label)
  // }
}

// drag event handler
const dragCoord = (coord, dx, dy) => {
  const cg = selectClippedGroup(coord)
  // update cx/cy in binded data
  cg.selectAll('circle.marker-circle')
    .attr('cx', d => d.cx += dx)
    .attr('cy', d => d.cy += dy)
  // rewrite attributes with updated cx/cy
  cg.selectAll('rect.marker-rect')
  .attr('x', d => d.barX())
  .attr('y', d => d.barY())
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