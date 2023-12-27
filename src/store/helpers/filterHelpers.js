export function doesBikeMatchOneFilter(bike, property, filterVal) {
	if (!filterVal) return true;
	return bike[property].toLowerCase().includes(filterVal.toLowerCase());
}

export function doesBikeMatchNumberFilter(bike, property, filterMin, filterMax) {
	const propVal = parseInt(bike[property]);
	const min = parseInt(filterMin);
	const max = parseInt(filterMax);
	if (!min && !max) return true;
	if (min && max) {
		return (propVal) <= max && propVal >= min;
	} else if (!min && max){
		return (propVal <= max );
	} else if (min && !max){
		return propVal >= min;
	}
}

export function doesBikeMatchArrayFilter(bike, property, array) {
	if (!array.length) return true;
	return array.some(elem => bike[property].toLowerCase().includes(elem.toLowerCase()));
}