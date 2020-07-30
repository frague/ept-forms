const amounts = {
	pod: 10,
	rack: 20,
	leaf: 1, 
	interface: 5, 
	subinterface: 2,
	'routing session': 1,
	'routing policy': 1
};

const inheritance = [
	'pod',
	'rack',
	'leaf',
	'interface',
	'subinterface',
	// 'routing session',
	// 'routing policy'
];

function generateLevel(types) {
	let type = types.shift();
	if (!type) return {};

	let children = [...Array(amounts[type])].reduce((result, x, index) => {
		result[`${type}${ ('000' + (index + 1)).substr(-3) }`] = generateLevel([...types]);
		return result;
	}, {});
	let meta = {};
	if (type === 'interface' && Math.random() > 0.6) {
		meta = {
			tags: ['tag1', 'tag3', 'tagXX'],
			epts: ['ept1', 'ept5']
		};
	}
	return { children, meta };
}

export const generate = () => {
	return generateLevel([...inheritance]);
}