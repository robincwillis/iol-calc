import React, { Component } from 'react';

import Input from 'js/Components/Common/Input'


export default class FormGroup extends Component {

	constructor (props) {
    super(props);
  }

	render () {
		let className = 'form-group';
		if(this.props.size){
			className += ' ' + this.props.size;
		}

		let inline = this.props.inline ? ' inline' : '';
		className += inline;
		let last = this.props.last ? ' last' : '';
		inline += last;

		return (
			<div className={className}>
			 <div className={"label"+inline}>
			 	<label>{this.props.label}</label>
			 </div>
			 <div className={"input"+inline}>
				 <Input {...this.props} />
			 </div>
			</div>
		);
	}
}
