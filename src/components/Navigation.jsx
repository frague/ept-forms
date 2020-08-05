import React from 'react'
import { useHistory } from 'react-router-dom'
import { Icon, Button } from 'semantic-ui-react'

export const Navigation = ({ selectedEpts }) => {
	let history = useHistory();
	let hasEptsSelected = (selectedEpts || []).length > 0;

	return <div className='buttons'>
		<Button icon onClick={ () => history.push("/") }>
			<Icon name='home' />
		</Button>
		<Button icon labelPosition='left' onClick={ () => history.push("/batch") } disabled={ !hasEptsSelected }>
			<Icon name='sitemap' />
			Batch Apply
		</Button>
		<Button icon labelPosition='left' onClick={ () => history.push("/add") }>
			<Icon name='add circle' />
			Add EPT
		</Button>
		<Button icon labelPosition='left' onClick={ () => history.push("/aps") }>
			<Icon name='eye' />
			Application Points
		</Button>
	</div>;
}