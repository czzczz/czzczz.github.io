export const type = (val: any): string => {
	const reg = /(?<=\[object\s).*(?=])/gm;
	const str: string = Object.prototype.toString.call(val);
	return (str.match(reg) || [''])[0];
};

export const isNumber = (val: any): boolean => {
	return type(val) === 'Number';
};

export const isString = (val: any): boolean => {
	return type(val) === 'String';
};

export const isArray = (val: any): boolean => {
	return type(val) === 'Array';
};

export const isSet = (val: any): boolean => {
	return type(val) === 'Set';
};

export const isObject = (val: any): boolean => {
	return type(val) === 'Object';
};

export const isNull = (val: any): boolean => {
	return type(val) === 'Null';
};

export const isUndefined = (val: any): boolean => {
	return type(val) === 'Undefined';
};

export const isFunction = (val: any): boolean => {
	return type(val) === 'Function';
};

export const isBoolean = (val: any): boolean => {
	return type(val) === 'Boolean';
};

export const isPromise = (val: any): boolean => {
	return type(val) === 'Promise';
};

export const isRegExp = (val: any): boolean => {
	return type(val) === 'RegExp';
};

export const isSymbol = (val: any): boolean => {
	return type(val) === 'Symbol';
};

export const isJSON = (val: any): boolean => {
	return type(val) === 'JSON';
};

export const isMath = (val: any): boolean => {
	return type(val) === 'Math';
};

export const isValid = (val: any): boolean => {
	switch (type(val)) {
		case 'Number':
			return val !== 0;
		case 'String':
			return val !== '';
		case 'Boolean':
			return val;
		case 'Array':
			return val.length !== 0;
		case 'Set':
			return val.size !== 0;
		case 'Object':
			return Object.keys(val).filter(k => Object.prototype.hasOwnProperty.call(val, k)).length !== 0;
		case 'Null':
			return false;
		case 'Undefined':
			return false;
		case 'Function':
			return true;
		case 'Promise':
			return true;
		case 'RegExp':
			return true;
		case 'Symbol':
			return true;
		case 'JSON':
			return true;
		case 'Math':
			return true;
		default:
			return false;
	}
};
