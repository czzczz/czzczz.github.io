export const getRootFontSize = (name = 'fontSize', element: Element = document.body): string => {
	return getComputedStyle(element).getPropertyValue(`--${name}`);
};

export const setRootFontSize = (size: number, name = 'fontSize'): void => {
	document.documentElement.style.setProperty(`--${name}`, `${size}px`, 'important');
};
