"use client";

import React, { useState, useEffect } from 'react';
import { Fish, Users } from 'lucide-react';

const ResourceGame = () => {
  // ... 既存のステート管理コード ...

  return (
    <div className="p-8 max-w-6xl mx-auto bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
        {/* ヘッダー部分 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Resource Management Game</h2>
          <span className="text-lg font-semibold text-gray-600">Round {round}/{MAX_ROUNDS}</span>
        </div>

        {/* プール情報 */}
        <div className="flex items-center gap-3 mb-6 text-xl text-blue-600 bg-blue-50 p-4 rounded-lg">
          <Fish className="w-8 h-8" />
          <span className="font-semibold">Pool Size: {poolSize}</span>
        </div>

        {/* プレイヤーグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {players.map(player => (
            <div key={player.id} className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-gray-600" />
                  <span className="text-lg font-semibold text-gray-800">{player.name}</span>
                </div>
                <div className="text-xl text-gray-700">Total: {player.fish}</div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-700">Harvest:</span>
                  <select 
                    value={player.currentHarvest}
                    onChange={(e) => updateHarvest(player.id, parseInt(e.target.value))}
                    className="border-2 rounded-md p-2 text-lg bg-white"
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

        {/* アクションボタン */}
        <button
          onClick={processRound}
          disabled={gameStatus === 'finished'}
          className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          End Round
        </button>

        {/* ゲーム終了メッセージ */}
        {gameStatus === 'finished' && (
          <div className="mt-6 p-6 bg-yellow-100 border-l-4 border-yellow-400 rounded-lg">
            <p className="text-xl font-semibold text-yellow-800">
              Game Over! Winner: {
                players.reduce((prev, current) => 
                  (prev.fish > current.fish) ? prev : current
                ).name
              }
            </p>
          </div>
        )}

        {/* ゲーム履歴 */}
        {gameHistory.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Game History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-lg font-semibold text-gray-700">Round</th>
                    <th className="px-6 py-3 text-left text-lg font-semibold text-gray-700">Pool Size</th>
                    <th className="px-6 py-3 text-left text-lg font-semibold text-gray-700">Total Harvest</th>
                    <th className="px-6 py-3 text-left text-lg font-semibold text-gray-700">New Pool Size</th>
                  </tr>
                </thead>
                <tbody>
                  {gameHistory.map((history, i) => (
                    <tr key={i} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-800">{history.round}</td>
                      <td className="px-6 py-4 text-gray-800">{history.poolSize}</td>
                      <td className="px-6 py-4 text-gray-800">{history.totalHarvest}</td>
                      <td className="px-6 py-4 text-gray-800">{history.newPoolSize}</td>
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

