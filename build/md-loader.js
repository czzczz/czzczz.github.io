const markdown = require('markdown-it');
const cheerio = require('cheerio');
const hljs = require('highlight.js');

function renderVueTemplate(html) {
	const $ = cheerio.load(html, {
		decodeEntities: false,
		lowerCaseAttributeNames: false,
		lowerCaseTags: false,
	});

	const output = {
		style: $.html('style'),
		script: $.html($('script').first()),
	};
	$('style').remove();
	$('script').remove();
	const result =
		`<template><section class="markdown-body">` +
		$.html() +
		`</section></template>\n` +
		output.style +
		'\n' +
		output.script;

	return result;
}

function markdownLoader(val) {
	this.cacheable && this.cacheable();

	const opt = {
		preset: 'default',
		html: true,
		// 根据语言添加对应的 highlight
		highlight: (str, lang) => (!(lang && hljs.getLanguage(lang)) ? str : hljs.highlight(lang, str, true).value),
	};

	const parser = markdown(opt.preset, opt);
	// 开始解析MD
	let content = parser.render(val.replace(/@/g, 'at__')).replace(/at__/g, '@');

	let imageRoot = '.';
	content = content.replace(/<!--\s*imageRoot:\s*(\w+)\s*-->/, (m, root) => {
		imageRoot = root;
		return m;
	});

	content = content.replace(/\ssrc="(.*?)"/g, (match, path) => {
		return ` src="${'@/notes/' + imageRoot + '/' + decodeURIComponent(path)}"`;
	});

	// 保留md中定义的插槽，作为解析完成的Vue Component的插槽
	content = content.replace(/&lt;slot[\s\S]*?&gt;&lt;\/slot&gt;/gi, v => {
		v = v
			.replace(/_&/g, ' ')
			.replace(/&quot;/g, '"')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&amp;/g, '&');
		return v;
	});

	return renderVueTemplate(content);
}

module.exports = markdownLoader;
