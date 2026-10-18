
import { useRef, useState } from "react";

const WORLD_WIDTH = 5600 / 2;
const WORLD_HEIGHT = 4320 / 2;

const quests = [
  { id: 1, name: "Hidden Cafe", x: 350, y: 400 },
  { id: 2, name: "Park Challenge", x: 1200, y: 700 },
  { id: 3, name: "Secret Spot", x: 800, y: 1500 },
];

type MapPageProps = {
  onOpenProfile: () => void;
};

export default function MapPage({ onOpenProfile }: MapPageProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: -700, y: -600 });

  const dragStart = useRef({
    pointerX: 0,
    pointerY: 0,
    x: 0,
    y: 0,
  });

  function clampPosition(x: number, y: number, scale = zoom) {
    const viewport = viewportRef.current;

    if (!viewport) return { x, y };

    const minX = Math.min(0, viewport.clientWidth - WORLD_WIDTH * scale);
    const minY = Math.min(0, viewport.clientHeight - WORLD_HEIGHT * scale);

    return {
      x: Math.max(minX, Math.min(0, x)),
      y: Math.max(minY, Math.min(0, y)),
    };
  }

  function changeZoom(nextZoom: number) {
    const newZoom = Math.max(0.5, Math.min(3, nextZoom));
    const viewport = viewportRef.current;

    if (!viewport) return;

    // Zoom toward the center of the visible screen
    const centerX = viewport.clientWidth / 2;
    const centerY = viewport.clientHeight / 2;

    const worldX = (centerX - position.x) / zoom;
    const worldY = (centerY - position.y) / zoom;

    const nextX = centerX - worldX * newZoom;
    const nextY = centerY - worldY * newZoom;

    setZoom(newZoom);
    setPosition(clampPosition(nextX, nextY, newZoom));
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    // Don't start dragging when interacting with a quest marker
    if ((e.target as HTMLElement).closest("button")) return;

    e.currentTarget.setPointerCapture(e.pointerId);

    dragStart.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      x: position.x,
      y: position.y,
    };
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;

    const dx = e.clientX - dragStart.current.pointerX;
    const dy = e.clientY - dragStart.current.pointerY;

    setPosition(
      clampPosition(
        dragStart.current.x + dx,
        dragStart.current.y + dy
      )
    );
  }

  function resetMap() {
    setZoom(1);
    setPosition(clampPosition(-700, -600, 1));
  }

  return (
    <div
      ref={viewportRef}
      className="relative h-full w-full overflow-hidden rounded-3xl bg-slate-200 touch-none"
    >
      {/* Moving world */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className="absolute left-0 top-0 cursor-grab active:cursor-grabbing"
        style={{
          width: WORLD_WIDTH,
          height: WORLD_HEIGHT,
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
          transformOrigin: "top left",
        }}
      >
        <img
          src="/images/tech_map.jpg"
          alt="Explore the world"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-fill"
        />

        {quests.map((quest) => (
          <button
            key={quest.id}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => alert(quest.name)}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600 px-3 py-2 text-sm font-bold text-white shadow-lg"
            style={{ left: quest.x, top: quest.y }}
          >
            📍 {quest.name}
          </button>
        ))}
      </div>

      {/* Fixed zoom controls */}
      <div className="absolute bottom-20 right-4 z-50 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => changeZoom(zoom + 0.25)}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl font-bold text-slate-900 shadow-lg"
          aria-label="Zoom in"
        >
          +
        </button>

        <button
          type="button"
          onClick={() => changeZoom(zoom - 0.25)}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl font-bold text-slate-900 shadow-lg"
          aria-label="Zoom out"
        >
          −
        </button>

        <button
          type="button"
          onClick={resetMap}
          className="flex h-8 w-12 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-900 shadow-lg"
          aria-label="Reset map"
        >
          1:1
        </button>

        <div className="rounded-lg bg-white px-2 py-1 text-center text-xs font-semibold text-slate-900 shadow">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Fixed help text */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-40 rounded-xl bg-white/90 px-3 py-2 shadow">
        <p className="text-sm font-semibold text-slate-900">
          Explore your world
        </p>
        <p className="text-xs text-slate-600">Drag to look around</p>
      </div>

      {/* Fixed profile button */}
      <button
        className="absolute right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl shadow-lg"
        onClick={onOpenProfile}
        aria-label="Open trainer profile"
        title="Trainer Profile"
      >
        <span aria-hidden="true">⚡</span>
      </button>
    </div>
  );
}
