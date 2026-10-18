import { useEffect, useRef, useState } from 'react'
import type { Pokemon } from '../data'
import './CatchEncounter.css'

type Props = {
  pokemon: Pokemon
  questTitle: string
  onCatch: () => boolean
  onLeave: (destination: string) => void
}

export default function CatchEncounter({
  pokemon,
  questTitle,
  onCatch,
  onLeave,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const screenRef = useRef<HTMLElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const swipeRef = useRef<{ x: number; y: number } | null>(null)
  const throwLock = useRef(false)
  const onCatchRef = useRef(onCatch)
  onCatchRef.current = onCatch
  const [phase, setPhase] = useState<'aim' | 'throwing' | 'caught'>('aim')
  const [camera, setCamera] = useState<
    'loading' | 'ready' | 'error' | 'practice'
  >('loading')
  const [attempt, setAttempt] = useState(0)
  const [useCamera, setUseCamera] = useState(true)
  const [saved, setSaved] = useState(true)
  const [hint, setHint] = useState('Swipe the ball upward to catch!')
  const [imageFailed, setImageFailed] = useState(false)
  const successRef = useRef<HTMLHeadingElement>(null)

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null
  }

  useEffect(() => {
    if (!useCamera) {
      setCamera('practice')
      return
    }
    let cancelled = false
    setCamera('loading')
    async function start() {
      try {
        if (!navigator.mediaDevices?.getUserMedia)
          throw new Error('Camera unavailable')
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        })
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
        if (!cancelled) setCamera('ready')
      } catch {
        if (!cancelled) {
          stopCamera()
          setCamera('error')
        }
      }
    }
    void start()
    return () => {
      cancelled = true
      stopCamera()
    }
  }, [attempt, useCamera])

  useEffect(() => {
    if (phase !== 'throwing') return
    const timer = window.setTimeout(() => {
      stopCamera()
      setSaved(onCatchRef.current())
      setPhase('caught')
    }, 1600)
    return () => window.clearTimeout(timer)
  }, [phase])

  useEffect(() => {
    if (phase === 'caught') successRef.current?.focus()
  }, [phase])

  function throwBall() {
    if (
      throwLock.current ||
      phase !== 'aim' ||
      !['ready', 'practice'].includes(camera)
    )
      return
    throwLock.current = true
    const height = screenRef.current?.clientHeight ?? 450
    screenRef.current?.style.setProperty('--throw-y', `${-height * 0.38}px`)
    setPhase('throwing')
    setHint('Nice throw!')
  }

  return (
    <section
      ref={screenRef}
      className={`catch-screen catch-${phase}`}
      aria-label="Catch a campus Pokémon"
    >
      <video
        className="catch-video"
        ref={videoRef}
        autoPlay
        muted
        playsInline
        aria-label="Live camera preview"
      />
      <div className="catch-shade" />
      {phase !== 'caught' && (
        <>
          <header className="catch-header">
            <button
              onClick={() => onLeave('/map')}
              aria-label="Leave encounter"
            >
              ×
            </button>
            <span>
              {camera === 'practice'
                ? 'PRACTICE ENCOUNTER'
                : 'CAMERA ENCOUNTER'}
            </span>
          </header>
          <div className="catch-name">
            <small>{questTitle}</small>
            <h2>{pokemon.name}</h2>
            <span>
              CP {pokemon.cp} · {pokemon.types.join(' / ')}
            </span>
          </div>
        </>
      )}
      {phase !== 'caught' && (
        <div className="catch-target">
          <div className="catch-ring" />
          {imageFailed ? (
            <span className="catch-image-fallback">{pokemon.name}</span>
          ) : (
            <img
              src={pokemon.image}
              alt={`Wild ${pokemon.name}`}
              onError={() => setImageFailed(true)}
            />
          )}
          <div className="catch-impact" aria-hidden="true">
            ✦
          </div>
        </div>
      )}
      {phase !== 'caught' && (
        <>
          <p className="catch-hint" role="status">
            {hint}
          </p>
          <button
            className="throw-ball"
            aria-label="Throw Poké Ball. Swipe up, or press Enter or Space."
            disabled={
              phase !== 'aim' || !['ready', 'practice'].includes(camera)
            }
            onPointerDown={(event) => {
              if (event.pointerType === 'mouse' && event.button !== 0) return
              swipeRef.current = { x: event.clientX, y: event.clientY }
              event.currentTarget.setPointerCapture(event.pointerId)
            }}
            onPointerUp={(event) => {
              const start = swipeRef.current
              swipeRef.current = null
              if (!start) return
              const up = start.y - event.clientY
              if (up >= 30 && up > Math.abs(event.clientX - start.x) * 0.6)
                throwBall()
              else setHint('Drag upward a little farther, then release.')
            }}
            onPointerCancel={() => {
              swipeRef.current = null
            }}
            onClick={(event) => {
              if (event.detail === 0) throwBall()
            }}
          >
            <span className="ball-center" />
          </button>
          <span className="throw-guide" aria-hidden="true">
            ↑
          </span>
        </>
      )}
      {phase === 'aim' && (camera === 'loading' || camera === 'error') && (
        <div className="camera-notice" role="status">
          <h3>
            {camera === 'loading'
              ? 'Opening your camera…'
              : 'Camera unavailable'}
          </h3>
          <p>
            {camera === 'loading'
              ? 'Allow camera access in your browser to bring this encounter to life.'
              : 'Allow camera access and retry, or catch against a practice background.'}
          </p>
          {camera === 'error' && (
            <button onClick={() => setAttempt((value) => value + 1)}>
              Retry camera
            </button>
          )}
          <button onClick={() => setUseCamera(false)}>
            Use practice background
          </button>
        </div>
      )}
      {phase === 'caught' && (
        <div
          className="catch-success"
          role="dialog"
          aria-modal="true"
          aria-labelledby="catch-success-title"
        >
          <div className="catch-success-card">
            <span className="catch-success-label">NEW CAMPUS COMPANION</span>
            {!imageFailed && <img src={pokemon.image} alt={pokemon.name} />}
            <h2 id="catch-success-title" ref={successRef} tabIndex={-1}>
              GOTCHA!
            </h2>
            <p>
              You caught <strong>{pokemon.name}</strong>.
            </p>
            <small>
              {saved
                ? 'Added to your trainer collection.'
                : 'Added for this visit. Your browser could not save this catch.'}
            </small>
            <button
              className="catch-primary"
              onClick={() => onLeave(`/pokemon/${pokemon.id}`)}
            >
              Meet {pokemon.name} →
            </button>
            <button onClick={() => onLeave('/account')}>
              View trainer profile
            </button>
            <button className="catch-back" onClick={() => onLeave('/map')}>
              Keep exploring
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
