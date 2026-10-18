import { useEffect, useRef, useState } from 'react'
import { pokemon, quests } from './data'
import PokemonDetail, { PokemonArtwork } from './components/PokemonDetail'
import './App.css'
import CampusWelcome from './components/CampusWelcome'
import gtLogo from './assets/gt-logo.png'

type Profile = { name: string; handle: string; bio: string }
function readSaved<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}
const initialProfile = {
  name: 'Alexis',
  handle: 'techstudent',
  bio: 'Chasing Pokémon between classes. Go Jackets! 🐝',
}
function App() {
  const [profile, setProfile] = useState<Profile>(() => {
    const p = readSaved('poketech-profile', initialProfile)
    return p &&
      typeof p.name === 'string' &&
      typeof p.handle === 'string' &&
      typeof p.bio === 'string'
      ? p
      : initialProfile
  })
  const [favorites, setFavorites] = useState<string[]>(() => {
    const f = readSaved('poketech-favorites', ['pikachu-1'])
    return Array.isArray(f) ? f.filter((x) => typeof x === 'string') : []
  })
  const [tab, setTab] = useState('collection')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('recent')
  const [editing, setEditing] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (editing) dialogRef.current?.showModal()
  }, [editing])
  const [storageError, setStorageError] = useState(false)
  const [route, setRoute] = useState(window.location.hash)
  useEffect(() => {
    const change = () => {
      setRoute(window.location.hash)
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', change)
    return () => window.removeEventListener('hashchange', change)
  }, [])
  useEffect(() => {
    try {
      localStorage.setItem('poketech-profile', JSON.stringify(profile))
      localStorage.setItem('poketech-favorites', JSON.stringify(favorites))
      setStorageError(false)
    } catch {
      setStorageError(true)
    }
  }, [profile, favorites])
  const selected = pokemon.find((p) => route === `#/pokemon/${p.id}`)
  const toggleFavorite = (id: string) =>
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((f) => f !== id)
        : [...previous, id],
    )
  const showAccount = (nextTab = 'collection') => {
    setTab(nextTab)
    window.location.hash = '/account'
  }
  const visible = pokemon
    .filter(
      (p) =>
        (filter !== 'favorites' || favorites.includes(p.id)) &&
        `${p.name} ${p.types.join(' ')} ${p.location}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      sort === 'cp'
        ? b.cp - a.cp
        : sort === 'name'
          ? a.name.localeCompare(b.name)
          : b.caughtOn.localeCompare(a.caughtOn),
    )
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#/account">
          <span className="brand-ball" />
          <span>
            SideQuest <span className="gold">GO</span>
            <small>THE CAMPUS IS YOURS.</small>
          </span>
        </a>
        <div className="nav-label">YOUR ADVENTURE</div>
        <nav>
          <button
            className={route === '#/welcome' ? 'active' : ''}
            onClick={() => {
              window.location.hash = '/welcome'
            }}
          >
            <span>⌖</span> Campus Adventure
          </button>
          <button
            className={
              route !== '#/welcome' && (selected || tab === 'collection')
                ? 'active'
                : ''
            }
            onClick={() => showAccount()}
          >
            <span>◈</span> Trainer Profile <i />
          </button>
          <button
            className={
              route !== '#/welcome' && !selected && tab === 'quests'
                ? 'active'
                : ''
            }
            onClick={() => showAccount('quests')}
          >
            <span>⚑</span> Side Quests <b>{quests.length}</b>
          </button>
        </nav>
        <div className="campus-card">
          <img className="campus-emblem" src={gtLogo} alt="Georgia Tech" />
          <strong>
            A different kind
            <br />
            of campus tour.
          </strong>
          <p>
            Every corner has a story.
            <br />
            Go find yours.
          </p>
          <span>
            ATLANTA, GA <i>↗</i>
          </span>
        </div>
        <div className="sidebar-footer">
          <span className="online-dot" /> GEORGIA TECH CAMPUS
          <small>Made for a little more adventure.</small>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div>
            <span className="breadcrumb">My Adventure</span>
            <span className="slash">/</span>
            {route === '#/welcome'
              ? 'Campus Adventure'
              : selected
                ? selected.name
                : 'Trainer Profile'}
          </div>
          <div className="topbar-right">
            <span className="campus-status">
              <i className="online-dot" /> Campus Explorer
            </span>
            <button
              className="mini-avatar"
              onClick={() => showAccount()}
              aria-label="Go to trainer profile"
            >
              {profile.name.charAt(0).toUpperCase()}
            </button>
          </div>
        </header>
        <main>
          {storageError && (
            <p role="status" className="storage-warning">
              Changes are available for this visit, but your browser could not
              save them.
            </p>
          )}
          {route === '#/welcome' ? (
            <CampusWelcome />
          ) : selected ? (
            <>
              <div className="page-heading">
                <div>
                  <div className="eyebrow">A FRIEND FOR EVERY ADVENTURE</div>
                  <h1>
                    Meet your Pokémon<span className="gold">.</span>
                  </h1>
                </div>
                <span className="edition">THE CAMPUS COLLECTION / 001</span>
              </div>
              <PokemonDetail
                pokemon={selected}
                favorite={favorites.includes(selected.id)}
                onFavorite={() => toggleFavorite(selected.id)}
                onBack={() => showAccount()}
              />
            </>
          ) : (
            <>
              <div className="page-heading">
                <div>
                  <h1>
                    Trainer Profile<span className="gold">.</span>
                  </h1>
                </div>
                <span className="edition">RAMBLIN’ · ROAMING · COLLECTING</span>
              </div>
              <section className="profile-card">
                <div className="profile-banner">
                  <div className="banner-grid" />
                  <span className="banner-word">GO JACKETS!</span>
                  <span className="banner-tag">
                    GEORGIA TECH EXPLORERS CLUB <span>✦</span>
                  </span>
                  <div className="orbit o1" />
                  <div className="orbit o2" />
                </div>
                <div className="profile-body">
                  <div className="avatar">
                    <span>⚡</span>
                    <small>LVL 12</small>
                  </div>
                  <div className="profile-copy">
                    <div className="name-row">
                      <h2>{profile.name}</h2>
                      <span className="trainer-badge">GT TRAINER</span>
                    </div>
                    <p className="handle">
                      @{profile.handle} <span>•</span> Joined October 2026
                    </p>
                    <p className="bio">{profile.bio}</p>
                  </div>
                  <button
                    className="outline-button"
                    onClick={() => setEditing(true)}
                  >
                    ✎ <span>Edit Profile</span>
                  </button>
                </div>
                <div className="level-row">
                  <span>
                    LEVEL <b>12</b>
                  </span>
                  <div className="xp-track">
                    <div />
                  </div>
                  <span>
                    <b>2,450</b> / 4,000 XP <small>LEVEL 13 ↗</small>
                  </span>
                </div>
              </section>
              <section className="stats">
                <div>
                  <span className="stat-icon">◉</span>
                  <div>
                    <strong>
                      {pokemon.length.toString().padStart(2, '0')}
                    </strong>
                    <span>Pokémon Collected</span>
                  </div>
                  <small>GOTTA CATCH ’EM ALL</small>
                </div>
                <div>
                  <span className="stat-icon">⚑</span>
                  <div>
                    <strong>{quests.length.toString().padStart(2, '0')}</strong>
                    <span>Quests Completed</span>
                  </div>
                  <small>CURIOSITY PAYS OFF</small>
                </div>
                <div>
                  <span className="stat-icon">⌖</span>
                  <div>
                    <strong>
                      {new Set(pokemon.map((p) => p.location)).size
                        .toString()
                        .padStart(2, '0')}
                    </strong>
                    <span>Places Discovered</span>
                  </div>
                  <small>A CAMPUS OF POSSIBILITIES</small>
                </div>
              </section>
              <section className="collection-section">
                <div
                  className="section-tabs"
                  role="tablist"
                  aria-label="Profile sections"
                >
                  <button
                    role="tab"
                    aria-selected={tab === 'collection'}
                    onClick={() => setTab('collection')}
                  >
                    My Pokémon <span>{pokemon.length}</span>
                  </button>
                  <button
                    role="tab"
                    aria-selected={tab === 'quests'}
                    onClick={() => setTab('quests')}
                  >
                    Completed Quests <span>{quests.length}</span>
                  </button>
                </div>
                {tab === 'collection' ? (
                  <div role="tabpanel" aria-label="My Pokémon">
                    <div className="collection-tools">
                      <div className="filter-buttons">
                        <button
                          className={filter === 'all' ? 'selected' : ''}
                          onClick={() => setFilter('all')}
                        >
                          All Pokémon
                        </button>
                        <button
                          className={filter === 'favorites' ? 'selected' : ''}
                          onClick={() => setFilter('favorites')}
                        >
                          ☆ Favorites
                        </button>
                      </div>
                      <div className="search-sort">
                        <label className="search">
                          <span>⌕</span>
                          <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Find a Pokémon…"
                            aria-label="Search Pokémon"
                          />
                        </label>
                        <select
                          value={sort}
                          onChange={(e) => setSort(e.target.value)}
                          aria-label="Sort Pokémon"
                        >
                          <option value="recent">Recently Caught</option>
                          <option value="cp">Highest CP</option>
                          <option value="name">Name A–Z</option>
                        </select>
                      </div>
                    </div>
                    <div className="pokemon-grid">
                      {visible.map((p) => (
                        <article
                          className="pokemon-card"
                          key={p.id}
                          style={
                            {
                              '--pokemon-accent': p.accent,
                            } as React.CSSProperties
                          }
                        >
                          <div className="card-art">
                            <span className="card-dex">
                              #{String(p.dex).padStart(3, '0')}
                            </span>
                            <button
                              className={`favorite ${favorites.includes(p.id) ? 'selected' : ''}`}
                              aria-label={`${favorites.includes(p.id) ? 'Unfavorite' : 'Favorite'} ${p.name}`}
                              aria-pressed={favorites.includes(p.id)}
                              onClick={() => toggleFavorite(p.id)}
                            >
                              {favorites.includes(p.id) ? '★' : '☆'}
                            </button>
                            <a
                              href={`#/pokemon/${p.id}`}
                              aria-label={`View ${p.name}`}
                            >
                              <div className="art-ring" />
                              <PokemonArtwork pokemon={p} />
                            </a>
                          </div>
                          <a className="card-info" href={`#/pokemon/${p.id}`}>
                            <div>
                              <h3>{p.name}</h3>
                              <span className="cp">
                                CP <b>{p.cp}</b>
                              </span>
                            </div>
                            <div className="types">
                              {p.types.map((t) => (
                                <span
                                  key={t}
                                  className={`type ${t.toLowerCase()}`}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                            <p>
                              ⌖ {p.location}
                              <span>↗</span>
                            </p>
                          </a>
                        </article>
                      ))}
                    </div>
                    {!visible.length && (
                      <div className="empty-state">
                        <span>⌕</span>
                        <h3>No Pokémon found</h3>
                        <p>
                          Try another search or star a Pokémon to add a
                          favorite.
                        </p>
                        <button
                          className="outline-button"
                          onClick={() => {
                            setQuery('')
                            setFilter('all')
                          }}
                        >
                          Show all Pokémon
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="quests-list"
                    role="tabpanel"
                    aria-label="Completed quests"
                  >
                    <div className="quest-intro">
                      <h2>Little adventures. Lasting memories.</h2>
                      <p>Your completed campus quests, all in one place.</p>
                    </div>
                    {quests.map((q) => (
                      <article className="quest-card" key={q.id}>
                        <span className="quest-icon">{q.icon}</span>
                        <div>
                          <span className="quest-completed">
                            ✓ COMPLETED · {q.date}
                          </span>
                          <h3>{q.title}</h3>
                          <p>{q.description}</p>
                          <small>⌖ {q.place}</small>
                        </div>
                        <b>+{q.xp} XP</b>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
          <footer>
            <span className="footer-brand">SideQuest GO</span>
            <span>A little adventure between classes.</span>
            <span>
              ATLANTA, GEORGIA <span className="gold">✦</span>
            </span>
          </footer>
        </main>
      </div>
      {editing && (
        <dialog
          ref={dialogRef}
          className="modal"
          aria-labelledby="edit-title"
          onCancel={() => setEditing(false)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const data = new FormData(e.currentTarget)
              setProfile({
                name: String(data.get('name')).trim(),
                handle: String(data.get('handle')).trim(),
                bio: String(data.get('bio')).trim(),
              })
              setEditing(false)
            }}
          >
            <div className="modal-heading">
              <h2 id="edit-title">Your trainer identity</h2>
              <button
                type="button"
                onClick={() => setEditing(false)}
                aria-label="Close edit profile"
              >
                ×
              </button>
            </div>
            <label>
              Trainer name
              <input
                name="name"
                defaultValue={profile.name}
                required
                maxLength={40}
                pattern=".*\S.*"
                autoFocus
              />
            </label>
            <label>
              Username
              <input
                name="handle"
                defaultValue={profile.handle}
                required
                maxLength={30}
                pattern="[A-Za-z0-9_]+"
                title="Use letters, numbers, and underscores"
              />
            </label>
            <label>
              A little about you
              <textarea name="bio" defaultValue={profile.bio} maxLength={140} />
            </label>
            <div className="modal-actions">
              <button
                className="outline-button"
                type="button"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
              <button className="primary-button">Save profile</button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  )
}
export default App
