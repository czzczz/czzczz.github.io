export interface ThemeColors {
	[keyName: string]: string;
}

export interface ShutBThemeColors extends ThemeColors {
	textColor: string;
	borderColor: string;
	borderColorDeep: string;
	primaryLighter: string;
	primary: string;
	primaryDeeper: string;
	success: string;
	info: string;
	warning: string;
	error: string;
}

export const defaultThemeColors: ShutBThemeColors = {
	textColor: '#666',
	borderColor: '#ccc',
	borderColorDeep: '#999',
	primaryLighter: '#269ce7',
	primary: '#0181c9',
	primaryDeeper: '#006399',
	success: '#76ee65',
	info: '#8e8b8b',
	warning: '#eeb96e',
	error: '#ef5858',
};

let shutBThemeSeted = false;

export const hasTheme = (themeColors: ThemeColors = defaultThemeColors, element: Element = document.body): boolean => {
	let has = true;
	if (shutBThemeSeted) return true;
	const elStyle = getComputedStyle(element);
	Object.keys(themeColors).forEach(keyName => {
		if (!elStyle.getPropertyValue(`--${keyName}`)) has = false;
	});
	if (has) shutBThemeSeted = true;
	return has;
};

export const setTheme = (
	themeColors: ThemeColors = defaultThemeColors,
	element: Element = document.body,
	isInit = false,
): void => {
	Object.keys(themeColors).forEach(keyName => {
		(element as HTMLElement).style.setProperty(`--${keyName}`, themeColors[keyName], 'important');
	});
	if (isInit) shutBThemeSeted = true;
};
