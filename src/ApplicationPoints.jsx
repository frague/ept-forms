import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { generate } from './GraphGenerator';

export const ApplicationPoints = () => {
	return <div className="application-points">
		<ul>
			<li>
				<div className="header">
					<span>Tags</span>
					<span>Templates Applied</span>
				</div>
				<Icon name="folder open" /> <strong>Fabrique</strong>
			</li>
			<Level data={ generate() } level={ 1 } />
		</ul>
	</div>
}

const Level = ({data, level}) => {
	let [state, setState] = useState({});

	let keys = Object.keys(data.children || {});
	if (!keys.length) return null;

	return keys
			.sort()
			.map(key => {
				let nextLevel = data.children[key];
				let isExpanded = state[key] || false;
				return [
					<li key={ key } className={ `l${level}` }>
						{ renderData(data.meta) }
						<a onClick={ () => setState(Object.assign({}, state, {[key]: !isExpanded})) }>
							{isExpanded ? <Icon name="triangle down" /> : <Icon name="triangle right" />}
							{ key }
						</a>
					</li>,
					isExpanded ? <Level data={ nextLevel } level={ 1 + level } /> : null
				]
			}) || null;
}

function renderData(meta) {
	if (!meta || Object.keys(meta).length === 0) return <div><span>&nbsp;</span><span>&nbsp;</span></div>;
	return <div>
		<span>{ meta.tags.join(', ') }</span>
		<span>{ meta.epts.join(', ') }</span>
	</div>
}