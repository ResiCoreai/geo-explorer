// control camera state
import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/maplibre";
export function CameraControl() {
  const { current: map } = useMap();
  const [pitch, setPitch] = useState(0);
  const [bearing, setBearing] = useState(0);
  const [zoom, setZoom] = useState(0);
  useEffect(() => {
    if (map) {
      setPitch(map.getPitch());
      setBearing(map.getBearing());
      setZoom(map.getZoom());
      map.on("pitch", (e) => {
        if (
          e.originalEvent instanceof MouseEvent ||
          e.originalEvent instanceof KeyboardEvent
        ) {
          setPitch(map.getPitch());
        }
      });
      map.on("rotate", (e) => {
        if (
          e.originalEvent instanceof MouseEvent ||
          e.originalEvent instanceof KeyboardEvent
        ) {
          setBearing(map.getBearing());
        }
      });
      map.on("zoom", (e) => {
        if (
          e.originalEvent instanceof MouseEvent ||
          e.originalEvent instanceof KeyboardEvent
        ) {
          setZoom(map.getZoom());
        }
      });
    }
  }, [map]);
  const handlePitchChange = (event) => {
    const newPitch = Number(event.target.value);
    setPitch(newPitch);
    if (map) {
      map.setPitch(newPitch);
    }
  };
  const handleBearingChange = (event) => {
    const newBearing = Number(event.target.value);
    setBearing(newBearing);
    if (map) {
      map.setBearing(newBearing);
    }
  };
  const handleZoomChange = (event) => {
    const newZoom = Number(event.target.value);
    setZoom(newZoom);
    if (map) {
      map.setZoom(newZoom);
    }
  };
  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000,
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <div>
        <input
          type="range"
          min="0"
          max="85"
          value={pitch}
          onChange={handlePitchChange}
        />
        <label>Pitch: {pitch.toFixed(2)}°</label>
      </div>
      <div>
        <input
          type="range"
          min="0"
          max="360"
          step="1"
          value={bearing}
          onChange={handleBearingChange}
        />
        <label>Bearing: {bearing.toFixed(2)}</label>
      </div>
      <div>
        <input
          type="range"
          min="0"
          max="22"
          step="0.1"
          value={zoom}
          onChange={handleZoomChange}
        />
        <label>Zoom: {zoom.toFixed(2)}</label>
      </div>
    </div>
  );
}
