export var epts = [
	{
		'id': 1,
		'type': 'primitive',
		'label': 'Subinterface',
		'tags': [],
		'node': '',
		'parameters': {
			'security_zone': '',
			'vlan_id': ''
		},
		'input_types': ['interface'],
		'output_type': 'interface',
		'basic': true,
	},
	{
		'id': 2,
		'type': 'primitive',
		'label': 'Attach VLAN',
		'tags': [],
		'node': '',
		'parameters': {
			'vlan_id': ''
		},
		'input_types': ['interface'],
		'output_type': 'interface',
	},
	{
		'id': 3,
		'type': 'primitive',
		'label': 'Address type',
		'tags': [],
		'node': '',
		'parameters': {
			'IPv4': '',
			'IPv6': ''
		},
		'input_types': ['interface', 'subinterface'],
		'output_type': 'routable interface',
	},
	{
		'id': 4,
		'type': 'primitive',
		'label': 'BGP unnumbered',
		'tags': [],
		'node': '',
		'parameters': {
			'timeout': ''
		},
		'input_types': ['interface', 'subinterface'],
		'output_type': 'interface',
	},
	{
		'id': 5,
		'type': 'primitive',
		'label': 'Routing policy',
		'tags': [],
		'node': '',
		'parameters': {
			'import/export': ''
		},
		'input_types': ['routable interface'],
		'output_type': 'routing session',
	},
	{
		'id': 7,
		'type': 'primitive',
		'label': 'IP Interface',
		'tags': [],
		'node': '',
		'parameters': {
			'type': {
				'value': '',
				'values': [
					"IPv4",
					"IPv6",
					"IPv6 Link Local (auto)",
				]
			},
			'allocation_scheme': {
				'value': '',
				'values': [
					'Manual', 'AOS Pool'
				]
			},
			'resource_pool': ''
		},
		'input_types': ['interface'],
		'output_type': 'routable interface',
	},
	{
		'id': 100,
		'type': 'custom',
		'label': 'Std2SI-BGP',
		'tags': [],
		'node': '',
		'parameters': {
			'some parameter': ''
		},
		'input_types': ['any'],
		'output_type': 'any',
	},
]