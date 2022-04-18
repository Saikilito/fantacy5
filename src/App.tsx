import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { AppProvider } from './context'
import {
  Home,
  SelectedDate,
  SelectedNumbers,
  PresentSelectedNumbers,
  // Raffles
  ReviewRaffle,
  AddNewRaffle,
  RemoveRaffle,
  GetRaffle,
  // Tickets
  ReviewTicket,
  GetTicket,
  RemoveTicket,

  // Find Raffle
  FindRaffle,
} from './view'

export function App() {
  return (
    <Router>
      <AppProvider>
        <Switch>
          <Route path="/main_window" exact component={Home} />

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

          {/* Review Raffles */}
          <Route path="/review-ticket" exact component={ReviewTicket} />
          <Route path="/remove-ticket" exact component={RemoveTicket} />
          <Route path="/get-ticket" exact component={GetTicket} />

          {/** Find Raffle */}
          <Route path="/find-raffle" exact component={FindRaffle} />

          <Redirect to={{ pathname: '/main_window' }} />
          <Route path="*" exact component={Home} />
        </Switch>
      </AppProvider>
    </Router>
  )
}
