import React, { useState } from 'react'
import { Table, Button, Checkbox } from 'semantic-ui-react'
import { eptsTypes } from '../GraphGenerator'

const initialState = {
  all: false,
  epts: Object.keys(eptsTypes)
};

function areAllSelected(selection, epts) {
  return epts.every(ept => selection.includes(ept));
}

function erase(ept, state, setState) {
  let { epts } = state;
  setState({
    epts: epts.filter(item => item !== ept)
  });
}

export const Select = ({selectedEpts, onSelectClick, onSelectAllClick}) => {
  let [state, setState] = useState(initialState);
  let { epts } = state;
  let all = areAllSelected(selectedEpts, epts);

  return (
    <div>
      <h1>Select EPTs</h1>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center" collapsing>
              <Checkbox onChange={ (e, {checked}) => onSelectAllClick(epts, checked) } checked={ all } />
            </Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell collapsing>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            epts
              .map((ept, index) => 
                <Table.Row key={ index }>
                  <Table.Cell textAlign="center">
                    <Checkbox onChange={ (e, {checked}) => onSelectClick(ept, checked) } checked={ selectedEpts.includes(ept) } />
                  </Table.Cell>
                  <Table.Cell>{ ept }</Table.Cell>
                  <Table.Cell>custom</Table.Cell>
                  <Table.Cell textAlign="center" className="no-wrap">
                    <Button icon="edit" disabled />
                    <Button icon="copy" disabled />
                    <Button icon="trash" onClick={ () => {erase(ept, state, setState); onSelectClick(ept, false)} } />
                  </Table.Cell>
                </Table.Row>
              )
          }
        </Table.Body>
      </Table>
    </div>
  );
}