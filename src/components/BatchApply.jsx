import React, { useState } from 'react'
import { Icon, Button } from 'semantic-ui-react'

import Epts from '../containers/Epts'

export const BatchApply = ({applicationSelection, data, selectedEpts}) => {
	let hasChanges = Object.keys(applicationSelection).length > 0;
	return [
		<h1>Batch EPT Application: { selectedEpts.join(', ') }</h1>,
		<div className="application-points">
			<ul className="epts">
				<li className="header">
					<div>
						<Icon name="folder open" /> <strong>Fabrique</strong>
					</div>
					<div>
						<span>Tags</span>
						{
							selectedEpts.map((ept, index) => <span key={ index }>{ ept }</span>)
						}
					</div>
				</li>
				<Level key="top" data={ data } level={ 1 } name="Fabrique" epts={ selectedEpts } />
			</ul>
			<div className={ 'actions buttons' + (hasChanges ? ' sticky' : '') }>
				<Button>Apply Changes</Button>
			</div>
		</div>
	]
}

const Level = ({data, level, name, epts}) => {
	let [state, setState] = useState({});

	let children = data.children || {};

	let keys = Object.keys(children);
	if (!keys.length) return null;

	return keys
			.sort()
			.map(key => {
				let nextLevel = children[key];
				let isExpanded = state[key] || false;
				let id = `${name}.${key}`;
				return [
					<li key={ id }>
						<div className={ `l${level}` }>
							<button onClick={ () => setState(Object.assign({}, state, {[key]: !isExpanded})) }>
								{ isExpanded ? <Icon name="triangle down" /> : <Icon name="triangle right" /> }
								{ key }
							</button>
						</div>
						<Epts path={ id } data={ nextLevel } />
					</li>,
					isExpanded ? <Level key={ `${id}.${level} level` } data={ nextLevel } level={ 1 + level } name={ id } epts={ epts } /> : null
				]
			}) || null;
}

