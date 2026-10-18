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
    <div className="absolute inset-0 z-[100] flex items-center justify-center overflow-hidden rounded-3xl bg-black/70 p-3 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quest-title"
        className="relative flex max-h-full w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-cyan-400/40 bg-slate-950 text-white shadow-[0_0_40px_rgba(34,211,238,0.2)]"
      >
        {/* Header */}
        <div className="relative shrink-0 border-b border-cyan-400/20 bg-cyan-400/10 p-5">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quest"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xl transition hover:bg-white/20"
          >
            ×
          </button>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
            Incoming Side Quest
          </p>

          <h2
            id="quest-title"
            className="break-words pr-8 text-2xl font-black uppercase tracking-wide"
          >
            {quest.name}
          </h2>
        </div>

        {/* Side quest image — uses the quest ID as the filename */}
        <div className="shrink-0 px-5 pt-4">
          <img
            src={`/images/${quest.id}.jpg`}
            alt={quest.name}
            className="h-40 w-full rounded-2xl border border-white/10 object-cover"
          />
        </div>

        {/* Scrollable quest details */}
        <div className="min-h-0 space-y-5 overflow-y-auto overscroll-contain p-5">
          <p className="break-words text-sm leading-6 text-slate-300">
            {quest.description}
          </p>

          {/* Difficulty and reward */}
          <div className="grid grid-cols-2 gap-3">
            <div className="min-w-0 rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs uppercase tracking-wider text-slate-400">
                Difficulty
              </p>
              <p className="mt-1 break-words font-bold text-amber-300">
                {quest.difficulty}
              </p>
            </div>

            <div className="min-w-0 rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs uppercase tracking-wider text-slate-400">
                Reward
              </p>
              <p className="mt-1 break-words font-bold text-emerald-300">
                {quest.reward}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="rounded-xl bg-cyan-400/10 p-3">
            <p className="text-xs uppercase tracking-wider text-cyan-300">
              Location
            </p>
            <p className="mt-1 break-words text-sm font-semibold">
              {quest.location}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 pt-1">
            <button
              type="button"
              onClick={onAccept}
              className="w-full rounded-xl bg-cyan-400 px-3 py-3 font-black uppercase tracking-wide text-slate-950 transition hover:bg-cyan-300 active:scale-[0.98]"
            >
              Accept Quest
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl border border-white/15 px-3 py-3 font-bold text-slate-300 transition hover:bg-white/10"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}