import React from 'react';
import { Icon } from 'semantic-ui-react'

export const SelectionMenu = ({ data, prefix, onSelectClick }) => {
	return <div className="menu">
		<Icon name="triangle down" />
		<ul>
			<li>
				<button onClick={ () => onSelectClick(data, prefix, true) }>Select Children</button>
			</li>
			<li>
				<button onClick={ () => onSelectClick(data, prefix, false) }>Deselect Children</button>
			</li>
		</ul>
	</div>
}
