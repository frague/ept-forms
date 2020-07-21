import React from 'react';
import { Table, Button, Checkbox } from 'semantic-ui-react';
import { epts } from './data';

export class Select extends React.Component {
  state = {
    selection: epts.reduce((result, ept) => {
      result[ept.id] = false;
      return result;
    }, {}),
    all: false,
    epts
  };

  toggle(id) {
    let { selection } = this.state;
    selection[id] = !selection[id];
    this.setState(() => ({ selection, all: this.allSelected() }));
  };

  toggleAll() {
    let { all, selection } = this.state;
    all = !all;
    Object.keys(selection).forEach(key => selection[key] = all);
    this.setState(() => ({ selection, all }));
  }

  allSelected() {
    let { selection } = this.state;
    return Object.keys(selection).every(id => selection[id]);
  }

  delete(id) {
    let { epts } = this.state;
    epts = epts.filter(ept => ept.id !== id);
    this.setState(() => ({ epts }));
  }

  render() {
    let { selection, all, epts } = this.state;

    return (
      <div>
        <h1>Select EPTs</h1>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center" collapsing>
                <Checkbox onChange={ () => this.toggleAll() } checked={ all } />
              </Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell collapsing>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              epts
                .filter(ept => ept.type !== 'primitive')
                .map((ept, index) => 
                  <Table.Row key={ index }>
                    <Table.Cell textAlign="center">
                      <Checkbox onChange={ () => this.toggle(ept.id) } checked={ all || selection[ept.id] } />
                    </Table.Cell>
                    <Table.Cell>{ ept.label }</Table.Cell>
                    <Table.Cell>{ ept.type }</Table.Cell>
                    <Table.Cell textAlign="center" className="no-wrap">
                      <Button icon="edit" disabled />
                      <Button icon="copy" disabled />
                      <Button icon="trash" onClick={ () => this.delete(ept.id) } />
                    </Table.Cell>
                  </Table.Row>
                )
            }
          </Table.Body>
        </Table>
      </div>
    );
  }
}