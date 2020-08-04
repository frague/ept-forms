import React, { useState } from 'react'
import { Table, Button, Checkbox } from 'semantic-ui-react'
import { eptsTypes } from '../GraphGenerator'

const initialState = {
  selection: {},
  all: false,
  epts: Object.keys(eptsTypes)
};

function toggle(ept, state, setState) {
  let { selection, epts } = state;
  let cloned = Object.assign({}, selection, {[ept]: !selection[ept]});
  setState({
    selection: cloned,
    all: areAllSelected(cloned, epts),
    epts: [...epts]
  });
};

function toggleAll(state, setState) {
  let { all, selection, epts } = state;
  all = !all;
  Object.keys(selection).forEach(key => selection[key] = all);
  setState({
    selection: epts.reduce((result, ept) => {
      result[ept] = all;
      return result;
    }, {}),
    all,
    epts: [...epts]
  });
}

function areAllSelected(selection, epts) {
  return epts.every(ept => selection[ept]);
}

function erase(ept, state, setState) {
  let { selection, epts } = state;

  let clonedEpts = epts.filter(item => item !== ept);
  let clonedSelection = clonedEpts.reduce((result, ept) => {
      result[ept] = !!selection[ept];
      return result;
    }, {});

  setState({
    selection: clonedSelection,
    all: areAllSelected(clonedSelection, clonedEpts),
    epts: clonedEpts
  });
}

export const Select = () => {
  let [state, setState] = useState(initialState);
  let { selection, all, epts } = state;

  return (
    <div>
      <h1>Select EPTs</h1>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center" collapsing>
              <Checkbox onChange={ () => toggleAll(state, setState) } checked={ all } />
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
                    <Checkbox onChange={ () => toggle(ept, state, setState) } checked={ selection[ept] } />
                  </Table.Cell>
                  <Table.Cell>{ ept }</Table.Cell>
                  <Table.Cell>custom</Table.Cell>
                  <Table.Cell textAlign="center" className="no-wrap">
                    <Button icon="edit" disabled />
                    <Button icon="copy" disabled />
                    <Button icon="trash" onClick={ () => erase(ept, state, setState) } />
                  </Table.Cell>
                </Table.Row>
              )
          }
        </Table.Body>
      </Table>
    </div>
  );
}