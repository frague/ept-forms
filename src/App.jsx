import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { Selector } from './Selector';
import { Icon, Button } from 'semantic-ui-react';


function App() {
  return (
    <section>
      <aside></aside>
      <article>
        <div className='buttons'>
          <Button icon labelPosition='left'>
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
        <Router>
          <Switch>
            <Route path="/">
              <Selector />
            </Route>
          </Switch>
        </Router>
      </article>
    </section>
  );
}

export default App;
