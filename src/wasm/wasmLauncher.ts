let currentModule: any = null;

const cancelCurrentModule = () => {
  if (currentModule) {
    try {
      if (currentModule._emscripten_force_exit) {
        currentModule._emscripten_force_exit(0);
        console.log("Module deleted with force exit");
      }
      if (currentModule.quit) {
        currentModule.quit();
        console.log("Module deleted with quit");
      }
      if (currentModule.exit) {
        currentModule.exit();
        console.log("Module deleted with exit");
      }
    } catch (e) {
      console.log('Module cleanup:', e);
    }
    currentModule = null;
  }
}

export async function launchCube() {
  const createCubeModule = (await import('./cub3D/cub3D.js')).default;

  cancelCurrentModule();
  const module = await createCubeModule({
    arguments: ['textures/map.cub'],
    canvas: document.getElementById("canvas"),
    locateFile: (path: string) => {
      if (path.endsWith('.data'))
        return '/wasm/' + path;
      return '/src/wasm/cub3D/' + path;
    },
    print: (text: string) => { console.log('[Cub3d]:', text);},
    printErr: (text: string) => { console.error('[cub3d Error]:', text);},
    onAbort: (msg: string) => { console.error('Module aborted:', msg); },
    onExit: (status: number) => { console.log('Module exited with status:', status); }
  });

  currentModule = module;
}

export async function launchFractolMandelbrot() {
  const createFractolModule = (await import('./fractol/fractol.js')).default;

   cancelCurrentModule();

  const module = await createFractolModule({
    arguments: ["mandelbrot"],
    canvas: document.getElementById("canvas"),
    print: (text: string) => { console.log('[Mandelbrot]:', text);},
    printErr: (text: string) => { console.error('[Mandel Error]:', text);},
    onAbort: (msg: string) => { console.error('Module aborted:', msg); },
    onExit: (status: number) => { console.log('Module exited with status:', status); }
  });

  currentModule = module;
}

export async function launchFractolJulia() {
  const createFractolModule = (await import('./fractol/fractol.js')).default;

   cancelCurrentModule();

  const module = await createFractolModule({
    arguments: ["julia", "0", "0", "-s"],
    canvas: document.getElementById("canvas"),
    print: (text: string) => { console.log('[Julia]:', text);},
    printErr: (text: string) => { console.error('[Julia Error]:', text);},
    onAbort: (msg: string) => { console.error('Module aborted:', msg); },
    onExit: (status: number) => { console.log('Module exited with status:', status); }
  });

  currentModule = module;
}
