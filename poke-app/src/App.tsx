import { useState, useEffect } from "react";
import {
  Wifi,
  BatteryFull,
  Signal,
} from "lucide-react";

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="flex flex-col border w-[71.5mm] h-[147.6mm] rounded-3xl border-7">
        <div className="relative h-full">
          <img
            src="/images/sidequest.png"
            alt="SideQuest adventure"
            className="h-full rounded-2xl object-cover"
          />
          <div className="absolute top-2 right-2 z-10 items-center">
            <div className="text-white flex flex-row items-center justify-center">
              {/* Time */}
              <div className="pr-4 text-sm">
                {time.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }).replace(/\s?[AP]M$/, "")}
              </div>
              {/* floating camera island */}
              <div>
                <div className="bg-black w-[130px] h-[30px] rounded-3xl"/>
              </div>
              {/* battery, wifi, bars  */}
              <div className="pl-3">
                <div className="flex text-white items-center gap-2">
                  <Signal size={12} strokeWidth={2} />
                  <Wifi size={12} strokeWidth={2} />
                  <BatteryFull size={12} strokeWidth={2} />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
