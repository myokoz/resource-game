"use client";

import React, { useState, useEffect } from 'react';
import { Fish, Users } from 'lucide-react';

const ResourceGame = () => {
  const [poolSize, setPoolSize] = useState(20);
  const [round, setRound] = useState(1);
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', fish: 0, currentHarvest: 0 },
    { id: 2, name: 'Player 2', fish: 0, currentHarvest: 0 },
    { id: 3, name: 'Player 3', fish: 0, currentHarvest: 0 },
    { id: 4, name: 'Player 4', fish: 0, currentHarvest: 0 }
  ]);
  const [gameHistory, setGameHistory] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  const MAX_ROUNDS = 10;
  const POOL_LIMIT = 30;

  const updateHarvest = (playerId, amount) => {
    if (amount > 3 || amount < 0) return;
    if (amount > poolSize) return;

    setPlayers(players.map(player => 
      player.id === playerId 
        ? { ...player, currentHarvest: amount }
        : player
    ));
  };

  const processRound = () => {
    const totalHarvest = players.reduce((sum, p) => sum + p.currentHarvest, 0);
    
    if (totalHarvest > poolSize) {
      return false;
    }

    const newPoolSize = Math.min(
      Math.floor((poolSize - totalHarvest) * 1.5),
      POOL_LIMIT
    );

    setGameHistory(prev => [...prev, {
      round,
      poolSize,
      totalHarvest,
      newPoolSize,
      playerHarvests: [...players.map(p => p.currentHarvest)]
    }]);

    setPoolSize(newPoolSize);

    setPlayers(players.map(player => ({
      ...player,
      fish: player.fish + player.currentHarvest,
      currentHarvest: 0
    })));

    setRound(round + 1);

    if (round >= MAX_ROUNDS || newPoolSize === 0) {
      setGameStatus('finished');
    }

    return true;
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Resource Management Game</h2>
          <span className="text-sm">Round {round}/{MAX_ROUNDS}</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Fish className="text-blue-500" />
          <span>Pool Size: {poolSize}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {players.map(player => (
            <div key={player.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{player.name}</span>
                </div>
                <div>Total: {player.fish}</div>
                <div className="flex items-center gap-2">
                  Harvest:
                  <select 
                    value={player.currentHarvest}
                    onChange={(e) => updateHarvest(player.id, parseInt(e.target.value))}
                    className="border rounded p-1"
                    disabled={gameStatus === 'finished'}
                  >
                    {[0, 1, 2, 3].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={processRound}
          disabled={gameStatus === 'finished'}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          End Round
        </button>

        {gameStatus === 'finished' && (
          <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
            Game Over! Winner: {
              players.reduce((prev, current) => 
                (prev.fish > current.fish) ? prev : current
              ).name
            }
          </div>
        )}

        {gameHistory.length > 0 && (
          <div className="mt-6">
            <h3 className="font-bold mb-2">Game History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2">Round</th>
                    <th className="text-left p-2">Pool Size</th>
                    <th className="text-left p-2">Total Harvest</th>
                    <th className="text-left p-2">New Pool Size</th>
                  </tr>
                </thead>
                <tbody>
                  {gameHistory.map((history, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-2">{history.round}</td>
                      <td className="p-2">{history.poolSize}</td>
                      <td className="p-2">{history.totalHarvest}</td>
                      <td className="p-2">{history.newPoolSize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceGame;
