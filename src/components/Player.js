import React, { useState } from 'react';
import './Player.css';

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateTicket = () => {
  const ticket = [];

  // const positions = [1, 11, 21, 31, 41, 51, 61, 71, 81]; // Positions for each column
  let usedNumbers = new Set(); // Keep track of used numbers across the entire ticket

  for (let row = 0; row < 3; row++) {
    const rowNumbers = [];
    const positions = [1, 11, 21, 31, 41, 51, 61, 71, 81]; // Positions for each column
    const blankPositions = new Set();

    // Randomly choose 4 positions for blanks
    while (blankPositions.size < 4) {
      const randomPosition = getRandomNumber(0, 8);
      blankPositions.add(randomPosition);
    }

    for (let col = 0; col < 9; col++) {
      if (blankPositions.has(col)) {
        // Fill blank positions with null (blanks)
        rowNumbers.push(null);
      } else {
        // Fill remaining positions with unique and ascending numbers
        let randomNumber;
        do {
          const min = positions[col];
          const max = positions[col] + 9 - row;
          randomNumber = getRandomNumber(min, max);
        } while (usedNumbers.has(randomNumber));

        rowNumbers.push(randomNumber);
        usedNumbers.add(randomNumber);
        positions[col] = randomNumber + 1; // Update the position for the next column
      }
    }

    ticket.push(rowNumbers);
  }

  return ticket;
};

const sortTicketColumns = (ticket) => {
  for (let col = 0; col < 9; col++) {
    for (let i = 0; i < 2; i++) {
      for (let j = i + 1; j < 3; j++) {
        const a = ticket[i][col];
        const b = ticket[j][col];

        // Skip sorting if one of them is null (blank)
        if (a === null || b === null) {
          continue;
        }

        if (a > b) {
          // Swap the numbers to keep them in ascending order
          [ticket[i][col], ticket[j][col]] = [ticket[j][col], ticket[i][col]];
        }
      }
    }
  }
};

const generateUniqueTickets = (numTickets) => {
  const uniqueTickets = new Set();

  while (uniqueTickets.size < numTickets) {
    const ticket = generateTicket();
    const ticketString = JSON.stringify(ticket);

    if (!uniqueTickets.has(ticketString)) {
      uniqueTickets.add(ticketString);
    }
  }

  const tickets = Array.from(uniqueTickets).map((ticketString) => JSON.parse(ticketString));
  return tickets;
};

const Player = ({ playerName, numTickets }) => {
  const [tickets, setTickets] = useState(() => {
    const uniqueTickets = generateUniqueTickets(numTickets);
    uniqueTickets.forEach((ticket) => sortTicketColumns(ticket));
    return uniqueTickets;
  });

  const [clickedCells, setClickedCells] = useState(Array.from({ length: numTickets }, () => new Set()));

  const handleCellClick = (ticketIndex, rowIndex, columnIndex) => {
    setClickedCells((prevClickedCells) => {
      const newClickedCells = prevClickedCells.map((clickedCellsSet, index) => {
        if (index === ticketIndex) {
          const newClickedCellsSet = new Set(clickedCellsSet);
          newClickedCellsSet.add(`${rowIndex}-${columnIndex}`);
          return newClickedCellsSet;
        }
        return clickedCellsSet;
      });
      return newClickedCells;
    });
  };

  return (
    <div className="player">
      <h3>Player: {playerName}</h3>
      <h4>Number of Tickets: {numTickets}</h4>
      <h4>Tickets:</h4>
      {tickets.map((ticket, ticketIndex) => (
        <div className="ticket" key={ticketIndex}>
          {ticket.map((row, rowIndex) => (
            <div className="ticket-row" key={rowIndex}>
              {row.map((cell, columnIndex) => {
                const isBlank = cell === null;
                const isClicked = clickedCells[ticketIndex].has(`${rowIndex}-${columnIndex}`);
                const cellValue = isBlank ? '' : cell;
                return (
                  <div
                    className={`ticket-cell ${isClicked ? 'red' : ''}`}
                    key={columnIndex}
                    onClick={() => handleCellClick(ticketIndex, rowIndex, columnIndex)}
                    style={{
                      backgroundColor: isBlank ? 'black' : '',
                    }}
                  >
                    {cellValue}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Player;