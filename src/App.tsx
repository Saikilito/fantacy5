import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Home, GenerateTicket, Commands } from './view'

export function App() {
  return (
    <Router>
      {console.info(window.location.href)}
      <Switch>
        <Route path="/main_window" exact component={Home} />
        <Route path="/generate-ticket" exact component={GenerateTicket} />
        <Route path="/commands" exact component={Commands} />

        <Redirect to={{ pathname: '/main_window' }} />
      </Switch>
    </Router>
  )
}
