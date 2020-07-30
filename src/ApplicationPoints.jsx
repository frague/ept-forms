import React, { useState } from 'react';
import { Icon, Form } from 'semantic-ui-react';
import { generate } from './GraphGenerator';

export const ApplicationPoints = () => {
	return <div className="application-points">
		<ul>
			<li key="a">
				<div>
					<Icon name="folder open" /> <strong>Fabrique</strong>
				</div>
				<div className="header">
					<span>Tags</span>
					<span>Templates Applied</span>
					<span>Selection</span>
				</div>
			</li>
			<Level data={ generate() } level={ 1 } name="Fabrique" />
		</ul>
	</div>
}

const Level = ({data, level, name}) => {
	let [state, setState] = useState({});

	let keys = Object.keys(data.children || {});
	if (!keys.length) return null;

	return keys
			.sort()
			.map(key => {
				let nextLevel = data.children[key];
				let isExpanded = state[key] || false;
				let id = `${name}.${key}`;
				return [
					<li key={ id }>
						<div className={ `l${level}` }>
							<button onClick={ () => setState(Object.assign({}, state, {[key]: !isExpanded})) }>
								{isExpanded ? <Icon name="triangle down" /> : <Icon name="triangle right" />}
								{ key }
							</button>
						</div>
						<Meta data={ nextLevel.meta } />
					</li>,
					isExpanded ? <Level key={ key } data={ nextLevel } level={ 1 + level } name={ id } /> : null
				]
			}) || null;
}

const Meta = ({data}) => {
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
			<Form.Checkbox checked={ isSelected } onChange={ () => setSelection(!isSelected) } />
			{ isSelected && <Icon name="triangle down" /> }
		</span>
	</div>
}