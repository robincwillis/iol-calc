
export const uuid = () => {
	function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + '-' + s4() + '-' + s4() + '-' + s4();
}

export const updateCalcuation = (state) => {

	if (state.flatK1 && state.steepK2) {
		state.avgK = (state.flatK1 + state.steepK2) / 2;
	} else {
		state.avgK = null;
	}

	if (state.avgK) {
		state.avgCornealRadius = 337.5 / state.avgK;
	} else {
		state.avgCornealRadius = null;
	}

	if (state.axialLength) {
		state.retThickness = 0.65696 - 0.02029 * state.axialLength;
	} else {
		state.retThickness = null;
	}

	if (state.axialLength && state.retThickness) {
		state.optAxialLength = state.axialLength + state.retThickness;
	} else {
		state.optAxialLength = null;
	}

	if (state.axialLength) {
		state.axialLengthCorrected = state.axialLength > 24.2 ? -3.446 + 1.716 * state.axialLength - 0.0237 * ( Math.pow(state.axialLength,2)) : state.axialLength;
	} else {
		state.axialLengthCorrected = null;
	}

	if (state.axialLengthCorrected && state.avgK) {
		state.cornealWidth = -5.40948 + 0.58412 * state.axialLengthCorrected + 0.098 * state.avgK;
	} else {
		state.cornealWidth = null;
	}

	if (state.avgCornealRadius && state.cornealWidth) {
		state.cornealHeight =  Math.sqrt( state.avgCornealRadius * state.avgCornealRadius - ( (state.cornealWidth * state.cornealWidth ) / 4 ) < 0 ? 0  : ( state.avgCornealRadius * state.avgCornealRadius - ( (state.cornealWidth * state.cornealWidth ) / 4 ) ))
	} else {
		state.cornealHeight = null;
	}

	if (state.presentIOLAConstant) {
		state.specificIOLAConstant = state.presentIOLAConstant * 0.62467 - 68.74709;
	} else {
		state.specificIOLAConstant = null;
	}

	if (state.specificIOLAConstant) {
		state.cornealOffset = state.specificIOLAConstant - 3.3357;
	} else {
		state.cornealOffset = null;
	}

	if (state.cornealHeight && state.cornealOffset) {
		state.postOperativeACD = state.cornealHeight + state.cornealOffset;
	} else {
		state.postOperativeACD = null;
	}

	if(state.avgCornealRadius && state.optAxialLength && state.postOperativeACD ) {
		state.emmetropiaIOLPower = ( 1000 * 1.336 * ( 1.336 * state.avgCornealRadius - 0.333 * state.optAxialLength) ) / ( ( state.optAxialLength - state.postOperativeACD ) * ( 1.336 * state.avgCornealRadius - 0.333 * state.postOperativeACD) );
	} else {
		state.emmetropiaIOLPower = null;
	}

	//ametropiaIOLPower


	if (state.avgCornealRadius && state.optAxialLength && state.postOperativeACD && state.emmetropiaIOLPower) {
		let desiredRefaction = ( 1000 * 1.336 * (1.336 * state.avgCornealRadius -0.333 * state.optAxialLength) - state.emmetropiaIOLPower * (state.optAxialLength - state.postOperativeACD) * (1.336 * state.avgCornealRadius -0.333 * state.postOperativeACD )) / (1.336 * (12 * (1.336 * state.avgCornealRadius -0.333 * state.optAxialLength) + state.optAxialLength * state.avgCornealRadius ) -0.001 * state.emmetropiaIOLPower * (state.optAxialLength - state.postOperativeACD) * (12 * ( 1.336 * state.avgCornealRadius - 0.333 * state.postOperativeACD ) + state.postOperativeACD * state.avgCornealRadius ));
		state.desiredRefaction = Number(desiredRefaction.toFixed(2));
	} else {
		state.desiredRefaction = null;
	}

	if(state.emmetropiaIOLPower) {
		state.replacementIOL = Number(state.emmetropiaIOLPower.toFixed(2));
	} else {
		state.replacementIOL = null;
	}

	return state;
}

export const validateInput = (name, value) => {

	var valid = true;

	switch(name){
		case 'presentIOL':
			if(value > 35 || value < 5){
				valid = false;
			}
			break;
		case 'desiredRefaction':
		case 'presentIOLRefractionA':
		case 'presentIOLRefractionB':
			if(value > 5 || value < -5){
				valid = false
			}
		break;
		case 'presentIOLRefractionC':
			if(value > 180 || value < 0){
				valid = false;
			}
			break;
		case 'sphericalEquivalent':
			if( value > 6 || value < -6){
				valid = false;
			}
			break;
		case 'axialLength':
			if( value > 30 || value < 10 ){
				valid = false
			}
			break;
		case 'flatK1':
		case 'steepK2':
			if( value > 50 || value < 35) {
				valid = false
			}
			break;
		case 'flatK1Axis':
		case 'steepK2Axis':
			if( value > 360 || value < 0) {
				valid = false
			}
			break;
		case 'presentIOLAConstant':
		case 'replacementIOLAConstant':
			if( value > 119.5 || value < 115.5) {
				valid = false
			}
			break;
	}

	return valid;
}

export const getSphericalEquivalent = (sphericalPower, cylinderPower, sphericalPowerSign, cylinderPowerSign)=> {
	let a = Number(sphericalPower);
	let b = Number(cylinderPower);

	if(sphericalPowerSign === false) {
		a = a * -1;
	}

	if(cylinderPowerSign === false) {
		b = b * -1;
	}

	return a + (b/2);
}