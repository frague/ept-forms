const _key = 'dummyStorage';
const init = () => {
	if (!window.hasOwnProperty(_key)) {
		window[_key] = {};
	}
};

const get = (key, initial=null) => {
	init();
	return key in window[_key] ? window[_key][key] : set(key, initial);
};

const set = (key, value) => {
	init();
	window[_key][key] = value;
	return value;
}

export const storage = {
	get, set
};