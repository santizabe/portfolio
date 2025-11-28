import React from 'react';

export type GameInfo = {
	id: string;
	name: string;
}

interface SidebarProps {
	games: GameInfo[];
	selected: string;
	onSelect: (game: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const games = ["Cub3D", "Mandelbrot", "Julia"];

  return (
    <div className="w-48 h-screen bg-gray-900 text-white flex flex-col p-4 shadow-lg items-center">
      <h2 className="text-2xl font-bold mb-6">Games</h2>
      {games.map((game) => (
        <button
          key={game}
          onClick={() => onSelect(game)}
          className="mb-3 py-2 px-4 rounded hover:bg-gray-700 transition"
        >
          {game}
        </button>
      ))}
    </div>
  );
};
