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
  ReviewRaffle,
  AddNewRaffle,
  RemoveRaffle,
  GetRaffle,
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

          {/* Review Raffles */}
          <Route path="/review-raffles" exact component={ReviewRaffle} />
          <Route path="/add-new-raffle" exact component={AddNewRaffle} />
          <Route path="/remove-raffle" exact component={RemoveRaffle} />
          <Route path="/get-raffle" exact component={GetRaffle} />

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
