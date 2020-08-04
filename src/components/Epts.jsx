import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import SelectionMenu from '../containers/SelectionMenu'
import TransferMenu from '../containers/TransferMenu'

export const Epts = ({epts, tags}) => {
	return <div>
		<span>
			{ (tags || []).join(', ') }
		</span>
		{
			epts.map(ept => <span>
				<Form.Checkbox />
			</span>)
		}
	</div>
}
