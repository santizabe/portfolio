import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { GameCanvas } from './components/GameCanvas';
import {
  launchCube,
  launchFractolMandelbrot,
  launchFractolJulia
} from './wasm/wasmLauncher';
import { Loading } from './components/Loading';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const GAMES = [
	{id: "cub3d", name: "cub3D"},
	{id: "mandelbrot", name: "Mandelbrot"},
	{id: "julia", name: "Julia"},
  ];
  const handleSelect = async (game: string) => {
    setLoading(true);

    try {
      switch (game) {
        case "Cub3D":
          await launchCube();
          break;
        case "Mandelbrot":
          await launchFractolMandelbrot();
          break;
        case "Julia":
          await launchFractolJulia();
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen relative">
      <Sidebar 
        games={GAMES}
        selected={selected}
        onSelect={(id) => {
          setSelected(id);
          handleSelect(id);
        }} />
      <GameCanvas />
      {loading && <Loading message="Loading game..." />}
    </div>
  );
};

export default App;
