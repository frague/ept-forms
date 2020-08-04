import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react'

export const TransferMenu = ({ data, fromPath, toPath, transferEPTsClick }) => {
	let [ isExpanded, setExpansion ] = useState(false);
	
	return <div className="menu" onMouseLeave={ () => setExpansion(false) }>
		<Icon name="triangle down" onClick={ () => setExpansion(!isExpanded) } />
		{ isExpanded && <ul>
			<li>
				<button onClick={ () => transferEPTsClick(fromPath, toPath) }>Transfer EPTs to the selected node</button>
			</li>
		</ul> }
	</div>
}
