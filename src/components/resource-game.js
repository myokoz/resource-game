"use client";

import React, { useState } from 'react';
import { Fish, Users } from 'lucide-react';

// 定数をコンポーネントの外で定義
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
    <div className="p-8 max-w-6xl mx-auto bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Resource Management Game</h2>
          <span className="text-lg font-semibold text-gray-600">
            Round {round}/{GAME_CONSTANTS.MAX_ROUNDS}
          </span>
        </div>

        {/* 残りのJSXコードは同じ */}
      </div>
    </div>
  );
};

export default ResourceGame;
