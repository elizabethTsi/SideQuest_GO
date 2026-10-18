import { useCallback, useEffect, useRef, useState } from 'react'

export const LOADING_DURATION_MS = 1500

export const loadingImages = [
  '/images/loading screens.png',
  '/images/loading screens (1).png',
  '/images/loading screens (2).png',
  '/images/loading screens (3).png',
]
export type LoadingTransition =
  | 'loginToMap'
  | 'mapToTrainer'
  | 'questToPhoto'
  | 'photoToCatch'
  | 'backToMap'
export type StartLoadingTransition = (
  destination: LoadingTransition,
  navigate: () => void,
) => void

export function useLoadingTransition() {
  const [loading, setLoading] = useState<LoadingTransition | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Warm the browser cache before the first transition.
    loadingImages.forEach((src) => {
      const image = new Image()
      image.src = src
    })
  }, [])

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
