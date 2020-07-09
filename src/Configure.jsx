import React from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { Button, Table, Select } from 'semantic-ui-react';
import { epts } from './data';

import { ConfigurationModal } from './ConfigurationModal';

function multiplyEpts(selection) {
  return Object.keys(selection).reduce((result, id) => {
    let ept = (epts.filter(ept => ept.id == id) || [null])[0];
    if (!ept) throw new Error(`Unable to find EPT ID:${id}`);

    let label = ept.label;
    for (let i = 0, l = selection[id]; i < l; i++) {
      result[`${label} ${i + 1}`] = Object.assign({}, ept);
    }
    return result;
  }, {});
}

function gatherTypes(listedEpts) {
  return Object.keys(listedEpts).reduce((result, name) => {
    let ept = listedEpts[name];
    let a = result[ept.output_type] || [];
    a.push(name);
    result[ept.output_type] = a;
    return result;
  }, {});
}

function generateAPs(name, ept, availableTypes) {
  let matches = ept.input_types.reduce((result, type) => {
    (availableTypes[type] || []).forEach(candidate => {
      if (candidate !== name) result[candidate] = candidate;
    });
    return result;
  }, {});
  return [
    { key: '999', text: 'Application Point', value: 'Application Point'},
    ...Object.keys(matches).sort().map((label, index) => ({key: index, text: label, value: label}))
  ];
}

export function Configure() {
  const history = useHistory();
  const location = useLocation();

  // let selection = {1: 3, 2: 3, 3: 1} || location['selection'];
  let selection = location['selection'] || {};
  let listedEpts = multiplyEpts(selection);
  let availableTypes = gatherTypes(listedEpts);

  return (
    <div>
      <h1>Configuration</h1>

      <Table celled collapsing>
        <Table.Body>
          {
            Object.keys(listedEpts)
              .map((name, index) => 
                <Table.Row key={ index }>
                  <Table.Cell>{ name }</Table.Cell>
                  <Table.Cell>
                    <Select options={ generateAPs(name, listedEpts[name], availableTypes) } />
                  </Table.Cell>
                  <Table.Cell>
                    <ConfigurationModal
                      name={ name }
                      epts={ listedEpts }
                      callback={ parameters => listedEpts[name].parameters = parameters }
                    />
                  </Table.Cell>
                </Table.Row>
              )
          }
        </Table.Body>
      </Table>
      <div className="buttons">
        <Button onClick={ () => history.push('/') }>Cancel</Button>
        <Button onClick={ () => {} }>Create</Button>
      </div>
    </div>
  );
}