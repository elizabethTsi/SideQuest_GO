
type SideQuestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  quest: {
    id: number;
    name: string;
    description: string;
    difficulty: string;
    reward: string;
    location: string;
  };
};

export default function SideQuestModal({
  isOpen,
  onClose,
  onAccept,
  quest,
}: SideQuestModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-[100] flex overflow-hidden rounded-3xl px-5 pb-4 pt-14 backdrop-blur-[2px]">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quest-title"
        className="relative mx-auto flex h-full min-h-0 w-full max-w-xs flex-col gap-3 text-black"
      >
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain touch-pan-y">
          {/* Header */}
          <div className="relative">
            <h2
              id="quest-title"
              className="break-words text-base leading-snug text-blue-700 font-black uppercase tracking-wide"
            >
              {quest.name}
            </h2>
            <p className="mt-2 break-words text-xs leading-5 text-slate-900">
              {quest.description}
            </p>
          </div>

          {/* Circular side quest image */}
          <div className="flex justify-center py-4">
            <div className="h-28 w-28 overflow-hidden rounded-full border-[5px] border-blue-700 shadow-[0_0_18px_rgba(34,211,238,0.35)]">
              <img
                src={`/images/${quest.id}.jpg`}
                alt={quest.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Keep the reward and actions visible even for longer descriptions. */}
        <div className="flex shrink-0 flex-col gap-3">

          {/* Difficulty and reward */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col items-center justify-center min-w-0 rounded-lg p-2">
             <p className="text-[9px] uppercase tracking-wider text-slate-900">
                Difficulty
              </p>
             <p className="mt-1 uppercase break-words text-xs font-bold text-amber-600">
                {quest.difficulty}
              </p>
            </div>

            <div className="flex flex-col items-center min-w-0 rounded-lg p-2">
             <p className="text-[9px] uppercase tracking-wider text-slate-900">
                Reward
              </p>
             <p className="mt-1  break-words text-xs font-bold text-amber-600">
                {quest.reward}
              </p>
            </div>
          </div>

        
          {/* Action buttons */}
          <div className="flex flex-col items-center gap-1">
            <button
              type="button"
              onClick={onAccept}
              className="w-full rounded-lg bg-blue-700 px-3 py-2.5 text-xs font-extrabold uppercase tracking-widest text-white transition hover:bg-blue-600 active:scale-[0.98]"
            >
              Accept Quest
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close quest"
              className="flex h-7 w-7 items-center justify-center rounded-full text-lg font-bold text-slate-900 transition hover:bg-white/60"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
