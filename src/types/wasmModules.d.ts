declare module '../wasm/cub3d/cub3D' {
  interface CubeModule {
    createCube: (map: string) => void;
  }
  const Cube: CubeModule;
  export default Cube;
}

declare module '../wasm/fractol/fractol' {
  interface FractolModule {
    createFractol: (...args: string[]) => void;
  }
  const Fractol: FractolModule;
  export default Fractol;
}
