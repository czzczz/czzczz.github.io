import { type } from '@/utils/common/type';
import { isPlainObject } from '@/utils/common/object/plainObject';

export const mergePlainObject = (baseObj: any, wrapperObj: any, deepCopy = false): any => {
	if (!isPlainObject(baseObj) || !isPlainObject(wrapperObj)) throw new Error('参数必须为基础JSON');
	const res = deepCopy ? JSON.parse(JSON.stringify(baseObj)) : baseObj;
	Object.keys(wrapperObj).forEach(k => {
		// 原对象不存在该字段，直接赋值
		if (!Object.prototype.hasOwnProperty.call(baseObj, k)) res[k] = wrapperObj[k];
		else {
			const type1 = type(baseObj[k]),
				type2 = type(wrapperObj[k]);
			if (type1 !== type2) res[k] = wrapperObj[k];
			else if (type1 === 'Array') res[k] = baseObj[k].concat(wrapperObj[k]);
			else if (type1 === 'Set') res[k] = new Set([...baseObj[k], ...wrapperObj[k]]);
			else if (isPlainObject(baseObj[k]) && isPlainObject(wrapperObj[k]))
				res[k] = mergePlainObject(baseObj[k], wrapperObj[k]);
			else res[k] = wrapperObj[k];
		}
	});
	return res;
};

export const mergePlainObjects = (baseObj: any, ...otherObjs: any[]): any => {
	const res = mergePlainObject({}, baseObj);
	otherObjs.forEach(obj => mergePlainObject(res, obj));
	return res;
};

// export default mergePlainObject;
