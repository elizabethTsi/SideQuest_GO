import type { Pokemon } from '../data'

export function PokemonArtwork({
  pokemon,
  className = '',
}: {
  pokemon: Pokemon
  className?: string
}) {
  return (
    <img
      className={className}
      src={pokemon.image}
      alt={pokemon.name}
      onError={(event) => {
        event.currentTarget.style.display = 'none'
        event.currentTarget.parentElement?.classList.add('art-missing')
      }}
    />
  )
}

/** Render any Pokémon by supplying its artwork, descriptive fields, stats and moves. */
export default function PokemonDetail({
  pokemon,
  favorite,
  onFavorite,
  onBack,
}: {
  pokemon: Pokemon
  favorite: boolean
  onFavorite: () => void
  onBack: () => void
}) {
  return (
    <section className="detail-layout">
      <div
        className="detail-stage"
        style={{ '--pokemon-accent': pokemon.accent } as React.CSSProperties}
      >
        <button className="stage-back" onClick={onBack}>
          ← Collection
        </button>
        <button
          className={`favorite detail-favorite ${favorite ? 'selected' : ''}`}
          aria-label={favorite ? 'Remove favorite' : 'Add favorite'}
          aria-pressed={favorite}
          onClick={onFavorite}
        >
          {favorite ? '★' : '☆'}
        </button>
        <div className="detail-cp">
          <span>CP</span> {pokemon.cp}
        </div>
        <div className="power-arc">
          <i />
        </div>
        <span className="spark s1">✦</span>
        <span className="spark s2">✧</span>
        <span className="spark s3">✦</span>
        <div className="detail-art">
          <PokemonArtwork pokemon={pokemon} />
        </div>
        <div className="stage-caption">YOUR CAMPUS COMPANION</div>
      </div>
      <div className="detail-info">
        <div className="eyebrow">
          POKÉDEX #{String(pokemon.dex).padStart(3, '0')}
        </div>
        <h1>
          {pokemon.name}
          <span className="gender">♂</span>
        </h1>
        <div className="types">
          {pokemon.types.map((type) => (
            <span className={`type ${type.toLowerCase()}`} key={type}>
              {type}
            </span>
          ))}
        </div>
        <div className="hp-track">
          <div />
        </div>
        <p className="hp-label">
          {pokemon.hp} / {pokemon.hp} HP
        </p>
        <div className="measurements">
          <div>
            <strong>
              {pokemon.weight} <small>kg</small>
            </strong>
            <span>WEIGHT</span>
          </div>
          <div>
            <strong>{pokemon.types[0]}</strong>
            <span>TYPE</span>
          </div>
          <div>
            <strong>
              {pokemon.height} <small>m</small>
            </strong>
            <span>HEIGHT</span>
          </div>
        </div>
        <p className="description">{pokemon.description}</p>
        <h3>
          Moves <span>READY FOR ADVENTURE</span>
        </h3>
        {pokemon.moves.map((move) => (
          <div className="move" key={move.name}>
            <span className={`move-icon ${move.type.toLowerCase()}`}>✦</span>
            <div>
              <strong>{move.name}</strong>
              <small>{move.type}</small>
            </div>
            <b>{move.power}</b>
          </div>
        ))}
        <div className="caught">
          <span>⌖</span>
          <div>
            <strong>Found at {pokemon.location}</strong>
            <small>
              Caught on{' '}
              {new Date(`${pokemon.caughtOn}T12:00:00`).toLocaleDateString(
                'en-US',
                { month: 'long', day: 'numeric', year: 'numeric' },
              )}{' '}
              · Georgia Tech
            </small>
          </div>
          <span>✓</span>
        </div>
      </div>
    </section>
  )
}
