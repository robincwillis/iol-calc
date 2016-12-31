import React, { Component } from 'react';
import moment from 'moment';


import { uuid, updateCalcuation, getSphericalEquivalent } from 'js/calculator';

import FormGroup from 'js/Components/Common/FormGroup';
import RadioFormGroup from 'js/components/Common/RadioFormGroup';
import Graph from 'js/Components/Common/Graph';
import Button from 'js/Components/Common/Button';
import Toggle from 'react-toggle';

import 'sass/setup/reset';
import 'sass/components/app';
import 'sass/components/common/form_group';
import 'sass/components/common/input';
import 'sass/components/common/toggle';

export default class App extends Component {

	constructor (props) {
		super(props);
		//Generate random Id
		this.state = {
			id : uuid(),
			forceUpdate : false,
			doctorName : 'Michael Colvard',
			patentName : 'Robin Willis',
			presentIOL : 17,
			sphericalPower : null,
			sphericalPowerSign : true,
			cylinderPower : 0.75,
			cylinderPowerSign : false,
			axisOfStigmatism : 100,
			sphericalEquivalent : null,
			axialLength : 25,
			flatK1 : 43,
			flatK1Axis : 149,
			steepK2 : 43,
			steepK2Axis : 59,
			presentIOLAConstant : 119.3,
			replacementIOLAConstant : 119.3,
			desiredRefaction : null,
			emmetropiaIOLPower : null,
			ametropiaIOLPower : null,
			replacementIOL : null,
			presentIOLPosition : null,
			replacementIOLPosition : null
		}
	}


	updateState (name, value) {
		var state = {};
		state[name] = value;
		this.setState(state);
	}

	handleToggle (event) {
		this.updateState(event.target.name, event.target.checked)
	}

	componentDidMount () {
		let state = this.state;
		state.sphericalPower = 1.25;
		let nextState = updateCalcuation(this.state);
		nextState.forceUpdate = true;
		this.setState(nextState);
	}

	shouldComponentUpdate (nextProps, nextState) {

		console.log(this.state.sphericalEquivalent);
		console.log(nextState.sphericalEquivalent);

		if(nextState.forceUpdate) {
			return true;
		}

		if(this.state.sphericalPower !== nextState.sphericalPower) {
			return true;
		}
		if(this.state.cylinderPower !== nextState.cylinderPower) {
			return true;
		}
		if(this.state.sphericalPowerSign !== nextState.sphericalPowerSign) {
			return true;
		}
		if(this.state.cylinderPowerSign !== nextState.cylinderPowerSign) {
			return true;
		}
		if(this.state.axisOfStigmatism !== nextState.axisOfStigmatism) {
			return true;
		}
		if(this.state.sphericalEquivalent !== nextState.sphericalEquivalent) {
			return true;
		}
		if(this.state.doctorName !== nextState.doctorName) {
			return true;
		}
		if(this.state.patentName !== nextState.patentName) {
			return true;
		}
		if(this.state.presentIOL !== nextState.presentIOL) {
			return true;
		}
		if(this.state.axialLength !== nextState.axialLength) {
			return true;
		}
		if(this.state.flatK1 !== nextState.flatK1) {
			return true;
		}
		if(this.state.flatK1Axis !== nextState.flatK1Axis) {
			return true;
		}
		if(this.state.steepK2 !== nextState.steepK2) {
			return true;
		}
		if(this.state.steepK2Axis !== nextState.steepK2Axis) {
			return true;
		}
		if(this.state.presentIOLAConstant !== nextState.presentIOLAConstant) {
			return true;
		}
		if(this.state.replacementIOLAConstant !== nextState.replacementIOLAConstant) {
			return true;
		}
		if(this.state.desiredRefaction !== nextState.desiredRefaction) {
			return true;
		}
		if(this.state.replacementIOL !== nextState.replacementIOL) {
			return true;
		}

		console.log('dont update component');

		return false;
	}

	componentWillUpdate (nextProps, nextState) {
		if(nextState.sphericalPower && nextState.cylinderPower) {
			let sphericalEquivalent = getSphericalEquivalent(nextState.sphericalPower, nextState.cylinderPower, nextState.sphericalPowerSign, nextState.cylinderPowerSign);
			this.setState({
				sphericalEquivalent : sphericalEquivalent
			});
		}
	}

	componentDidUpdate () {
		this.setState({
			forceUpdate : false
		});
	}

	handleCalculateButtonClick () {
		let nextState = updateCalcuation(this.state);
		nextState.forceUpdate = true;
		var debug = {};
		Object.keys(nextState).forEach( (key)=> {
			debug[key] = { value : nextState[key]};
		});

		//console.table(debug);
		this.setState(nextState);
	}

	render () {

		let radioOptions = [{label:'Bag', value:1}, {label:'Sulcus', value:2}];
		console.log('render app');
		console.log(this.state.replacementIOL);

		return (
			<div className="root-container">
				<div className="row">
					<div className="col col-6">
						<header>
							<h1>Colvard IOL Exchange Calculator</h1>
							<h2>MIT License</h2>
						</header>
						<div className="row">
							<div className="col col-6">
								<FormGroup
									name="date"
									label="Date"
									value={moment(new Date()).format('DD-MM-YYYY')}
									readOnly={true}
									type="text"
									size="small"
								/>
							</div>
							<div className="col col-6">
								<FormGroup
									name="id"
									label="Id"
									value={this.state.id}
									readOnly={true}
									type="text"
									size="small"
								/>
							</div>
						</div>
						<FormGroup
							name="doctorName"
							action={this.updateState.bind(this)}
							label="Dr Name"
							value={this.state.doctorName}
							type="text"
						/>
						<FormGroup
							name="patentName"
							action={this.updateState.bind(this)}
							label="Patent Name"
							value={this.state.patentName}
							type="text"
						/>
					</div>
					<div className="col col-6">
							<Graph {...this.state} />
					</div>
				</div>
				<div className="row">
					<div className="col col-12">
						<FormGroup
							name="presentIOL"
							label="Diopteric Power of Present IOL"
							action={this.updateState.bind(this)}
							value={this.state.presentIOL}
							type="number"
							size="large first"
						/>

						<div className="form-group">
							<div className="label">
								<label>Refraction With Present IOL</label>
							</div>
							<div className="input">
								<Toggle
									name="sphericalPowerSign"
									className='spherical-power-toggle'
									defaultChecked={this.state.sphericalPowerSign}
									onChange={this.handleToggle.bind(this)}
									icons={{
										checked: '+',
										unchecked: '-',
									}}
								/>
								<FormGroup
									inline={true}
									name="sphericalPower"
									action={this.updateState.bind(this)}
									value={this.state.sphericalPower}
									type="number"
									size="in-4"
								/>
								<Toggle
									name="cylinderPowerSign"
									className='cylinder-power-toggle'
									defaultChecked={this.state.cylinderPowerSign}
									onChange={this.handleToggle.bind(this)}
									icons={{
										checked: '+',
										unchecked: '-',
									}}
								/>
								<FormGroup
									inline={true}
									name="cylinderPower"
									action={this.updateState.bind(this)}
									value={this.state.cylinderPower}
									type="number"
									size="in-4"
								/>
								<FormGroup
									inline={true}
									last={true}
									name="axisOfStigmatism"
									value={this.state.axisOfStigmatism}
									label="X"
									action={this.updateState.bind(this)}
									type="number"
									size="in-4"
								/>
							</div>
						</div>

						<FormGroup
							name="sphericalEquivalent"
							label="Spherical Equivalent"
							value={this.state.sphericalEquivalent}
							action={this.updateState.bind(this)}

						/>
						<FormGroup
							name="desiredRefaction"
							label="Desired Refractive Outcome Post Exchange"
							action={this.updateState.bind(this)}
							value={this.state.desiredRefaction}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col col-12">
						<h4>Biometry With Present IOL</h4>
					</div>
				</div>
				<div className="row">
					<div className="col col-12">
						<FormGroup
							name="axialLength"
							label="Axial Length"
							action={this.updateState.bind(this)}
							value={this.state.axialLength}
							type="number"
							size="first"
						/>

						<div style={{height:'102px'}} className="form-group">
							<div style={{height:'100%'}} className="label">
								<label style={{height:'100%'}}>K Readings After IOL <span className="small">(in diopters)</span></label>

							</div>
							<div className="input">
								<FormGroup
									inline={true}
									name="flatK1"
									label="Flat K1"
									action={this.updateState.bind(this)}
									value={this.state.flatK1}
									type="number"
									size="in-6"
								/>
								<FormGroup
									inline={true}
									last={true}
									name="flatK1Axis"
									label="K1 Axis"
									action={this.updateState.bind(this)}
									value={this.state.flatK1Axis}
									type="number"
									size="in-6"
								/>
								<FormGroup
									inline={true}
									name="steepK2"
									label="Steep K2"
									action={this.updateState.bind(this)}
									value={this.state.steepK2}
									type="number"
									size="in-6"
								/>
								<FormGroup
									inline={true}
									last={true}
									name="steepK2Axis"
									label="K2 Axis"
									action={this.updateState.bind(this)}
									value={this.state.steepK2Axis}
									type="number"
									size="in-6"
								/>
							</div>
						</div>

						<FormGroup
							name="presentIOLAConstant"
							label="A-Constant of Present IOL"
							action={this.updateState.bind(this)}
							value={this.state.presentIOLAConstant}
							type="number"
						/>
						<FormGroup
							name="replacementIOLAConstant"
							label="A-Constant of Replacement IOL"
							action={this.updateState.bind(this)}
							value={this.state.replacementIOLAConstant}
							type="number"
						/>
						<RadioFormGroup
							name="presentIOLPosition"
							label="Position of Present IOL"
							action={this.updateState.bind(this)}
							options={radioOptions}
							value={this.state.presentIOLPosition}
							type="number"
						/>
						<RadioFormGroup
							name="replacementIOLPosition"
							label="Planned Position of Replacement IOL"
							action={this.updateState.bind(this)}
							options={radioOptions}
							value={this.state.replacementIOLPosition}
							type="number"
						/>
						<FormGroup
							name="replacementIOL"
							label="Suggested Replacement IOL Power"
							action={this.updateState.bind(this)}
							value={this.state.replacementIOL}
							type="number"
							size="large"
						/>
					</div>
				</div>
				<div className="row">
					<div className="col col-6">
						<Button
							label="Calculate"
							buttonClass="button-green"
							clickEvent={this.handleCalculateButtonClick.bind(this)}
						/>
					</div>
					<div className="col col-4">
						<Button
							label="Print"
							buttonClass="button-blue"
							clickEvent={this.handleCalculateButtonClick.bind(this)}
						/>
					</div>
					<div className="col col-2">
						<Button
							label="Reset"
							buttonClass="button-red"
							clickEvent={this.handleCalculateButtonClick.bind(this)}
						/>
					</div>
				</div>
			</div>
		);
	}
}
