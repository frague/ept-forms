import React, { useState } from 'react'
import { Icon, Form, Button } from 'semantic-ui-react'
import { generate } from '../GraphGenerator'

import Meta from '../containers/Meta'

const data = generate();

export const ApplicationPoints = ({selection}) => {
	let [tags, setTags] = useState('');
	let [epts, setEPTs] = useState('');
	let hasSelection = Object.keys(selection).length > 0;

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
		<Actions isDisabled={ !hasSelection } />
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
						<Meta data={ nextLevel } path={ id } />
					</li>,
					isExpanded ? <Level key={ key } data={ nextLevel } level={ 1 + level } name={ id } filters={ filters } /> : null
				]
			}) || null;
}

const Actions = ({isDisabled}) => {
	return <div className="actions">
		<Form>
			<Form.Group inline>
				<Form.Select label="With selected: " options={ [{text: 'Apply EPT', value: 1}] } disabled={ isDisabled } />
				<Button disabled={ isDisabled }>Apply</Button>
			</Form.Group>
		</Form>
	</div>
}
