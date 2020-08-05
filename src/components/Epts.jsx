import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import { eptsTypes } from '../GraphGenerator'

function EptSelection({ept, meta}) {
	let initialState = (meta.epts || []).includes(ept);
	let [isChecked, check] = useState(initialState);

	let applicableTypes = eptsTypes[ept];
	let isApplicable = applicableTypes.includes(meta.type);

	return <span className={ isChecked !== initialState ? 'changed' : undefined }>
		{isApplicable && <Form.Checkbox checked={ isChecked } onClick={ (e, {checked}) => check(checked) } /> }
	</span>;
}

export const Epts = ({meta, selectedEpts}) => {
	return <div>
		<span>
			{ (meta.tags || []).join(', ') }
		</span>
		{
			selectedEpts.map((ept, index) => <EptSelection key={ index } meta={ meta } ept={ ept } />)
		}
	</div>
}
