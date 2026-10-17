import { useEffect, useRef, useState } from "react";

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      setError(null);
      // Request permission for video stream
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }, // Use "environment" for rear camera on mobile
        audio: false, // Set to true if you want microphone access
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please grant permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Clean up the camera stream when the component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-xl max-h-screen mx-auto">
      <h2 className="text-xl font-bold text-slate-800 mb-4">React Camera Feed</h2>
      
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-slate-200 mb-4">
        {error && (
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-sm font-medium text-red-500 bg-red-50">
            {error}
          </div>
        )}
        {!stream && !error && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
            Camera is turned off
          </div>
        )}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className={`w-full h-full object-cover ${stream ? "block" : "hidden"}`}
        />
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4">
        {!stream ? (
          <button
            onClick={startCamera}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all"
          >
            Start Camera
          </button>
        ) : (
          <button
            onClick={stopCamera}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg shadow-sm transition-all"
          >
            Stop Camera
          </button>
        )}
      </div>
    </div>
  );
}
