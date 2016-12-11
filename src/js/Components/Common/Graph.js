import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import d3Graph from './d3Graph';

//import 'sass/components/chart';

export default class Chart extends Component {


 getGraphState () {
 		console.log(this.props.sphericalEquivalent);

		// var data = this.props.results.map ( (result) => {
		// 	var key = Object.keys(result)[0];
		// 	return {
		// 		label : key,
		// 		value : result[key]
		// 	};
		// });

		var a = {
			x : this.props.presentIOL,
			y: this.props.cylinderPower + this.props.sphericalEquivalent
		};

		var b = {
			x : this.props.replacementIOL,
			y: this.props.cylinderPower + this.props.sphericalEquivalent
		};

		var c = {
			x : this.props.replacementIOL,
			y: this.props.cylinderPower
		};

		console.log([{point:a},{point:b},{point:c}]);

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

		console.log([{point:a},{point:b},{point:c}]);

		return {
			data: [{point:a},{point:b},{point:c}],
			domain: {x: [0, 1000]}
		};
	}

	componentDidMount () {
		var el = ReactDOM.findDOMNode(this);
		d3Graph.create(el, {
			width: '100%',
			height: '22px'
		}, this.getGraphState());
	}

	ComponentWillRecieveProps(nextProps) {
		console.log('got Props');
		//this.getGraphState();
	}

	render () {
		d3Graph.update(this.testGraphState())
		return (
			<div className="graph"></div>
		);
	}
}
