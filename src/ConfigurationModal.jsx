import React, { useState } from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';

export function ConfigurationModal({epts={}, name='', callback=() => {}}) {
  const [parameters, setParams] = useState(Object.assign({}, (epts[name] || {}).parameters));
  const [isOpen, setVisibility] = useState(false);
  return (
    <Modal
      trigger={<a href="#x" onClick={ () => setVisibility(true) }>Configure <Icon name='chevron right' /></a>}
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
        {
          Object.keys(parameters).map((parameter, index) => 
            <Form.Input
              key={ index }
              label={ parameter }
              name={ parameter }
              placeholder={ parameter }
              value={ parameters[parameter] }
              onChange={ (e, { value }) => setParams(Object.assign({}, parameters, {[parameter]: value})) }
            />
          )
        }
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={ () => setVisibility(false) }>Done</Button>
      </Modal.Actions>
    </Modal>
  )
}