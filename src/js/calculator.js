
export const uuid = () => {
	function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + '-' + s4() + '-' + s4() + '-' + s4();
}

export const updateCaluation = (state) => {
	console.log(state);
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
			if( value > 119.5 || value < 117.5) {
				valid = false
			}
			break;
	}

	return valid;
}