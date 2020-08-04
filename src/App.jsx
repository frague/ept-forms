import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom';
import appReducer from './store/reducers'

import Navigation from './containers/Navigation'

import Select from './containers/Select'
import { Add } from './Add'
import { Configure } from './Configure'
import ApplicationPoints from './containers/ApplicationPoints'
import BatchApply from './containers/BatchApply'

import 'semantic-ui-css/semantic.min.css'
import './App.scss'

const store = createStore(appReducer);

function App() {
  return (
    <Provider store={ store }>
      <section>
        <aside></aside>
        <article>
          <Navigation />
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
            <Route path="/batch">
              <BatchApply />
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
