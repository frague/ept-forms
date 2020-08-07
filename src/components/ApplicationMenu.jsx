import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react'

export const ApplicationMenu = ({ data, prefix, ept, onApplyToChildrenClick }) => {
	let [ isExpanded, setExpansion ] = useState(false);
	
	return <div className="menu" onMouseLeave={ () => setExpansion(false) }>
		<Icon name="triangle down" onClick={ () => setExpansion(!isExpanded) } />
		{ isExpanded && <ul>
			<li>
				<button onClick={ () => onApplyToChildrenClick(data, prefix, ept, true) }>Apply to Children</button>
			</li>
			<li>
				<button onClick={ () => onApplyToChildrenClick(data, prefix, ept, 1) }>Apply to the Next Level</button>
			</li>
			<li>
				<button onClick={ () => onApplyToChildrenClick(data, prefix, ept, false) }>Revoke for Children</button>
			</li>
			<li>
				<button onClick={ () => onApplyToChildrenClick(data, prefix, ept, null) }>Reset for Children</button>
			</li>
		</ul> }
	</div>
}
