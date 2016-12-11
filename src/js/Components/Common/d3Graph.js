import * as d3 from "d3";


var d3Graph = {};

d3Graph.create = function(el, props, state) {

	var data = state.data;

	var margin = {top: 20, right: 20, bottom: 20, left: 20}

	 // width = 960 - margin.left - margin.right,
	 // height = 500 - margin.top - margin.bottom;

	var axisMargin = 20;
	//var margin = 80;
	var valueMargin = 14;

	var height = 180;
	var width = 300;

	var xScale = d3.scaleLinear()
			//.domain([0, d3.max(data, function(d){ return d.point.x; })])
			.domain([-20,20])
			.range([0, width]);

	var yScale = d3.scaleLinear()
			//.domain([0, d3.max(data, function(d){ return d.point.y; })])
			.domain([-2,2])
			.range([height, 0]);

	var xAxis = d3.axisBottom()
			.scale(xScale)
			.ticks(10)
			.tickSizeInner(-height);

	var yAxis = d3.axisLeft()
			.scale(yScale)
			.tickSizeInner(-width)

	var x = d3.scaleLinear()
		//.domain([0, d3.max(state.data)])
		.domain([0,1000])
		.range([0, 420]);

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

};


d3Graph.update = function(state) {
	var data = state.data;
	console.log(d3Graph.test);
	if(d3Graph.test){
		console.log('update graph');
		d3Graph.test.data(data);
	}


}


export default d3Graph;