import React from 'react';
import { useParams } from 'react-router-dom';
import Player from '../components/Player';

const PlayerPage = ({ players }) => {
  const { playerId } = useParams();

  // Find the registered player with the corresponding ID
  const player = players.find((player) => player.name === playerId);

  if (!player) {
    return <div>Player not found.</div>;
  }

  return (
    <div>
      <h2>Player Page</h2>
      <h3>Player Name: {player.name}</h3>
      <h3>Number of Tickets: {player.tickets}</h3>
      <Player playerName={player.name} numTickets={player.tickets} />
    </div>
  );
};

export default PlayerPage;