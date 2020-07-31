import React, { useState } from 'react'
import { Icon, Form } from 'semantic-ui-react'
import SelectionMenu from '../containers/SelectionMenu'

export const Meta = ({data, path, selection, onSelectClick}) => {
	let [isMenuShown, toggleMenu] = useState(false);

	let { children, meta } = data;

	if (!meta || Object.keys(meta).length === 0) {
		meta = {
			tags: [],
			epts: []
		};
	}

	let isSelected = !!selection[path];

	return <div>
		<span>{ meta.tags.join(', ') }</span>
		<span>{ meta.epts.join(', ') }</span>
		<span>
			<Form.Checkbox checked={ isSelected } onChange={ () => onSelectClick(path, !isSelected) } />
			<SelectionMenu data={ data } prefix={ path } />
		</span>
	</div>
}
