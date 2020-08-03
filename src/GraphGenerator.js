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

function generateLevel(currentType, types) {
	let type = types.shift();
	if (!type) return {
		meta: {
			type: currentType
		}
	};

	let children = [...Array(amounts[type])].reduce((result, x, index) => {
		result[`${type}${ ('000' + (index + 1)).substr(-3) }`] = generateLevel(type, [...types]);
		return result;
	}, {});
	let meta = {};
	if (Math.random() > 0.3) {
		meta = {
			tags: ['red', 'green', 'blue', 'orange', 'magenta', 'brown', 'black'].filter(() => Math.random() > 0.8),
			epts: ['VLAN10', 'VLAN20', 'Subif100', 'Subif200', 'Std2-SI-BGP'].filter(() => Math.random() > 0.95)
		};
	}
	meta.type = currentType;
	return { children, meta };
}

export const deepClone = (source, prefix, find=[], found={}) => {
	let meta = source.meta || {};
	return {
		meta: {
			epts: [...(meta.epts || [])],
			tags: [...(meta.tags || [])],
			type: meta.type
		},
		children: Object.entries(source.children || {}).reduce((result, [name, value]) => {
			let path = `${prefix}.${name}`;
			let cloned = deepClone(value, path, find, found);
			if (find.includes(path)) found[path] = cloned;
			result[name] = cloned;
			return result;
		}, {})
	};
}

export const generate = () => {
	return generateLevel(null, [...inheritance]);
}