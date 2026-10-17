
import { useState } from "react";

type UserLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

export function useGeolocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function getLocation() {
    if (!navigator.geolocation) {
      setError("Your browser does not support GPS location.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setLoading(false);
      },
      (err) => {
        setError(
          err.code === 1
            ? "Location permission denied. Allow location access in your browser settings."
            : err.code === 2
              ? "Location unavailable. Try again outdoors."
              : "Location request timed out. Try again.",
        );
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      },
    );
  }

  return { location, loading, error, getLocation };
}
