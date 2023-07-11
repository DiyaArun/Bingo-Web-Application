import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Reg from './components/Reg';
import Board from './components/Board';
import PlayerPage from './pages/PlayerPage';
import BoardPage from './pages/BoardPage';

const App = () => {
  const [players, setPlayers] = useState([]);

  return (
    <Router>
      <div className="app">
        <h1>Housie Game</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Registration</Link>
            </li>
            <li>
              <Link to="/board">Board</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Reg players={players} setPlayers={setPlayers} />
          </Route>
          <Route path="/board">
            <BoardPage />
          </Route>
          <Route path="/player/:playerId">
            <PlayerPage players={players} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
