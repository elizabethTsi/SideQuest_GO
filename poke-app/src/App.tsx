import { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import { useLoadingTransition } from './hooks/useLoadingTransition'
import MapPage from './pages/MapPage'
import { Wifi, BatteryFull, Signal } from 'lucide-react'
import Signin from './pages/signin'
import Accounts from './accounts'
import CatchEncounter from './components/CatchEncounter'
import { pokemon } from './data'
import {
  CATCHES_KEY,
  readCatches,
  caughtPokemon,
  createEncounter,
  type EncounterQuest,
} from './catches'
import './App.css'
import './phone.css'
import './profile-navigation.css'
import './trainer-theme.css'

function App() {
  const { loading, transition } = useLoadingTransition()
  const [time, setTime] = useState(new Date())
  const [page, setPage] = useState('home')
  const [route, setRoute] = useState(window.location.hash)
  const [catches, setCatches] = useState(readCatches)
  const [encounter, setEncounter] = useState<
    (ReturnType<typeof createEncounter> & { questTitle: string }) | null
  >(null)
  const collection = [...catches.map(caughtPokemon).reverse(), ...pokemon]
  const showingEncounter =
    page === 'map' && route === '#/catch' && encounter !== null

  function acceptQuest(quest: EncounterQuest) {
    setEncounter({ ...createEncounter(quest), questTitle: quest.title })
    window.location.hash = '/catch'
  }

  function saveCatch() {
    if (!encounter) return false
    const next = catches.some((record) => record.id === encounter.record.id)
      ? catches
      : [...catches, encounter.record]
    setCatches(next)
    try {
      localStorage.setItem(CATCHES_KEY, JSON.stringify(next))
      return true
    } catch {
      return false
    }
  }

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const onRouteChange = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onRouteChange)
    return () => window.removeEventListener('hashchange', onRouteChange)
  }, [])

  const showingProfile =
    page === 'map' && (route === '#/account' || route.startsWith('#/pokemon/'))

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div
        className={`phone-frame relative flex flex-col border w-[71.5mm] h-[147.6mm] rounded-3xl border-7 ${showingProfile ? 'trainer-theme' : ''}`}
      >
        <div
          className="relative h-full w-full min-h-0"
          inert={loading !== null}
          onClickCapture={(event) => {
            const link = (event.target as HTMLElement).closest(
              'a[href="#/map"]',
            )
            if (
              !link ||
              event.ctrlKey ||
              event.metaKey ||
              event.shiftKey ||
              event.altKey
            )
              return
            event.preventDefault()
            transition('backToMap', () => {
              window.location.hash = '/map'
            })
          }}
        >
          {page === 'home' && (
            <Signin
              onContinue={() => {
                transition('loginToMap', () => {
                  setPage('map')
                  window.location.hash = '/map'
                })
              }}
            />
          )}
          {page === 'map' && (
            <>
              {/* Keep the map mounted so returning preserves the dragged position. */}
              <div
                className="map-screen"
                hidden={showingProfile || showingEncounter}
              >
                <MapPage
                  onAcceptQuest={acceptQuest}
                  onTransition={transition}
                  onOpenProfile={() => {
                    transition('mapToTrainer', () => {
                      window.location.hash = '/account'
                    })
                  }}
                />
              </div>
              {showingEncounter && (
                <CatchEncounter
                  key={encounter.record.id}
                  pokemon={encounter.pokemon}
                  questTitle={encounter.questTitle}
                  onCatch={saveCatch}
                  onLeave={(destination) => {
                    const leave = () => {
                      setEncounter(null)
                      window.location.hash = destination
                    }
                    if (destination === '/map') transition('backToMap', leave)
                    else leave()
                  }}
                />
              )}
              {showingProfile && (
                <section
                  className="trainer-screen"
                  aria-label="Trainer account"
                >
                  <div className="trainer-navigation">
                    <a href="#/map">← Back to map</a>
                  </div>
                  <div className="trainer-content">
                    <Accounts route={route} pokemon={collection} />
                  </div>
                </section>
              )}
            </>
          )}
        </div>
        {loading && <LoadingScreen screen={loading} />}
        <div
          className={`phone-status absolute top-2 inset-x-0 z-10 ${showingProfile ? 'phone-status-profile' : ''}`}
        >
          <div className="phone-status-row">
            <div className="phone-status-time">
              {time
                .toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })
                .replace(/\s?[AP]M$/, '')}
            </div>
            <div className="phone-status-island" aria-hidden="true" />
            <div className="phone-status-icons">
              <div className="flex items-center gap-1">
                <Signal size={12} strokeWidth={2} />
                <Wifi size={12} strokeWidth={2} />
                <BatteryFull size={12} strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
