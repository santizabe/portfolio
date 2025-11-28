import React, { useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { GameCanvas } from '../components/GameCanvas';
import {
  launchCube,
  launchFractolMandelbrot,
  launchFractolJulia
} from '../wasm/wasmLauncher';
import { Loading } from '../components/Loading';

export const Games: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string>("Cub3D");
  const GAMES = [
  { id: "Cub3D", name: "cub3D", launcher: launchCube },
  { id: "Mandelbrot", name: "Mandelbrot", launcher: launchFractolMandelbrot },
  { id: "Julia", name: "Julia", launcher: launchFractolJulia },
];

useEffect(() => {
  const loadGame = async () => {
    setLoading(true);
    try {
      const game = GAMES.find(g => g.id === selected);
      if (game) {
        await game.launcher();
      }
    } catch (error) {
      console.error('Failed to load game:', error);
    } finally {
      setLoading(false);
    }
  };

  loadGame();
}, [selected]);

  return (
    <div className="flex h-screen relative">
      <Sidebar 
        games={GAMES}
        selected={selected}
        onSelect={setSelected} />
      <GameCanvas />
      {loading && <Loading message="Loading game..." />}
    </div>
  );
};

export default Games;