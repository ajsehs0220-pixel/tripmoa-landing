"use client";

import { useCallback, useMemo } from "react";
import { GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api";

const MAP_CONTAINER_STYLE = {
  width: "100%",
  height: "100%",
};

const DEFAULT_OPTIONS = {
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  gestureHandling: "greedy",
};

/**
 * @param {Array} locations - [{ name, lat, lng, image?, day? }]
 * @param {number|null} activeDay
 * @param {number|null} selectedIndex - externally controlled selected marker index
 * @param {Function} onMarkerSelect - called with index (or null) when a marker is clicked
 * @param {Function} onMapLoad - called with the google.maps.Map instance when ready
 */
export default function MapView({ locations = [], activeDay = null, selectedIndex = null, onMarkerSelect, onMapLoad }) {
  const filtered = useMemo(() => {
    if (activeDay == null) return locations;
    return locations.filter((loc) => loc.day === activeDay);
  }, [locations, activeDay]);

  const center = useMemo(() => {
    if (filtered.length === 0) return { lat: 34.6937, lng: 135.5023 };
    const avgLat = filtered.reduce((sum, l) => sum + l.lat, 0) / filtered.length;
    const avgLng = filtered.reduce((sum, l) => sum + l.lng, 0) / filtered.length;
    return { lat: avgLat, lng: avgLng };
  }, [filtered]);

  const handleMarkerClick = useCallback(
    (idx) => {
      onMarkerSelect?.(selectedIndex === idx ? null : idx);
    },
    [onMarkerSelect, selectedIndex]
  );

  if (locations.length === 0) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#888" }}>
        표시할 장소가 없어요
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={MAP_CONTAINER_STYLE}
      center={center}
      zoom={12}
      options={DEFAULT_OPTIONS}
      onLoad={onMapLoad}
    >
      {filtered.map((loc, idx) => {
        const isSelected = idx === selectedIndex;
        const size = isSelected ? 36 : 28;
        const fill = isSelected ? "#28c5f0" : "#1f2329";
        const r = size / 2 - 2;
        return (
          <MarkerF
            key={`${loc.name}-${idx}`}
            position={{ lat: loc.lat, lng: loc.lng }}
            icon={{
              url:
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(
                  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="${fill}" stroke="#ffffff" stroke-width="2.5"/></svg>`
                ),
              scaledSize: new window.google.maps.Size(size, size),
              anchor: new window.google.maps.Point(size / 2, size / 2),
            }}
            label={{
              text: String(idx + 1),
              color: "#fff",
              fontSize: isSelected ? "13px" : "11px",
              fontWeight: "bold",
            }}
            zIndex={isSelected ? 100 : 1}
            onClick={() => handleMarkerClick(idx)}
          />
        );
      })}

      {selectedIndex !== null && filtered[selectedIndex] && (
        <InfoWindowF
          position={{ lat: filtered[selectedIndex].lat, lng: filtered[selectedIndex].lng }}
          onCloseClick={() => onMarkerSelect?.(null)}
        >
          <div style={{ maxWidth: "160px", fontFamily: "sans-serif" }}>
            {filtered[selectedIndex].image && (
              <img
                src={filtered[selectedIndex].image}
                alt={filtered[selectedIndex].name}
                style={{ width: "100%", borderRadius: "6px", marginBottom: "5px", display: "block" }}
              />
            )}
            <strong style={{ fontSize: "13px", color: "#1a1d21" }}>{filtered[selectedIndex].name}</strong>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
}
