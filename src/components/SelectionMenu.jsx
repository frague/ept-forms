import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react'

export const SelectionMenu = ({ data, prefix, onSelectChildrenClick }) => {
	let [ isExpanded, setExpansion ] = useState(false);
	
	return <div className="menu">
		<Icon name="triangle down" onClick={ () => setExpansion(!isExpanded) } />
		{ isExpanded && <ul>
			<li>
				<button onClick={ () => onSelectChildrenClick(data, prefix, true) }>Select Children</button>
			</li>
			<li>
				<button onClick={ () => onSelectChildrenClick(data, prefix, 1) }>Select Next Level</button>
			</li>
			<li>
				<button onClick={ () => onSelectChildrenClick(data, prefix, false) }>Deselect Children</button>
			</li>
		</ul> }
	</div>
}
