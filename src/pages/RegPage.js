import React, { useState } from 'react';
import Reg from '../components/Reg';

const RegPage = () => {
  const [players, setPlayers] = useState([]);

  const handlePlayerRegistration = (playerName) => {
    const newPlayer = { name: playerName, tickets: 0 };
    setPlayers([...players, newPlayer]);
  };

  return (
    <div>
      <h2>Registration Page</h2>
      <Reg players={players} onPlayerRegistration={handlePlayerRegistration} />
    </div>
  );
};

export default RegPage;
