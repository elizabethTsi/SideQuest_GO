import { useCallback, useEffect, useRef, useState } from 'react'

export const LOADING_DURATION_MS = 1500

// Replace these paths independently when the final loading artwork is ready.
export const loadingImages = {
  loginToMap: '/images/sidequest.png',
  mapToTrainer: '/images/sidequest.png',
  questToPhoto: '/images/sidequest.png',
  photoToCatch: '/images/sidequest.png',
  backToMap: '/images/sidequest.png',
}
export type LoadingTransition = keyof typeof loadingImages
export type StartLoadingTransition = (
  destination: LoadingTransition,
  navigate: () => void,
) => void

export function useLoadingTransition() {
  const [loading, setLoading] = useState<LoadingTransition | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const transition: StartLoadingTransition = useCallback(
    (destination, navigate) => {
      // Ignore double clicks while the current transition is in progress.
      if (timer.current !== null) return
      setLoading(destination)
      timer.current = setTimeout(() => {
        timer.current = null
        navigate()
        setLoading(null)
      }, LOADING_DURATION_MS)
    },
    [],
  )

  useEffect(
    () => () => {
      if (timer.current !== null) clearTimeout(timer.current)
    },
    [],
  )

  return { loading, transition }
}
