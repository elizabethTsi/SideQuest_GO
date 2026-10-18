import { useState } from 'react'
import {
  loadingImages,
  type LoadingTransition,
} from '../hooks/useLoadingTransition'
import './LoadingScreen.css'

export default function LoadingScreen({
  screen,
}: {
  screen: LoadingTransition
}) {
  // Pick once per appearance so clock updates cannot change the artwork.
  const [image] = useState(
    () => loadingImages[Math.floor(Math.random() * loadingImages.length)],
  )

  return (
    <div
      className="route-loading-screen"
      data-transition={screen}
      role="status"
      aria-label="Loading next screen"
      aria-live="polite"
    >
      <img src={image} alt="" />
      <span className="route-loading-label">Loading…</span>
    </div>
  )
}
