import { useEffect, useCallback } from "react";
import { HospitalType } from "@/interface";

interface MarkerProps {
  map: any;
  hospital: HospitalType;
}
export default function Marker({ map, hospital }: MarkerProps) {
  const loadKakaoMap = useCallback(() => {
    if (map && hospital) {
      const markerPosition = new window.kakao.maps.LatLng(
        hospital.lat,
        hospital.lng
      );

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);

      // 마커 커서가 오되ㅆ을 때  마커위에 표할 인포 윈ㅗㅜ 생ㅓ
      const content = `<div class="infowindow">${hospital.name}</div>`;

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: markerPosition,
        content,
        xAnchor: 0.6,
        yAnchor: 0.91,
      });
      customOverlay.setMap(map);
    }
  }, [hospital, map]);

  useEffect(() => {
    loadKakaoMap();
  }, [loadKakaoMap, map]);

  return <></>;
}
