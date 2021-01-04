import { isPlainObject } from '@/utils/common/object/plainObject';
import { mergePlainObjects } from '@/utils/common/object/merge';

interface HHTTPpConfig {
	type?: 'get' | 'post' | 'up' | 'down';
	url?: string;
	headers?: HHTTPpHeader;
	query?: HHTTPpQuery;
	data?: HHTTPpData | FormData | string;
	timeout?: number;
}

interface HHTTPpHeader {
	[headerKey: string]: string | undefined;
}

interface HHTTPpQuery {
	[queryKey: string]: string | number | undefined;
}

interface HHTTPpData {
	[queryKey: string]: any;
}

const defaultHeaders: HHTTPpHeader = {
	'Content-Type': 'application/json; charset=UTF-8',
};

const defaultConfig = {
	type: 'get',
	url: '',
	headers: { ...defaultHeaders },
	query: {},
	data: {},
	timeout: 2000,
};

const XHR = () => {
	if (XMLHttpRequest) return new XMLHttpRequest();
	else return new ActiveXObject('Microsoft.XMLHttp');
};

interface HttpResult {
	code: number;
	data: any;
	msg: string;
}

const hHTTPp = (config: HHTTPpConfig): Promise<HttpResult> => {
	return new Promise((resolve, reject) => {
		if (!isPlainObject(config)) reject(new Error('config 仅支持基础 JSON'));
		const cfg: HHTTPpConfig = mergePlainObjects({}, defaultConfig, config);
		const xhr = XHR();
		const url = cfg.url || '';
		let type = cfg.type || 'get';
		const headers = cfg.headers || {};
		const query = cfg.query || {};
		let data = cfg.data || {};
		const timeout = cfg.timeout || 2000;

		if (type === 'get') data = '';
		else if (type === 'post') data = JSON.stringify(data);
		else if (type === 'up') {
			type = 'post';
			headers['Content-Type'] = undefined;
		}

		let queryParamsStr = '';
		if (Object.keys(query).length !== 0)
			queryParamsStr =
				'?' +
				Object.keys(query)
					.map(k => k + '=' + query[k])
					.join('&');
		xhr.open(type, url + queryParamsStr);

		xhr.timeout = timeout;

		Object.keys(headers).forEach(key => {
			xhr.setRequestHeader(key, headers[key]);
		});

		xhr.ontimeout = () => {
			console.log('timeout', timeout);
			reject(new Error('hHTTPp timeout'));
		};

		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4)
				if ([200, 201, 304].includes(xhr.status)) resolve(JSON.parse(xhr.responseText));
				else reject(new Error(xhr.statusText));
		};

		xhr.send(data);
	});
};

interface CreateHHTTPpConfig {
	baseUrl?: string;
	timeout?: number;
}

export const createHHTTPp = ({ baseUrl, timeout }: CreateHHTTPpConfig) => {
	if (baseUrl) baseUrl = baseUrl.replace(/\/$/g, '');
	else baseUrl = '';

	timeout = timeout || 5000;

	const req = async (config: HHTTPpConfig): Promise<HttpResult> => {
		return await hHTTPp({ ...config, url: baseUrl + (config.url || ''), timeout });
	};

	req.get = async (url: string, config?: HHTTPpConfig) => {
		return await req({
			...(config || {}),
			type: 'get',
			url,
		});
	};

	req.post = async (url: string, config?: HHTTPpConfig) => {
		return await req({
			...(config || {}),
			type: 'post',
			url,
		});
	};

	return req;
};
