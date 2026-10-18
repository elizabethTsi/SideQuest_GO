# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## SideQuest GO pages

Run `npm install` and `npm run dev` from this directory. `npm run build` checks TypeScript and creates the production bundle.

- `#/account`: trainer profile, searchable/sortable collection, favorites, and completed quests.
- `#/pokemon/pikachu-1`: an individually linkable Pokémon detail page. Each collection entry has its own route.

### Add a Pokémon

Add an object matching the exported `Pokemon` interface to `src/data.ts`. Give it a unique `id`, Pokédex number, name, image URL (or local public asset path), types, CP, HP, weight in kilograms, height in meters, description, capture location, ISO capture date, accent color, and moves. It automatically appears in the collection and gets a detail URL.

The standalone component can also receive data from an API:

```tsx
<PokemonDetail
  pokemon={myPokemon}
  favorite={isFavorite}
  onFavorite={toggleFavorite}
  onBack={returnToCollection}
/>
```

`PokemonDetail` is in `src/components/PokemonDetail.tsx`. The `pokemon` prop accepts any `Pokemon` object; no species-specific layout changes are needed.

### Account integration

This is a front-end preview, not an authentication system. The trainer and collected Pokémon/quest history are sample data. Name, handle, biography and favorites persist in localStorage on this browser. Replace the arrays in `src/data.ts` and the profile/localStorage state in `src/accounts.tsx` with your authenticated user's API data when connecting a backend. Level and XP are sample values. Quest history is read-only; this UI does not award completion or verify campus visits.

Pokémon artwork is loaded from PokeAPI's public sprite repository; fonts are loaded from Google Fonts. An internet connection is needed for these assets. Artwork failures display a fallback message.

## Phone preview

The app is contained in a single 71.5 mm × 147.6 mm phone frame, reduced to fit smaller browser windows. `src/App.tsx` owns this frame and hash navigation; `src/accounts.tsx` contains the trainer profile, collection, completed quests, Pokémon details, and profile editing. `src/phone.css` styles these views for the phone width independently of browser width.

The default screen (`#/welcome`) displays the campus image. Use the temporary Open Trainer Profile button or bottom navigation to switch to `#/account`. Account content scrolls inside the phone, and Pokémon cards open their details in the same frame.
