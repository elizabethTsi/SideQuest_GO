# SideQuest GO

A Georgia Tech–themed campus adventure game inspired by Pokémon GO. Explore a campus map, take on side quests, submit a quest photo, and catch a campus companion through a camera-based encounter—all inside a phone-style interface.

## Features

- **Campus exploration:** drag the map, zoom, and select quest markers to discover campus challenges.
- **Side quests:** view a quest’s description, location, difficulty, and reward before accepting it.
- **Photo submission:** choose or take an image, preview it, and submit once to start a catch encounter. Images must be no larger than 10 MB.
- **Camera encounters:** see a random companion over the camera feed, then swipe or drag the Poké Ball upward to throw it. A practice background is available when you cannot use a camera.
- **Trainer profile:** edit your name, handle, and biography; browse your collection, favorites, and sample completed quests.
- **Companion details:** open a collection card to see its stats, moves, description, and capture information.
- **Loading artwork:** randomly selected images appear for 1.5 seconds during supported transitions.

## Run locally

Use Node.js 22.12+ and npm.

From the repository root:

```sh
cd poke-app
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

If your terminal is already inside the inner `poke-app` directory, run `npm install` and `npm run dev` directly. Do not add another `--prefix poke-app` from there.

No API keys or environment variables are required for the current prototype. Allow browser camera access when prompted. Camera access requires localhost or an HTTPS deployment; use the practice background if a camera is unavailable.

## Try the game

1. Click **Georgia Tech SSO** on the welcome screen to enter the map.
2. Select a quest marker to read its information.
3. Click **Accept Quest** to open photo submission.
4. Add a photo and click **Submit photo & catch** once.
5. Allow camera access or choose **Use practice background**.
6. Swipe upward on the Poké Ball, or drag it upward with a mouse, to catch the companion.
7. Use the catch confirmation to view the companion’s details, visit your trainer profile, or return to the map.

You can also open the trainer profile from the circular profile button on the map. **Back to map** and **Keep Exploring** return you to exploration.

## Development commands

Run these inside `poke-app/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Check TypeScript and build production files into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

The project uses React, TypeScript, Vite, Tailwind CSS, custom CSS, and Lucide icons. Navigation uses URL hashes and React state.

## Project structure

```text
poke-app/
├── public/images/                 # Companion art, quest photos, and loading screens
├── src/
│   ├── App.tsx                    # Phone shell, navigation, and encounter state
│   ├── accounts.tsx               # Trainer profile, collection, and quest history
│   ├── data.ts                    # Companion definitions and sample quest history
│   ├── catches.ts                 # Random encounters and saved catch records
│   ├── pages/
│   │   ├── signin.tsx             # Welcome/sign-in interface
│   │   └── MapPage.tsx            # Campus map, quest markers, and quest flow
│   ├── components/
│   │   ├── SideQuestModal.tsx     # Initial quest information
│   │   ├── PhotoUpload.tsx        # Photo selection and preview
│   │   ├── CatchEncounter.tsx     # Camera, throw animation, and catch confirmation
│   │   ├── PokemonDetail.tsx      # Reusable companion detail view
│   │   └── LoadingScreen.tsx      # Random loading artwork
│   ├── hooks/useLoadingTransition.ts
│   ├── phone.css                 # Phone frame and compact layouts
│   └── trainer-theme.css         # Trainer blue and yellow theme
└── package.json
```

## Customize the content

### Companions

Add an entry matching the `Pokemon` interface in `poke-app/src/data.ts`. Each entry includes a unique ID, name, image, types, stats, description, capture information, accent color, and moves. Place artwork in `poke-app/public/images/` and reference it as `/images/your-image.png`.

The collection and random encounter selection use this data. `PokemonDetail` renders each companion from its data rather than requiring a separate page component for every species.

### Quests

Edit the map quest definitions in `poke-app/src/pages/MapPage.tsx`. The initial quest panel loads its photo from `/images/<quest-id>.jpg`. Sample completed quest history is defined separately in `poke-app/src/data.ts`.

### Loading screens

Change `loadingImages` in `poke-app/src/hooks/useLoadingTransition.ts` to update the artwork pool. The current files are:

- `loading screens.png`
- `loading screens (1).png`
- `loading screens (2).png`
- `loading screens (3).png`

Each loading screen selects one image and keeps it visible for `LOADING_DURATION_MS` (currently `1500`). No extra visible loading label is added over the artwork.

Loading screens appear between login and map, map and trainer profile, quest acceptance and photo submission, photo submission and catching, and when returning to the map from those later screens. Opening or closing the initial quest information panel does not show a loading screen.

## Prototype behavior and storage

This is a front-end prototype. The Georgia Tech SSO button enters the game without authenticating; Facebook and Google are visual placeholders. The map is an interactive image rather than live GPS navigation. Catch encounters overlay graphics on camera video rather than performing spatial AR tracking.

Photo submission checks the selected file’s type and size and starts an encounter. It does not upload the photo to a server or verify that a quest was completed. Level, XP, and completed quest history are sample data and are not automatically awarded by the catch flow.

Profile edits, favorites, and new catches are saved in this browser’s `localStorage`:

| Key | Contents |
| --- | --- |
| `poketech-profile` | Trainer profile edits |
| `poketech-favorites` | Favorite companion IDs |
| `sidequest-catches-v1` | Captured companions and capture metadata |

The collection combines sample companions with saved catches. Data is not synced across devices; clearing site storage removes local progress. Reloading the app returns to the welcome screen, and an active encounter is not restored.
