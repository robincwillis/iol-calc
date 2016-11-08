import React, { Component } from 'react';

import { validateInput } from 'js/calculator';

export default class Input extends Component {

	constructor (props) {
    super(props);
    //Generate random Id
    this.state = {
    	valid : true,
    	empty : true
    }
  }

  handleOnChange (event) {
  	let empty = event.target.value.length === 0 ? true : false;
  	let valid = validateInput(event.target.name, event.target.value);
  	valid = empty ? true : valid;
  	this.setState({
  		empty: empty,
  		valid : valid
  	})

  	if(this.props.action) {
  		this.props.action(event.target.name, event.target.value);
  	}
  }

  validate (name, value) {

  }

	render () {
		let className = '';
		if(this.state.empty) {
				className += ' empty';
		}

		if(this.state.valid) {
			className += ' valid';
		} else {
			className += ' error';
		}

		return (
			<div className={"input-container" + className}>
			 	<div className="input-status"></div>
			 	<input
			 		name={this.props.name}
			 		onChange={this.handleOnChange.bind(this)}
			 		value={this.props.value}
			 		type={this.props.type}
			 		placeholder="input"
			 		/>
			</div>
		)
	}

}