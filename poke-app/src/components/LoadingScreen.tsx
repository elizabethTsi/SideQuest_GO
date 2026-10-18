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
  return (
    <div
      className="route-loading-screen"
      role="status"
      aria-label="Loading next screen"
      aria-live="polite"
    >
      <img src={loadingImages[screen]} alt="" />
      <span className="route-loading-label">Loading…</span>
    </div>
  )
}
