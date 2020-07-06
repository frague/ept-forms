import React from 'react';
import {
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.scss';

import { Icon, Button } from 'semantic-ui-react';
import { Selector } from './Selector';
import { Add } from './Add';

function App() {
  let history = useHistory();
  return (
      <section>
        <aside></aside>
        <article>
          <div className='buttons'>
            <Button icon labelPosition='left' onClick={() => history.push("/add")}>
              <Icon name='add circle' />
              Add EPT
            </Button>
            <Button icon labelPosition='left'>
              <Icon name='sitemap' />
              Manage
            </Button>
            <Button icon labelPosition='left'>
              <Icon name='upload' />
              Export
            </Button>
          </div>
          <Switch>
            <Route path="/add">
              <Add />
            </Route>
            <Route path="/">
              <Selector />
            </Route>
          </Switch>
       </article>
      </section>
  );
}

export default App;
