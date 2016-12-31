import * as d3 from "d3";


var d3Graph = {};

d3Graph.update = function(el, props, state) {
	console.log('update graph');
	var data = state.data;
	var margin = {top: 10, right: 20, bottom: 10, left: 20}

var margin = {top: 0, right: 0, bottom: 0, left: 0}


	var axisMargin = 20;
	//var margin = 80;
	var valueMargin = 14;

	var height = props.height - margin.top - margin.bottom;
	var width = props.width - margin.right - margin.left;

	var xScale = d3.scaleLinear()
			.domain([d3.min(data, function(d){ return d.point.x; })-1, d3.max(data, function(d){ return d.point.x; })+1])
			.range([0, width-1]);

	var yScale = d3.scaleLinear()
			.domain([d3.min(data, function(d){ return d.point.y; })-1, d3.max(data, function(d){ return d.point.y; })+1])
			.range([height, 0]);

	var xAxis = d3.axisBottom()
			.scale(xScale)
			.ticks(5)
			.tickPadding(10)
			.tickSizeInner(-height-1);

	var yAxis = d3.axisLeft()
			.scale(yScale)
			.ticks(5)
			.tickPadding(10)
			.tickSizeInner(-width-1)

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

}

d3Graph.create = function(el, props, state) {

	console.log('create graph');

	var data = state.data;

	d3Graph.update(el, props, state);

	return;

};


export default d3Graph;