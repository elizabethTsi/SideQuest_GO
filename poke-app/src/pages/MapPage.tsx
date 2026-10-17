
import { useRef, useState } from "react";

const WORLD_SIZE = 2000;

const quests = [
  { id: 1, name: "Hidden Cafe", x: 350, y: 400 },
  { id: 2, name: "Park Challenge", x: 1200, y: 700 },
  { id: 3, name: "Secret Spot", x: 800, y: 1500 },
];

export default function MapPage() {
  const viewportRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({
    x: -700,
    y: -600,
  });

  const dragStart = useRef({
    pointerX: 0,
    pointerY: 0,
    x: 0,
    y: 0,
  });

  function handlePointerDown(
    e: React.PointerEvent<HTMLDivElement>
  ) {
    e.currentTarget.setPointerCapture(e.pointerId);

    dragStart.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      x: position.x,
      y: position.y,
    };
  }

  function handlePointerMove(
    e: React.PointerEvent<HTMLDivElement>
  ) {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) {
      return;
    }

    const viewport = viewportRef.current;
    if (!viewport) return;

    const dx = e.clientX - dragStart.current.pointerX;
    const dy = e.clientY - dragStart.current.pointerY;

    const maxX = viewport.clientWidth - WORLD_SIZE;
    const maxY = viewport.clientHeight - WORLD_SIZE;

    setPosition({
      x: Math.max(maxX, Math.min(0, dragStart.current.x + dx)),
      y: Math.max(maxY, Math.min(0, dragStart.current.y + dy)),
    });
  }

  return (
    <div
      ref={viewportRef}
      className="relative h-full w-full overflow-hidden bg-slate-200 touch-none"
    >
      {/* The entire world moves together */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className="absolute left-0 top-0 cursor-grab active:cursor-grabbing"
        style={{
          width: WORLD_SIZE,
          height: WORLD_SIZE,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        {/* Large background image */}
        <img
          src="/images/tech_map.jpg"
          draggable={false}
          alt="Explore the world"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        />

        {/* Quest markers are attached to world coordinates */}
        {quests.map((quest) => (
          <button
            key={quest.id}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => alert(quest.name)}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600 px-3 py-2 text-sm font-bold text-white shadow-lg"
            style={{
              left: quest.x,
              top: quest.y,
            }}
          >
            📍 {quest.name}
          </button>
        ))}
      </div>

      {/* Fixed screen UI: does not move with the world */}
      <div className="pointer-events-none absolute bottom-4 left-4 rounded-xl bg-white/90 px-3 py-2 shadow">
        <p className="text-sm font-semibold text-slate-900">
          Explore your world
        </p>
        <p className="text-xs text-slate-600">
          Drag to look around
        </p>
      </div>
    </div>
  );
}
