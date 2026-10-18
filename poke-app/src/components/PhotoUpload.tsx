import { useEffect, useRef, useState } from 'react'
import { ImagePlus, Upload, X, Check, ArrowLeft } from 'lucide-react'

type PhotoUploadProps = {
  onBack: () => void
  onSubmit: (photo: File) => void
}

export default function PhotoUpload({
  onBack,
  onSubmit,
}: PhotoUploadProps) {
  const [photo, setPhoto] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  function handlePhotoChange(file?: File) {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Your photo must be smaller than 10 MB.')
      return
    }

    if (preview) URL.revokeObjectURL(preview)

    setPhoto(file)
    setPreview(URL.createObjectURL(file))
    setError('')
  }

  function removePhoto() {
    if (preview) URL.revokeObjectURL(preview)

    setPhoto(null)
    setPreview(null)
    setError('')

    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto rounded-3xl bg-white p-4 font-sans text-slate-900">
      {/* Header */}
      <div className="mt-4 flex shrink-0 items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          style={{ fontSize: '10px' }}
          className="flex items-center gap-1 rounded-lg py-2 pr-2 text-xs font-medium text-slate-600 transition hover:text-blue-950"
        >
          <ArrowLeft size={17} />
          Back
        </button>
      </div>

      {/* Heading */}
      <div className="mb-2 mt-5 shrink-0">
        <div className="mb-2 inline-flex rounded-full px-3 py-1">
          <span className="text-[16px] font-semibold uppercase tracking-widest">
            Quest verification
          </span>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(event) => handlePhotoChange(event.target.files?.[0])}
      />

      {/* Photo upload card */}
      <div className="shrink-0 rounded-2xl border border-slate-200 bg-slate-50 p-3">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              Your quest photo
            </h2>
            <p className="mt-1 text-[11px] text-slate-500">
              JPG, PNG · Up to 10 MB
            </p>
          </div>

          {preview && (
            <button
              type="button"
              onClick={removePhoto}
              aria-label="Remove photo"
              className="rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-blue-950"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="relative flex h-44 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-8 border-blue-800 bg-blue-100 transition hover:border-blue-800 hover:bg-blue-50/40"
        >
          {preview ? (
            <img
              src={preview}
              alt="Selected quest photo preview"
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : (
            <>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-300 text-blue-450">
                <ImagePlus size={24} strokeWidth={1.8} />
              </div>

              <span className="text-sm font-semibold text-[#3b4cca]">
                Add a photo
              </span>

              <span className="mt-1 text-xs text-slate-500">
                Browse files or take a picture
              </span>
            </>
          )}
        </button>

        {photo && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-white p-2">
            <Check size={16} className="shrink-0 text-blue-900" />
            <span className="truncate text-xs text-slate-600">
              {photo.name}
            </span>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}

      {/* Bottom action */}
      <div className="mt-auto shrink-0 pt-5">
        <button
          type="button"
          disabled={!photo}
          onClick={() => {
            if (photo) onSubmit(photo)
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <Upload size={17} />
          Submit photo & catch
        </button>

        <p className="mt-3 text-center text-[10px] leading-4 text-slate-400">
          A photo submission is required to start the catch encounter.
        </p>
      </div>
    </div>
  )
}