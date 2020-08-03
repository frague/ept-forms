import React, { useState } from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';

function renderInput(key, parameter, parameters, setParams) {
  return (<Form.Input
      key={ key }
      label={ parameter }
      name={ parameter }
      placeholder={ parameter }
      value={ parameters[parameter] }
      onChange={ (e, { value }) => setParams(Object.assign({}, parameters, {[parameter]: value})) }
    />);
}

function renderSelect(key, parameter, parameters, setParams) {
  let values = parameters[parameter].values;
  let options = values.map(option => ({
    text: option,
    value: option
  }));
  return (<Form.Select
      key={ key }
      label={ parameter }
      name={ parameter }
      placeholder={ parameter }
      options={ options }
      value={ parameters[parameter].value }
      onChange={ (e, { value }) => setParams(Object.assign({}, parameters, {[parameter]: { value, values }})) }
    />);
}

export function ConfigurationModal({epts={}, name='', callback=() => {}}) {
  const [parameters, setParams] = useState(Object.assign({}, (epts[name] || {}).parameters));
  const [isOpen, setVisibility] = useState(false);
  return (
    <Modal
      trigger={<Button onClick={ () => setVisibility(true) }>Configure <Icon name='chevron right' /></Button>}
      size='tiny'
      dimmer='inverted'
      onClose={ () => {
        setVisibility(false);
        callback(parameters);
      } }
      open={ isOpen }
    >
      <Header icon='browser' content={ `Configuration of ${name}` } />
      <Modal.Content>
        <Form>
          <Form.Input
            label="Tag"
            name="tag"
            placeholder="<Automatically Assigned>"
          />
          {
            Object.keys(parameters).map((parameter, index) => {
              if (parameters[parameter].values) {
                return renderSelect(index, parameter, parameters, setParams);
              } else {
                return renderInput(index, parameter, parameters, setParams);
              }
            })
          }
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={ () => setVisibility(false) }>Cancel</Button>
        <Button onClick={ () => setVisibility(false) }>Save as draft</Button>
        <Button onClick={ () => setVisibility(false) }>Create</Button>
      </Modal.Actions>
    </Modal>
  )
}