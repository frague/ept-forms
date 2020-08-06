import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react'
import { applicableEpts } from '../GraphGenerator'

const actions = [
	{text: 'Apply EPT', value: 'apply'},
	{text: 'Flush EPTs', value: 'flush'}
];

export const Actions = ({isDisabled, data, selection, flushEpts, applyEpt}) => {
	let [ action, setAction ] = useState('');
	let [ ept, setEpt ] = useState('');

	let types = Object.keys(Object.values(selection).reduce((result, type) => {
		result[type] = true;
		return result;
	}, {}));

	let executors = {
		apply: () => applyEpt(selection, ept),
		flush: () => flushEpts(selection)
	};

	return <div className={ 'actions' + (isDisabled ? '' : ' sticky') }>
		<Form>
			<Form.Group inline>
				<Form.Select label="With selected: " 
					options={ actions }
					onChange={ (e, {value}) => setAction(value) }
					disabled={ isDisabled } />
				{ action === 'apply' && <Form.Select options={ getEptsFor(types) }
					onChange={ (e, {value}) => setEpt(value) }
					disabled={ isDisabled }
					/> }
				<Button disabled={ isDisabled || (action === 'apply' && !ept) }
					onClick={ () => executors[action]() }>Apply</Button>
			</Form.Group>
		</Form>
	</div>
}

function getEptsFor(types) {
	let typesLen = types.length;
	let arrays = [].concat(...types.map(type => applicableEpts[type]));
	let counter = {};
	return arrays.reduce((result, ept) => {
		let count = (counter[ept] || 0) + 1;
		if (count === typesLen) result.push({text: ept, value: ept});
		counter[ept] = count;
		return result;
	}, []);
}
