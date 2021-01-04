import { isObject } from '@/utils/common/type';

export const isPlainObject = (val: any): boolean => {
	return isObject(val) && Object.getPrototypeOf(val) === Object.prototype;
};
