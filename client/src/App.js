import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Imported Components
import Header from './components/Header';
import CountDown from './components/Pages/CountDown';
import Pomodoro from './components/Pages/Pomodoro';

const App = () => {
  console.log('app Running');
  /**
   * NOTES:
   * On homepage of the app, everyday there could be a new quote about self care
   */

  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/countdown" component={CountDown} />
          <Route path="/pomodoro" component={Pomodoro} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
