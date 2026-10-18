import { useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import SideQuestModal from '../components/SideQuestModal'
import PhotoUpload from '../components/PhotoUpload'
import type { EncounterQuest } from '../catches'

const WORLD_WIDTH = 5600 / 2
const WORLD_HEIGHT = 4320 / 2


const quests = [
  {
    id: 1,
    title: 'Find Buzz and Take a Photo',
    description:
      "Find Georgia Tech's favorite mascot, Buzz, somewhere on campus and snap a picture with him. Bonus points if you can get him to do a funny pose!",
    difficulty: 'Hard',
    reward: '250 XP',
    location: 'Georgia Tech Campus',
    x: 1685,
    y: 1430,
  },
  {
    id: 2,
    title: "Buy Coffee from Kaldi's Coffee",
    description:
      "Stop by Kaldi's Coffee and treat yourself to a drink. Try something new or stick with your usual order.",
    difficulty: 'Easy',
    reward: '50 XP',
    location: "Kaldi's Coffee",
    x: 1845,
    y: 1495,
  },
  {
    id: 3,
    title: 'Take an Exercise Class at the CRC',
    description:
      "Step outside your usual workout routine and join a group exercise class at the Campus Recreation Center. Whether it's yoga, cycling, or something completely new, give it a shot!",
    difficulty: 'Medium',
    reward: '150 XP',
    location: 'Campus Recreation Center (CRC)',
    x: 545,
    y: 1210,
  },
  {
    id: 4,
    title: 'LARP as a Student from Another College at a Football Game',
    description:
      'Show up to a Georgia Tech football game dressed like you belong to another university. Represent your fake school with confidence and see how long you can keep up the act.',
    difficulty: 'Hard',
    reward: '300 XP',
    location: 'Bobby Dodd Stadium',
    x: 1250,
    y: 900,
  },
  {
    id: 5,
    title: 'Study Until Sunset at Crosland Tower 7th Floor',
    description:
      'Grab your laptop, find a seat on the seventh floor of Crosland Tower, and get some studying done while the sun sets over Atlanta.',
    difficulty: 'Medium',
    reward: '175 XP',
    location: 'Crosland Tower, 7th Floor',
    x: 1500,
    y: 1100,
  },
  {
    id: 6,
    title: "Get in a Random Line Without Knowing What It's For",
    description:
      "See a line forming somewhere on campus? Join it without asking what everyone's waiting for. Stick around until you reach the front and discover what you've gotten yourself into.",
    difficulty: 'Easy',
    reward: '75 XP',
    location: 'Anywhere on Campus',
    x: 1000,
    y: 700,
  },
  {
    id: 7,
    title: 'Get Creative at Paper & Clay',
    description:
      'Take a break from assignments and head to Paper & Clay to make something with your hands. Paint, craft, or experiment with something creative.',
    difficulty: 'Easy',
    reward: '100 XP',
    location: 'Paper & Clay',
    x: 1950,
    y: 1200,
  },
  {
    id: 8,
    title: 'Take a Dance Class',
    description:
      'Try out a dance class on campus, even if you have absolutely no rhythm. Learn some moves, meet new people, and embrace looking a little ridiculous.',
    difficulty: 'Medium',
    reward: '175 XP',
    location: 'Campus Recreation Center (CRC)',
    x: 650,
    y: 1350,
  },
  {
    id: 9,
    title: 'Run the Pi Mile',
    description:
      "Challenge yourself to run Georgia Tech's famous Pi Mile, a roughly 3.14-mile route around campus. Whether you're going for a personal record or just trying to finish, make it to the end!",
    difficulty: 'Hard',
    reward: '300 XP',
    location: 'Pi Mile Trail',
    x: 850,
    y: 1700,
  },
  {
    id: 10,
    title: 'Climb Freshman Hill',
    description:
      "Conquer one of Georgia Tech's most infamous uphill walks. Make your way up Freshman Hill without stopping and experience the daily struggle of every student who's ever been late to class.",
    difficulty: 'Easy',
    reward: '75 XP',
    location: 'Freshman Hill',
    x: 1150,
    y: 1450,
  },
  {
    id: 11,
    title: "Attend a Lecture for a Class You Don't Take",
    description:
      'Find a lecture on a subject you know absolutely nothing about and sit in, with permission. See how much you can learn from a class you never planned on taking.',
    difficulty: 'Medium',
    reward: '150 XP',
    location: 'Georgia Tech Lecture Halls',
    x: 1400,
    y: 1550,
  },
  {
    id: 12,
    title: 'Attend a Student Performance at the Ferst Center',
    description:
      'Check out a student performance at the Ferst Center for the Arts. Whether it is music, theater, or dance, support your fellow Yellow Jackets and discover some campus talent.',
    difficulty: 'Easy',
    reward: '150 XP',
    location: 'Ferst Center for the Arts',
    x: 1750,
    y: 800,
  },
  {
    id: 13,
    title: 'Find Free Food on Campus',
    description:
      'Go on a mission to find free food somewhere on Georgia Tech campus. Look for student organization events, campus giveaways, or other opportunities to score a free snack or meal.',
    difficulty: 'Medium',
    reward: '175 XP',
    location: 'Anywhere on Campus',
    x: 900,
    y: 1100,
  },
  {
    id: 14,
    title: 'Attend a Random Career Fair',
    description:
      "Walk into a career fair outside your usual field of interest and explore what other industries have to offer. Talk to a recruiter, discover a job you've never heard of, or just see what's happening.",
    difficulty: 'Medium',
    reward: '150 XP',
    location: 'Georgia Tech Career Fair Venues',
    x: 2050,
    y: 1450,
  },
  {
    id: 15,
    title: 'Wear UGA Merch on Campus',
    description:
      'Commit the ultimate Georgia Tech betrayal by showing up on campus wearing University of Georgia merchandise. Walk around confidently and see how your fellow Yellow Jackets react.',
    difficulty: 'Hard',
    reward: '300 XP',
    location: 'Georgia Tech Campus',
    x: 700,
    y: 850,
  },
  {
    id: 16,
    title: 'Pretend to Give a Lecture in an Empty Lecture Hall',
    description:
      'Find an empty, available lecture hall and step up to the podium. Deliver your most convincing professor impression to your friends, complete with dramatic explanations and imaginary homework.',
    difficulty: 'Medium',
    reward: '175 XP',
    location: 'Georgia Tech Lecture Halls',
    x: 1550,
    y: 1750,
  },
  {
    id: 17,
    title: 'Take a Multi-Person Scooter Ride',
    description:
      'Gather your friends for a group scooter adventure around campus. Everyone gets their own scooter—ride together, explore familiar paths, and turn an ordinary trip into a mini expedition.',
    difficulty: 'Medium',
    reward: '175 XP',
    location: 'Georgia Tech Campus',
    x: 450,
    y: 1600,
  },
  {
    id: 18,
    title: 'Ride the Slides Outside the Kendeda Building',
    description:
      'Head over to the Kendeda Building and find its outdoor slides. Give them a try where permitted and relive a little bit of your childhood between college classes.',
    difficulty: 'Easy',
    reward: '75 XP',
    location: 'Kendeda Building',
    x: 1900,
    y: 1750,
  },
  {
    id: 19,
    title: 'Find the CULC Roof Garden',
    description:
      'Explore the Clough Undergraduate Learning Commons and make your way to its rooftop garden. Take a break from the busy campus and enjoy a quiet green space hidden above the crowds.',
    difficulty: 'Easy',
    reward: '100 XP',
    location: 'Clough Undergraduate Learning Commons (CULC)',
    x: 1100,
    y: 1050,
  },
  {
    id: 20,
    title: 'Take a Picture with Tech Tower',
    description:
      "Visit one of Georgia Tech's most iconic landmarks, Tech Tower, and take a picture to commemorate your visit. Get creative with your angle or pose and capture a little piece of Tech history.",
    difficulty: 'Easy',
    reward: '75 XP',
    location: 'Tech Tower',
    x: 1350,
    y: 1250,
  },
]

import type { StartLoadingTransition } from '../hooks/useLoadingTransition'

type MapPageProps = {
  onTransition: StartLoadingTransition
  onOpenProfile: () => void
  onAcceptQuest: (quest: EncounterQuest) => void
}

export default function MapPage({
  onOpenProfile,
  onAcceptQuest,
  onTransition,
}: MapPageProps) {
  const [selectedQuest, setSelectedQuest] = useState<
    (typeof quests)[number] | null
  >(null)

  const [page, setPage] = useState<'map' | 'upload'>('map')
  const [activeQuest, setActiveQuest] = useState<EncounterQuest | null>(null)
  const encounterStarted = useRef(false)
  const viewportRef = useRef<HTMLDivElement>(null)

  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: -700, y: -600 })
  const [compassRotation, setCompassRotation] = useState(0)

  const dragStart = useRef({
    pointerX: 0,
    pointerY: 0,
    x: 0,
    y: 0,
  })

  function clampPosition(x: number, y: number, scale = zoom) {
    const viewport = viewportRef.current

    if (!viewport) return { x, y }

    const minX = Math.min(0, viewport.clientWidth - WORLD_WIDTH * scale)
    const minY = Math.min(0, viewport.clientHeight - WORLD_HEIGHT * scale)

    return {
      x: Math.max(minX, Math.min(0, x)),
      y: Math.max(minY, Math.min(0, y)),
    }
  }

  function changeZoom(nextZoom: number) {
    const newZoom = Math.max(0.5, Math.min(3, nextZoom))
    const viewport = viewportRef.current

    if (!viewport) return

    const centerX = viewport.clientWidth / 2
    const centerY = viewport.clientHeight / 2

    const worldX = (centerX - position.x) / zoom
    const worldY = (centerY - position.y) / zoom

    const nextX = centerX - worldX * newZoom
    const nextY = centerY - worldY * newZoom

    setZoom(newZoom)
    setPosition(clampPosition(nextX, nextY, newZoom))
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest('button')) return

    e.currentTarget.setPointerCapture(e.pointerId)

    dragStart.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      x: position.x,
      y: position.y,
    }
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return

    const dx = e.clientX - dragStart.current.pointerX
    const dy = e.clientY - dragStart.current.pointerY

    setPosition(
      clampPosition(dragStart.current.x + dx, dragStart.current.y + dy),
    )

    // Rotate the compass based on the drag direction.
    if (Math.abs(dx) + Math.abs(dy) > 0) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI)
      setCompassRotation(angle + 90)
    }
  }

  function resetMap() {
    setZoom(1)
    setPosition(clampPosition(-700, -600, 1))
    setCompassRotation(0)
  }

  if (page === 'upload' && activeQuest) {
    return (
      <PhotoUpload
        key={activeQuest.id}
        onBack={() => {
          onTransition('backToMap', () => {
            setActiveQuest(null)
            setPage('map')
          })
        }}
        onSubmit={() => {
          if (encounterStarted.current) return
          encounterStarted.current = true
          onTransition('photoToCatch', () => {
            onAcceptQuest(activeQuest)
            setActiveQuest(null)
            setPage('map')
          })
        }}
      />
    )
  }

  return (
    <div
      ref={viewportRef}
      className="relative h-full w-full overflow-hidden rounded-3xl bg-slate-200 touch-none"
    >
      {/* Moving map world */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className="absolute left-0 top-0 cursor-grab active:cursor-grabbing"
        style={{
          width: WORLD_WIDTH,
          height: WORLD_HEIGHT,
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
          transformOrigin: 'top left',
        }}
      >
        <img
          src="/images/tech_map.jpg"
          alt="Find Quests!"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-fill"
        />

        {quests.map((quest) => (
          <button
            key={quest.id}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setSelectedQuest(quest)}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[#3b4cca] px-3 py-2 text-sm font-bold text-white shadow-lg"
            style={{ left: quest.x, top: quest.y }}
            aria-label={`Open quest: ${quest.title}`}
          >
            <MapPin className="my-1 text-yellow-300" />
          </button>
        ))}
      </div>

      {/* Fixed center compass */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-40 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-white shadow-xl"
        aria-label="Map compass"
      >
        <img
          src="/images/ramblin.png"
          alt="Ramblin Wreck Car"
          className="h-14 w-14 shadow-xl"
          style={{
            transform: `rotate(${compassRotation}deg)`,
            transition: 'transform 100ms ease-out',
          }}
        />
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-17 right-4 z-50 flex flex-col gap-2">
        <div className="flex flex-row justify-evenly">
          <button
            type="button"
            onClick={() => changeZoom(zoom + 0.25)}
            className="flex h-5 w-5 items-center justify-center rounded-lg bg-white text-2xl font-bold text-slate-900 shadow-lg"
            aria-label="Zoom in"
          >
            +
          </button>

          <button
            type="button"
            onClick={() => changeZoom(zoom - 0.25)}
            className="flex h-5 w-5 items-center justify-center rounded-lg bg-white text-2xl font-bold text-slate-900 shadow-lg"
            aria-label="Zoom out"
          >
            −
          </button>
        </div>

        <button
          type="button"
          onClick={resetMap}
          className="flex h-8 w-12 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-900 shadow-lg"
          aria-label="Reset map"
        >
          1:1
        </button>

        <div className="rounded-lg bg-white px-2 py-1 text-center text-xs font-semibold text-slate-900 shadow">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Profile button */}
      <button
        className="absolute bottom-4 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-lg"
        onClick={onOpenProfile}
        aria-label="Open trainer profile"
        title="Trainer Profile"
      >
        <span aria-hidden="true">⚡</span>
      </button>

      {/* Side quest modal */}
      <SideQuestModal
        isOpen={selectedQuest !== null}
        quest={{
          id: selectedQuest?.id ?? 0,
          name: selectedQuest?.title ?? '',
          description: selectedQuest?.description ?? '',
          difficulty: selectedQuest?.difficulty ?? '',
          reward: selectedQuest?.reward ?? '',
          location: selectedQuest?.location ?? '',
        }}
        onClose={() => setSelectedQuest(null)}
        onAccept={() => {
          if (!selectedQuest) return

          const quest = selectedQuest
          onTransition('questToPhoto', () => {
            setActiveQuest(quest)
            encounterStarted.current = false
            setSelectedQuest(null)
            setPage('upload')
          })
        }}
      />
    </div>
  )
}
