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
	if (type === 'subinterface' && Math.random() > 0.3) {
		meta = {
			tags: ['red', 'green', 'blue', 'orange', 'magenta', 'brown', 'black'].filter(() => Math.random() > 0.3),
			epts: ['VLAN10', 'VLAN20', 'Subif100', 'Subif200', 'Std2-SI-BGP'].filter(() => Math.random() > 0.6)
		};
	}
	return { children, meta };
}

export const generate = () => {
	return generateLevel([...inheritance]);
}