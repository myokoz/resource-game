"use client";

import React, { useState } from 'react';
import { Fish, Users } from 'lucide-react';

const GAME_CONSTANTS = {
  MAX_ROUNDS: 10,
  POOL_LIMIT: 30,
  INITIAL_POOL_SIZE: 20
};

const ResourceGame = () => {
  const [poolSize, setPoolSize] = useState(GAME_CONSTANTS.INITIAL_POOL_SIZE);
  const [round, setRound] = useState(1);
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', fish: 0, currentHarvest: 0 },
    { id: 2, name: 'Player 2', fish: 0, currentHarvest: 0 },
    { id: 3, name: 'Player 3', fish: 0, currentHarvest: 0 },
    { id: 4, name: 'Player 4', fish: 0, currentHarvest: 0 }
  ]);
  const [gameHistory, setGameHistory] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');

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
      GAME_CONSTANTS.POOL_LIMIT
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

    if (round >= GAME_CONSTANTS.MAX_ROUNDS || newPoolSize === 0) {
      setGameStatus('finished');
    }

    return true;
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Resource Management Game</h2>
          <span className="text-lg font-semibold text-gray-600">
            Round {round}/{GAME_CONSTANTS.MAX_ROUNDS}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-6 p-4 bg-blue-50 rounded-lg">
          <Fish className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-semibold text-blue-700">Pool Size: {poolSize}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {players.map(player => (
            <div key={player.id} className="bg-gray-50 p-6 rounded-lg shadow">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-gray-800" />
                  <span className="text-lg font-semibold text-gray-900">{player.name}</span>
                </div>
                <div className="text-xl font-medium text-gray-900">Total: {player.fish}</div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-900 font-medium">Harvest:</span>
                  <select 
                    value={player.currentHarvest}
                    onChange={(e) => updateHarvest(player.id, parseInt(e.target.value))}
                    className="border-2 border-gray-300 rounded-md p-2 w-20 text-gray-900 font-medium bg-white"
                    disabled={gameStatus === 'finished'}
                  >
                    {[0, 1, 2, 3].map(n => (
                      <option key={n} value={n} className="text-gray-900">{n}</option>
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
          className="w-full mb-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          End Round
        </button>

        {gameStatus === 'finished' && (
          <div className="mb-6 p-6 bg-yellow-100 border-l-4 border-yellow-400 rounded-lg">
            <p className="text-xl font-semibold text-yellow-800">
              Game Over! Winner: {
                players.reduce((prev, current) => 
                  (prev.fish > current.fish) ? prev : current
                ).name
              }
            </p>
          </div>
        )}

        {gameHistory.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Game History</h3>
            <div className="overflow-x-auto rounded-lg border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 text-left text-gray-900 border-b">Round</th>
                    <th className="p-4 text-left text-gray-900 border-b">Pool Size</th>
                    <th className="p-4 text-left text-gray-900 border-b">Total Harvest</th>
                    <th className="p-4 text-left text-gray-900 border-b">New Pool Size</th>
                  </tr>
                </thead>
                <tbody>
                  {gameHistory.map((history, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-4 text-gray-900">{history.round}</td>
                      <td className="p-4 text-gray-900">{history.poolSize}</td>
                      <td className="p-4 text-gray-900">{history.totalHarvest}</td>
                      <td className="p-4 text-gray-900">{history.newPoolSize}</td>
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
