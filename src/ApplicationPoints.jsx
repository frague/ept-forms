import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { generate } from './GraphGenerator';

export const ApplicationPoints = () => {
	return <div className="application-points">
		<Level data={ generate() } />
	</div>
}

const Level = ({data}) => {
	let [state, setState] = useState({});

	let keys = Object.keys(data.children || {});
	if (!keys.length) return null;

	return <ul>{
		keys
			.sort()
			.map(key => {
				let nextLevel = data.children[key];
				let isExpanded = state[key] || false;
				return <li key={ key }>
					{ renderData(data.meta) }
					<a onClick={ () => setState(Object.assign({}, state, {[key]: !isExpanded})) }>
						{isExpanded ? <Icon name="triangle down" /> : <Icon name="triangle right" />}
						{ key }
					</a>
					{ isExpanded && <Level data={ nextLevel } /> }
				</li>
			}) 
		}</ul>
}

function renderData(meta) {
	if (!meta || Object.keys(meta).length === 0) return null;
	return <div>
		<span>Tags: { meta.tags.join(', ') }</span>
		<span>EPTs applied: { meta.epts.join(', ') }</span>
	</div>
}