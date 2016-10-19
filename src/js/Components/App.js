import React, { Component } from 'react';
import InlineSVG from 'svg-inline-react/lib';
import moment from 'moment';


import { uuid, updateCaluation } from 'js/calculator';

import FormGroup from 'js/Components/Common/FormGroup';
import RadioFormGroup from 'js/components/Common/RadioFormGroup';
import Graph from 'js/Components/Common/Graph';
import Button from 'js/Components/Common/Button';

import 'sass/setup/reset';
import 'sass/components/app';
import 'sass/components/common/form_group';
import 'sass/components/common/input';

export default class App extends Component {

	constructor (props) {
    super(props);
    //Generate random Id
  	this.state = {
  		id : uuid()
  	}
  }


  updateState (name, value) {
  	var state = this.state
  	state[name] = value;
  	this.setState(state)
  }

  handleCalculateButtonClick () {
  	updateCaluation(this.state);
  }

	render () {

		let radioOptions = [{label:'Bag', value:1}, {label:'Sulcus', value:2}];

		return (
			<div className="root-container">
				<div className="row">
					<div className="col col-6">
						<header>
							<h1>IOL Exchange Calulator</h1>
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
							<Graph />
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
								<FormGroup
									inline={true}
									name="presentIOLRefractionA"
									label="+/-"
									action={this.updateState.bind(this)}
									value={this.state.presentIOLRefractionA}
									type="number"
									size="in-4"
								/>
								<FormGroup
									inline={true}
									name="presentIOLRefractionAB"
									label="+/-"
									action={this.updateState.bind(this)}
									value={this.state.presentIOLRefractionB}
									type="number"
									size="in-4"
								/>
								<FormGroup
									inline={true}
									last={true}
									name="presentIOLRefractionC"
									label="X"
									action={this.updateState.bind(this)}
									value={this.state.presentIOLRefractionC}
									type="number"
									size="in-4"
								/>
							</div>
						</div>

						<FormGroup
							name="sphericalEquivalent"
							label="Spherical Equivalent"
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
								<label style={{height:'100%'}}>K Reading After IOL</label>
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
