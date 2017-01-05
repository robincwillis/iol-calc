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
  		let value = event.target.value;
   		if(event.target.type === 'number') {
  			value = Number(value);
  		}
  		this.props.action(event.target.name, value);
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

    //console.log(this.props.value);

		return (
			<div className={"input-container" + className}>
			 	<div className="input-status"></div>
			 	<input
			 		name={this.props.name}
			 		onChange={this.handleOnChange.bind(this)}
			 		value={this.props.value}
			 		type={this.props.type}
          step="any"
			 		placeholder={this.props.placeholder}
		 		/>
			</div>
		)
	}

}