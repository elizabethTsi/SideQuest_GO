
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
    <div className="absolute inset-0 z-[100] flex items-center justify-center overflow-hidden rounded-3xl p-3 backdrop-blur-[2px]">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quest-title"
        className="relative flex max-h-full w-full max-w-xs flex-col overflow-hidden rounded-2xl  text-black"
      >
        {/* Header */}
        <div className="relative shrink-0 p-3">
          <h2
            id="quest-title"
            className="break-words pr-6 text-blue-700 font-black uppercase tracking-wide"
          >
            {quest.name}
          </h2>
           <p className="break-words text-xs leading-5 text-slate-900">
            {quest.description}
          </p>
        </div>

         {/* Circular side quest image */}
        <div className="flex shrink-0 justify-center px-3 pt-4 mb-20">
          <div className="h-28 w-28 overflow-hidden rounded-full border-[5px] border-blue-700 shadow-[0_0_18px_rgba(34,211,238,0.35)]">
            <img
              src={`/images/${quest.id}.jpg`}
              alt={quest.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Scrollable quest details */}
        <div className="min-h-0 overflow-y-auto overscroll-contain p-3">

          {/* Difficulty and reward */}
          <div className="grid grid-cols-2 gap-2">
            <div className="min-w-0 rounded-lg p-2">
              <p className="text-[9px] uppercase tracking-wider text-slate-900">
                Difficulty
              </p>
              <p className="mt-1 break-words text-xs font-bold text-amber-600">
                {quest.difficulty}
              </p>
            </div>

            <div className="min-w-0 rounded-lg p-2">
              <p className="text-[9px] uppercase tracking-wider text-slate-900">
                Reward
              </p>
              <p className="mt-1 break-words text-xs font-bold text-amber-600">
                {quest.reward}
              </p>
            </div>
          </div>

        
          {/* Action buttons */}
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={onAccept}
              className="w-46 rounded-lg bg-blue-700 px-2 py-1.5 text-[9px] font-extrabold uppercase tracking-widest text-white transition hover:bg-blue-600 active:scale-[0.98]"            >
              Accept Quest
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close quest"
              className="flex h-6 w-6 items-center pb-0.5 pl-0.3 justify-center rounded-full text-[#008080] text-lg font-bold text-white transition"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
