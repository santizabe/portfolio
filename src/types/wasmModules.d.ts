declare module '../wasm/cub3d/cub3D.js' {
  interface CubeModule {
    createCube: (map: string) => void;
  }
  const Cube: CubeModule;
  export default Cube;
}

declare module '../wasm/fractol/fractol.js' {
  interface FractolModule {
    createFractol: (...args: string[]) => void;
  }
  const Fractol: FractolModule;
  export default Fractol;
}
