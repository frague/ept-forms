import React from 'react';
import { Table, Button, Checkbox } from 'semantic-ui-react';
import { epts } from './data';

export function Selector() {
	return (
		<div>
			<h1>Select EPTs</h1>

			<Table celled>
			    <Table.Header>
            <Table.Row>
  						<Table.HeaderCell textAlign="center" collapsing>
                <Checkbox />
              </Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
  						<Table.HeaderCell>Type</Table.HeaderCell>
  						<Table.HeaderCell collapsing>Actions</Table.HeaderCell>
  					</Table.Row>
			    </Table.Header>
			    <Table.Body>
            {
              epts.map((ept, index) => 
    		        <Table.Row key={ index }>
    	        		<Table.Cell textAlign="center">
                    <Checkbox />
                  </Table.Cell>
                  <Table.Cell>{ ept.label }</Table.Cell>
      						<Table.Cell>Primitive</Table.Cell>
      						<Table.Cell textAlign="center" className="no-wrap">
                    <Button icon="edit" />
                    <Button icon="copy" />
                    <Button icon="trash" />
                  </Table.Cell>
      					</Table.Row>
              )
            }
			    </Table.Body>
		    </Table>
		</div>
	)
}