import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Checkbox, Table } from 'semantic-ui-react';
import { epts } from './data';

export function Add() {
  let history = useHistory();
	return (
		<div>
			<h1>Add EPT</h1>
			<Form>
        <Form.Field>
          <label>Name</label>
          <input placeholder='Name' required />
        </Form.Field>
        <Form.Field>
          <label>Tags</label>
          <input placeholder='Tags' />
        </Form.Field>
        <h2>Select Primitives To Include:</h2>
        <Table basic="very" className="primitives">
          <Table.Body>{
            epts.map((ept, index) =>
              <Table.Row key={ index }>
                <Table.Cell textAlign="center" collapsing>
                  <Checkbox />
                </Table.Cell>
                <Table.Cell>{ ept.label }</Table.Cell>
                <Table.Cell collapsing>
                  <Form.Field>
                    <input placeholder='#' type="number" />
                  </Form.Field>
                </Table.Cell>
              </Table.Row>
            )
          }
          </Table.Body>
        </Table>
        <h2>Select EPTs To Include:</h2>
        <Form.Field>
          {/*<Checkbox label='I agree to the Terms and Conditions' />*/}
        </Form.Field>
        <div className="buttons">
          <Button onClick={ () => history.push('/') }>Cancel</Button>
          <Button type='submit'>Submit</Button>
        </div>
      </Form>
		</div>
	);
}