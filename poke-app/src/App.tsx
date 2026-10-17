import { useEffect, useState } from 'react'
import Accounts from './accounts'
import CampusWelcome from './components/CampusWelcome'
import './App.css'
import './phone.css'

export default function App() {
  const [route, setRoute] = useState(window.location.hash)
  useEffect(() => {
    const onRouteChange = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onRouteChange)
    return () => window.removeEventListener('hashchange', onRouteChange)
  }, [])
  const isWelcome = !route || route === '#/welcome'

  return (
    <div className="phone-preview">
      <div className="phone-frame" aria-label="SideQuest GO phone preview">
        <div className="phone-content">
          {isWelcome ? <CampusWelcome /> : <Accounts route={route} />}
        </div>
        <nav
          className="phone-navigation"
          aria-label="Temporary preview navigation"
        >
          <a href="#/welcome" aria-current={isWelcome ? 'page' : undefined}>
            Campus Adventure
          </a>
          <a href="#/account" aria-current={!isWelcome ? 'page' : undefined}>
            Trainer Profile
          </a>
        </nav>
      </div>
    </div>
  )
}
