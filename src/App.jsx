import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import './App.scss'
import selectionReducer from './store/reducers'

import { Icon, Button } from 'semantic-ui-react';
import { Select } from './Select';
import { Add } from './Add';
import { Configure } from './Configure';
import ApplicationPoints from './containers/ApplicationPoints';

const store = createStore(selectionReducer);

function App() {
  let history = useHistory();
  return (
    <Provider store={ store }>
      <section>
        <aside></aside>
        <article>
          <div className='buttons'>
            <Button icon labelPosition='left' disabled>
              <Icon name='sitemap' />
              Batch Apply
            </Button>
            <Button icon labelPosition='left' onClick={() => history.push("/add")}>
              <Icon name='add circle' />
              Add EPT
            </Button>
            <Button icon labelPosition='left' onClick={() => history.push("/aps")}>
              <Icon name='eye' />
              Application Points
            </Button>
          </div>
          <Switch>
            <Route path="/add">
              <Add />
            </Route>
            <Route path="/configure">
              <Configure />
            </Route>
            <Route path="/aps">
              <ApplicationPoints />
            </Route>
            <Route exact path="/">
              <Select />
            </Route>

          </Switch>
        </article>
      </section>
    </Provider>
  );
}

export default App;
