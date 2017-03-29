import * as d3 from "d3";


var d3Graph = {};

d3Graph.update = function(el, props, state) {
	//console.log('update graph');
	var data = state.data;

	var margin = {top: 0, right: 0, bottom: 0, left: 0}


	var axisMargin = 20;
	//var margin = 80;
	var valueMargin = 14;

	var height = props.height - margin.top - margin.bottom;
	var width = props.width - margin.right - margin.left;

	var xScale = d3.scaleLinear()
			.domain([d3.min(data, function(d){ return d.point.x; })-2, d3.max(data, function(d){ return d.point.x; })+2])
			.range([0, width-1]);

	var yScale = d3.scaleLinear()
			.domain([d3.min(data, function(d){ return d.point.y; })-2, d3.max(data, function(d){ return d.point.y; })+2])
			.range([height, 0]);

	var xAxis = d3.axisBottom()
			.scale(xScale)
			.ticks(8)
			.tickPadding(10)
			.tickSizeInner(-height-1);

	var yAxis = d3.axisLeft()
			.scale(yScale)
			.ticks(6.5)
			.tickPadding(10)
			.tickSizeInner(-width-1)

	function pointAtX(a, b, x) {
		var interpolator = d3.scaleLinear()

		let x1 = xScale(a.x)
		let y1 = yScale(a.y)
		let x2 = xScale(b.x)
		let y2 = yScale(b.y)


		interpolator
			.domain([x1, x2])
			.range([y1, y2]);
		//return [x, interpolator(x)];
		return interpolator(x);
	}

	var svg = d3.select(el).append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis)

		svg.append("g")
				.attr("class", "y axis")
				.call(yAxis)

	d3Graph.test = svg
	.append("g")

	.selectAll("g")

	 .data(data)
	 .enter()
	 .append("circle")
	 .attr("cx", function(d) {
				return xScale(d.point.x);
	 })
	 .attr("cy", function(d) {
				return yScale(d.point.y);
	 })
	 .attr("r", 5);

	 svg.append('line')
			.style('stroke', 'black')
			.attr('x1', 0)
			.attr('y1', pointAtX(data[0].point, data[1].point, 0))
			.attr('x2', width)
			.attr('y2', pointAtX(data[0].point, data[1].point, width))
			.attr("stroke-width", 2)


	 svg.append('line')
			.style('stroke', 'black')
			.attr('x1', 0)
			.attr('y1', yScale(0))
			.attr('x2', width)
			.attr('y2', yScale(0))
			.attr("stroke-width", 2)

	 svg.append('line')
			.style('stroke', 'black')
			.attr('x1', xScale(data[0].point.x))
			.attr('y1', 0)
			.attr('x2', xScale(data[0].point.x))
			.attr('y2', height)
			.attr("stroke-width", 2)

}


d3Graph.create = function(el, props, state) {

	console.log('create graph');

	var data = state.data;

	d3Graph.update(el, props, state);

	return;

};


export default d3Graph;