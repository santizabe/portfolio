import { Sidebar } from "./Sidebar";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode,
  selected: string,
  onSelect: (id: string) => void
};

const GAMES = [
  { id: "cub3d", name: "Cub3D" },
  { id: "mandelbrot", name: "Mandelbrot Set" },
  { id: "julia", name: "Julia Set" },
];

export default function Layout({ children, selected, onSelect }: LayoutProps) {
  return (
    <div className="flex h-screen bg-zinc-950">
      <Sidebar games={GAMES} selected={selected} onSelect={onSelect} />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
