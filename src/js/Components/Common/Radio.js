import React, { Component } from 'react';

export default class Radio extends Component {

	constructor (props) {
    super(props);
  }

  handleOnChange (event) {
  	//todo;
  	if(this.props.action) {
  		this.props.action(event);
  	}
  }

  validate () {

  }

	render () {

		let last = this.props.last ? ' last' : '';

		return (
			<div key={this.props.key} className="radio-container">
				<div className="radio-input">
				 <input
						name={this.props.name}
						onChange={this.handleOnChange.bind(this)}
						value={this.props.value}
						type="radio"
						placeholder="input"
				 />
			 </div>
			 <div className={"radio-label"+last}>
				 	<label>{this.props.label}</label>
			 </div>
			</div>
		);
	}
}
