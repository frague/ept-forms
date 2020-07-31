import React, { useState } from 'react';
import { Icon, Form } from 'semantic-ui-react';
import { generate } from './GraphGenerator';

import { storage } from './storage';

const selection = storage.get('selection', {});
const data = generate();

export const ApplicationPoints = () => {
	let [tags, setTags] = useState('');
	let [epts, setEPTs] = useState('');

	return <div className="application-points">
		<ul>
			<li className="header">
				<div>
					<Icon name="folder open" /> <strong>Fabrique</strong>
				</div>
				<div>
					<span>
						<Form.Input name="tags"
							label="Tags" placeholder="Filter by Tag" 
							onChange={ (e, {value}) => setTags(value) } />
					</span>
					<span>
						<Form.Input name="epts" 
							label="Templates Applied" placeholder="Filter by EPT"
							onChange={ (e, {value}) => setEPTs(value) } />
					</span>
					<span>Selection</span>
				</div>
			</li>
			<Level data={ data } level={ 1 } name="Fabrique" filters={ [tags, epts] } />
		</ul>
	</div>
}

function isFiteredIn(data, tags, epts) {
	if (data.meta && data.meta.tags && data.meta.epts) {
		let [metaTags, metaEPTs] = [data.meta.tags.join(','), data.meta.epts.join(',')];
		if ((!tags || metaTags.includes(tags)) && (!epts || metaEPTs.includes(epts))) return true;
	}
	if (!data.children) return false;
	return Object.entries(data.children).some(([key, value]) => isFiteredIn(value, tags, epts));
}

const Level = ({data, level, name, filters}) => {
	let [state, setState] = useState({});

	let hasFilters = filters && (filters[0] || filters[1]);

	let children = data.children;
	if ((filters[0] !== '' || filters[1] !== '')) {
		children = Object.entries(data.children).reduce((result, [key, value]) => {
			if (isFiteredIn(value, ...filters)) {
				result[key] = value;
			}
			return result;
		}, {});
	}

	let keys = Object.keys(children || {});
	if (!keys.length) return null;

	return keys
			.sort()
			.map(key => {
				let nextLevel = children[key];
				let isExpanded = hasFilters || state[key] || false;
				let id = `${name}.${key}`;
				return [
					<li key={ id }>
						<div className={ `l${level}` }>
							<button onClick={ () => setState(Object.assign({}, state, {[key]: !isExpanded})) }>
								{ isExpanded ? <Icon name="triangle down" /> : <Icon name="triangle right" /> }
								{ key }
							</button>
						</div>
						<Meta data={ nextLevel.meta } path={ id } />
					</li>,
					isExpanded ? <Level key={ key } data={ nextLevel } level={ 1 + level } name={ id } filters={ filters } /> : null
				]
			}) || null;
}

function select(path, state) {
	if (state) selection[path] = state
	else delete selection[path];
}

const Meta = ({data, path}) => {
	let [isSelected, setSelection] = useState(false);

	if (!data || Object.keys(data).length === 0) {
		data = {
			tags: [],
			epts: []
		};
	}
	return <div>
		<span>{ data.tags.join(', ') }</span>
		<span>{ data.epts.join(', ') }</span>
		<span>
			<Form.Checkbox checked={ isSelected } onChange={ () => {setSelection(!isSelected); select(path, !isSelected)} } />
			{ isSelected && <Icon name="triangle down" /> }
		</span>
	</div>
}