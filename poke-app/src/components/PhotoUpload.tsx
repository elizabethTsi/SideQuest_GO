import { useRef, useState } from "react";
import { ImagePlus, Upload, X, Check } from "lucide-react";

type PhotoUploadProps = {
  onBack: () => void;
  onSubmit: (photo: File) => void;
};

export default function PhotoUpload({
  onBack,
  onSubmit,
}: PhotoUploadProps) {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handlePhotoChange(file?: File) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Your photo must be smaller than 10 MB.");
      return;
    }

    if (preview) URL.revokeObjectURL(preview);

    setPhoto(file);
    setPreview(URL.createObjectURL(file));
    setError("");
  }

  function removePhoto() {
    if (preview) URL.revokeObjectURL(preview);
    setPhoto(null);
    setPreview(null);
    setError("");

    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto rounded-3xl bg-slate-950 p-5 text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/10"
        >
          ← Back
        </button>

        <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-400">
          SideQuest
        </span>
      </div>

      {/* Title */}
      <div className="mb-6 mt-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-400">
          Quest verification
        </p>

        <h1 className="text-2xl font-black uppercase tracking-wide">
          Upload your photo
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Show us your adventure! Upload a photo to prove you've completed
          your side quest.
        </p>
      </div>

      {/* Upload area */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(event) =>
          handlePhotoChange(event.target.files?.[0])
        }
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative flex min-h-64 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-teal-500/60 bg-teal-500/5 p-4 transition hover:border-teal-400 hover:bg-teal-500/10"
      >
        {preview ? (
          <img
            src={preview}
            alt="Selected quest photo preview"
            className="absolute inset-0 h-full w-full object-contain"
          />
        ) : (
          <>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/15 text-teal-400">
              <ImagePlus size={30} />
            </div>

            <span className="text-sm font-bold">
              Choose a photo
            </span>

            <span className="mt-2 text-xs text-slate-400">
              Tap to browse your images or take a photo
            </span>

            <span className="mt-4 text-[10px] uppercase tracking-wider text-slate-500">
              JPG, PNG, or other image formats · Max 10 MB
            </span>
          </>
        )}
      </button>

      {preview && (
        <div className="mt-3 flex items-center justify-between rounded-xl bg-white/5 p-3">
          <div className="flex min-w-0 items-center gap-2">
            <Check size={18} className="shrink-0 text-teal-400" />
            <span className="truncate text-xs text-slate-300">
              {photo?.name}
            </span>
          </div>

          <button
            type="button"
            onClick={removePhoto}
            aria-label="Remove photo"
            className="ml-2 rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {error}
        </p>
      )}

      {/* Submit */}
      <div className="mt-auto pt-6">
        <button
          type="button"
          disabled={!photo}
          onClick={() => photo && onSubmit(photo)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#008080] px-4 py-3 text-sm font-extrabold uppercase tracking-wider text-white transition hover:bg-[#006666] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Upload size={18} />
          Submit Photo
        </button>

        <p className="mt-3 text-center text-[10px] text-slate-500">
          Your photo will be submitted for quest verification.
        </p>
      </div>
    </div>
  );
}
