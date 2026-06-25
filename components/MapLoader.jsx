"use client";

import { useLoadScript } from "@react-google-maps/api";
import MapView from "./MapView";

const LIBRARIES = []; // Places, Geocoding 안 쓰니 빈 배열로 충분

export default function MapLoader(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  if (loadError) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#c00" }}>
        지도를 불러오지 못했어요
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#888" }}>
        지도 불러오는 중...
      </div>
    );
  }

  return <MapView {...props} />;
}