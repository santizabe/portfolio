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
      <Sidebar onSelect={handleSelect} />
      <GameCanvas />
      {loading && <Loading message="Loading game..." />}
    </div>
  );
};

export default App;