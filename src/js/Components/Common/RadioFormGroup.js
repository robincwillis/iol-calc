import React, { Component } from 'react';

//import Input from 'js/Components/Common/Input'
import Radio from 'js/Components/Common/Radio';

export default class RadioFormGroup extends Component {

	constructor (props) {
    super(props);
  }

	render () {
		let className = 'form-group';
		return (
			<div className={className}>
			 <div className={"label"}>
			 	<label>{this.props.label}</label>
			 </div>
			 <div className={"input"}>
			 {this.props.options.map( (option, index)=>{
			 	let key = this.props.name + '-' + option.label + '-' + index;

			 	let last = index === this.props.options.length -1 ? true : false;
			 	console.log(last);

			 	return(
			 		<Radio
			 			last={last}
			 			key={key}
			 			name={this.props.name}
			 			label={option.label}
			 			value={option.value}
			 		/>
		 		)
			 })}
			 </div>
			</div>
		);
	}
}
