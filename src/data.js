export var epts = [
	{
		'id': 1,
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
		'label': 'Routing policy',
		'tags': [],
		'node': '',
		'parameters': {
			'import/export': ''
		},
		'input_types': ['routable interface'],
		'output_type': 'routing session',
	},
]