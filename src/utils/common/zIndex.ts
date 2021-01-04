export const nextZIndex = (min = 5000, max = 100000) => {
	let z = min;
	[...document.querySelectorAll('body > *')].forEach(el => {
		const elZIndex = +getComputedStyle(el).zIndex || 0;
		elZIndex > z && elZIndex <= max && (z = elZIndex);
	});
	return z + 1;
};
