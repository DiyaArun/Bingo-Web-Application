import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Reg = ({ players, setPlayers }) => {
  const [playerName, setPlayerName] = useState('');
  const [numTickets, setNumTickets] = useState(1);
  const history = useHistory();

  const handlePlayerNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  const handleNumTicketsChange = (e) => {
    setNumTickets(parseInt(e.target.value, 10));
  };

  const handleRegister = () => {
    if (playerName.trim() === '' || numTickets <= 0) {
      alert('Please enter a valid player name and number of tickets.');
      return;
    }

    // Create a new player object with the entered details
    const newPlayer = {
      name: playerName,
      tickets: numTickets,
    };

    // Update the players state with the new player
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);

    // Clear the input fields after registering the player
    setPlayerName('');
    setNumTickets(1);

    // Navigate to the player page after registering
    history.push(`/player/${encodeURIComponent(playerName)}`);
  };

  return (
    <div className="reg">
      <h2>Registration Page</h2>
      <div>
        <label>
          Player Name:
          <input type="text" value={playerName} onChange={handlePlayerNameChange} />
        </label>
      </div>
      <div>
        <label>
          Number of Tickets:
          <input type="number" value={numTickets} onChange={handleNumTicketsChange} />
        </label>
      </div>
      <button onClick={handleRegister}>Register</button>
      <h3>Registered Players:</h3>
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            <Link to={`/player/${encodeURIComponent(player.name)}`}>{player.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/board">Go to Board Page</Link>
    </div>
  );
};

export default Reg;