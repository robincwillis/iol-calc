import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import d3Graph from './d3Graph';

//import 'sass/components/chart';

export default class Chart extends Component {


 getGraphState () {
 		// console.log(this.props.sphericalEquivalent);
 		// console.log(this.props.presentIOL);
 		// console.log(this.props.cylinderPower);
 		// console.log(this.props.replacementIOL);

		// var data = this.props.results.map ( (result) => {
		// 	var key = Object.keys(result)[0];
		// 	return {
		// 		label : key,
		// 		value : result[key]
		// 	};
		// });

		var a = {
			x : this.props.presentIOL,
			y: this.props.cylinderPower // + this.props.sphericalEquivalent
		};

		var b = {
			x : this.props.replacementIOL,
			y: this.props.cylinderPower + this.props.sphericalEquivalent
		};

		var c = {
			x : this.props.replacementIOL,
			y: this.props.cylinderPower
		};

		//console.log([{point:a},{point:b},{point:c}]);

		return {
			data: [{point:a},{point:b},{point:c}],
			domain: {x: [0, 1000]}
		};
	}

 testGraphState () {

		// var data = this.props.results.map ( (result) => {
		// 	var key = Object.keys(result)[0];
		// 	return {
		// 		label : key,
		// 		value : result[key]
		// 	};
		// });

		var a = {
			x : 4,
			y: 2
		};

		var b = {
			x : 3,
			y: 1
		};

		var c = {
			x : 0,
			y: 0
		};

		//console.log([{point:a},{point:b},{point:c}]);

		return {
			data: [{point:a},{point:b},{point:c}],
			domain: {x: [0, 1000]}
		};
	}

	componentDidMount () {
		var el = ReactDOM.findDOMNode(this);

		d3Graph.create(el, {
			width: el.offsetWidth,
			height: el.offsetHeight,
		}, this.getGraphState());
	}

	componentWillReceiveProps(nextProps) {

		var el = ReactDOM.findDOMNode(this);
		el.innerHTML = '';

		d3Graph.update(el, {
			width: el.offsetWidth,
			height: el.offsetHeight,
		}, this.getGraphState());
	}

	render () {

		return (
			<div className="graph"></div>
		);
	}
}
