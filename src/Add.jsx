import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Checkbox, Table, Input } from 'semantic-ui-react';
import { epts } from './data';

function redirectToConfig(history, selection) {
  history.push({
    pathname: '/configure', 
    state: {
      selection: getSelection()
    }
  });
}

export function Add() {
  let history = useHistory();
  const [selection, setSelection] = useState({});

  const selectEpt = ept => {
    setSelection(selection => {
      let isSelected = selection.hasOwnProperty(ept.id);
      let result = Object.assign({}, selection, {[ept.id]: 1});
      if (isSelected) delete result[ept.id];
      return result;
    });
  }

  const changeAmount = (ept, value) => {
    let isSelected = selection.hasOwnProperty(ept.id);
    if (isSelected) {
      let v = 1 * value;
      setSelection(Object.assign({}, selection, {[ept.id]: v > 0 ? v : 1}));
    }
  }

  const seedEpts = (type) => {
    return epts
      .filter(ept => ept.type === type)
      .map((ept, index) =>
        <Table.Row key={ index }>
          <Table.Cell textAlign="center" collapsing>
            <Checkbox onChange={ () => selectEpt(ept) } checked={ selection.hasOwnProperty(ept.id) } />
          </Table.Cell>
          <Table.Cell>{ ept.label }</Table.Cell>
          <Table.Cell collapsing>
            <Form.Field>
              <Input placeholder='#' name={ ept.id } type="number" value={ selection[ept.id] || 0 } onChange={ (e, {value}) => changeAmount(ept, value) } />
            </Form.Field>
          </Table.Cell>
        </Table.Row>
      );
  }

  console.log('Rendering');

	return (
		<div>
			<h1>Add EPT { Object.keys(selection) }</h1>
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
          <Table.Body>{ seedEpts('primitive') }
          </Table.Body>
        </Table>
        <h2>Select EPTs To Include:</h2>
        <Table basic="very" className="epts">
          <Table.Body>{ seedEpts('custom') }
          </Table.Body>
        </Table>
        <Form.Field>
        </Form.Field>
        <div className="buttons">
          <Button onClick={ () => history.push('/') }>Cancel</Button>
          <Button onClick={ () => redirectToConfig(history, selection) }>Next</Button>
        </div>
      </Form>
		</div>
	);
}