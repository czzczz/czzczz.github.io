const fs = require('fs');
const path = require('path');

const BASE_DIR = 'src/notes';
const BASE_ROOT = '.';

function initMdImageBase(dir, imageRoot) {
	const files = fs.readdirSync(dir);
	files.forEach(file => {
		if (file.startsWith('.')) return;
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);
		if (stat.isDirectory()) initMdImageBase(filePath, path.join(imageRoot, file));
		if (stat.isFile() && /.md$/.test(file)) {
			console.log('md file:', filePath);
			const fileContent = fs.readFileSync(filePath).toString();
			fs.writeFileSync(
				filePath,
				`<!-- imageRoot:${imageRoot} -->\n\n` +
					fileContent.replace(/<!--\s*imageRoot:\s*(\w|\.|\\|\/)*\s* -->\s*/, ''),
			);
		}
	});
}

initMdImageBase(BASE_DIR, BASE_ROOT);
