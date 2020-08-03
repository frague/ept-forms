import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import SelectionMenu from '../containers/SelectionMenu'
import TransferMenu from '../containers/TransferMenu'

export const Meta = ({data, nodeData, path, selection, onSelectClick}) => {
	let [ isHovered, setHoverage ] = useState(false);
	let { meta } = nodeData;

	let isSelected = selection.hasOwnProperty(path);

	let selected = Object.keys(selection);
	let firstSelected = selected.length > 0 ? selected[0] : null;

	let canTransferEPTs = !isSelected &&
		selected.length === 1 &&
		selection[firstSelected] === meta.type &&
		meta.epts &&
		meta.epts.length > 0;

	return <div>
		<span onMouseOver={ () => setHoverage(true) } onMouseLeave={ () => setHoverage(false) }>
			<Form.Checkbox checked={ isSelected } onChange={ () => onSelectClick(path, isSelected ? false : meta.type) } />
			{ isHovered && <SelectionMenu data={ nodeData } prefix={ path } /> }
		</span>
		<span>
			{ (meta.epts || []).join(', ') }
			{ canTransferEPTs && <TransferMenu fromPath={ path } toPath={ firstSelected } /> }
			
		</span>
		<span>{ (meta.tags || []).join(', ') }</span>
	</div>
}
