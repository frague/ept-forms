import React, { useState } from 'react'
import { Icon, Form } from 'semantic-ui-react'

import { Epts } from '../components/Epts'
import Actions from '../containers/Actions'

export const BatchApply = ({selection, data, selectedEpts}) => {
	let [tags, setTags] = useState('');
	let [epts, setEPTs] = useState('');
	let hasSelection = Object.keys(selection).length > 0;

	let selected = Object.keys(selection).length || 'No';

	return [
		<h1>{ selected } node{ selected !== 1 ? 's' : '' } selected</h1>,
		<div className="application-points">
			<ul className="epts">
				<li className="header">
					<div>
						<Icon name="folder open" /> <strong>Fabrique</strong>
					</div>
					<div>
						<span>Tags</span>
						{
							selectedEpts.map(ept => <span>{ ept }</span>)
						}
					</div>
				</li>
				<Level key="top" data={ data } level={ 1 } name="Fabrique" epts={ selectedEpts } />
			</ul>
			<Actions isDisabled={ !hasSelection } selection={ selection } />
		</div>
	]
}

function isFiteredIn(data, tags, epts) {
	if (data.meta && data.meta.tags && data.meta.epts) {
		let [metaTags, metaEPTs] = [data.meta.tags.join(','), data.meta.epts.join(',')];
		if ((!tags || metaTags.includes(tags)) && (!epts || metaEPTs.includes(epts))) return true;
	}
	if (!data.children) return false;
	return Object.entries(data.children).some(([key, value]) => isFiteredIn(value, tags, epts));
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
						<Epts epts={ epts } tags={ ['tag1', 'tag2' ] } />
					</li>,
					isExpanded ? <Level key={ `${id}.${level} level` } data={ nextLevel } level={ 1 + level } name={ id } epts={ epts } /> : null
				]
			}) || null;
}

