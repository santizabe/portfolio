import React, { useRef } from 'react';

interface GameCanvasProps {
  width?: number;
  height?: number;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ width = 512, height = 512 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);


  return (
    <div className="flex-1 flex justify-center items-center">
      <canvas
        ref={canvasRef}
        id="canvas"
        width={width}
        height={height}
        className="border-2 border-blue-500 rounded-lg shadow-xl"
      />
    </div>
  );
};
