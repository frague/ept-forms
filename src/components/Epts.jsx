import React, {useState} from 'react'
import { Form } from 'semantic-ui-react'
import { eptsTypes } from '../GraphGenerator'
import ApplicationMenu from '../containers/ApplicationMenu'

function EptSelection({ept, data, path, initialState, isChecked, onClick}) {
	let [ isHovered, setHoverage ] = useState(false);

	let applicableTypes = eptsTypes[ept];
	let isApplicable = applicableTypes.includes(data.meta.type);

	return <span className={ isChecked !== initialState ? 'changed' : undefined }
		onMouseOver={ () => setHoverage(true) } onMouseLeave={ () => setHoverage(false) }>
		{ isApplicable ?
			<Form.Checkbox checked={ isChecked } onClick={ () => onClick(initialState === isChecked ? !isChecked : null) } /> :
			<div className="no-control" /> 
		}
		{ isHovered && <ApplicationMenu ept={ ept } prefix={ path } data={ data }  /> }
	</span>;
}

export const Epts = ({data, path, selectedEpts, applicationSelection, onClick}) => {
	return <div>
		<span>
			{ (data.meta.tags || []).join(', ') }
		</span>
		{
			selectedEpts.map((ept, index) => {
				let key = `${path}:${ept}`;
				let initialState = (data.meta.epts || []).includes(ept);
				let isChecked = applicationSelection.hasOwnProperty(key) ? 
					applicationSelection[key] :
					initialState;
				return <EptSelection key={ index } data={ data } path={ path } initialState={ initialState }
					ept={ ept } isChecked={ isChecked } onClick={ (state) => onClick(path, ept, state) }  />
				}
			)
		}
	</div>
}
