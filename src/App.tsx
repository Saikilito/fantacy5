import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { AppProvider } from './context'
import {
  Home,
  Commands,
  SelectedDate,
  SelectedNumbers,
  PresentSelectedNumbers,
} from './view'
import { CreateRaffle, GetRaffles } from './view/commands'

export function App() {
  return (
    <Router>
      <AppProvider>
        <Switch>
          <Route path="/main_window" exact component={Home} />
          <Route path="/commands" exact component={Commands} />

          {/* Generate Ticket */}
          <Route
            path="/generate-ticket/selected-date"
            exact
            component={SelectedDate}
          />
          <Route
            path="/generate-ticket/selected-numbers"
            exact
            component={SelectedNumbers}
          />
          <Route
            path="/generate-ticket/present-selected-numbers"
            exact
            component={PresentSelectedNumbers}
          />

          {/* Commands */}
          <Route path="/create-raffle" exact component={CreateRaffle} />
          <Route path="/get-raffles" exact component={GetRaffles} />

          <Redirect to={{ pathname: '/main_window' }} />
          <Route path="*" exact component={Home} />
        </Switch>
      </AppProvider>
    </Router>
  )
}
