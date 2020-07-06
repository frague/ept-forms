import React from 'react';
import { Table, Icon, Button } from 'semantic-ui-react';

export function Selector() {
	return (
		<div>
			<h1>Selector</h1>

			<Table celled>
			    <Table.Header>
            <Table.Row>
  						<Table.HeaderCell>Name</Table.HeaderCell>
  						<Table.HeaderCell>Type</Table.HeaderCell>
  						<Table.HeaderCell>Actions</Table.HeaderCell>
  					</Table.Row>
			    </Table.Header>
			    <Table.Body>
		        <Table.Row>
	        		<Table.Cell></Table.Cell>
  						<Table.Cell>Cell</Table.Cell>
  						<Table.Cell>Cell</Table.Cell>
  					</Table.Row>
			    </Table.Body>
		    </Table>
		</div>
	)
}