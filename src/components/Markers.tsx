import { useEffect, Dispatch, SetStateAction, useCallback } from "react";
import { HospitalProp } from "@/interface";

interface MarkerProps {
  map: any;
  hospitalsData?: HospitalProp[];
  setCurrentHospital: Dispatch<SetStateAction<any>>;
}
export default function Markers({
  map,
  hospitalsData,
  setCurrentHospital,
}: MarkerProps) {
  const loadKakaoMap = useCallback(() => {
    if (map) {
      hospitalsData?.map((hospital: HospitalProp) => {
        const markerPosition = new window.kakao.maps.LatLng(
          hospital.wgs84lat,
          hospital.wgs84lon
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);

        // 마커 커서가 오되ㅆ을 때  마커위에 표할 인포 윈ㅗㅜ 생ㅓ
        const content = `<div class="infowindow">${hospital.dutyname}</div>`;

        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });

        // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          customOverlay.setMap(map);
        });

        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          customOverlay.setMap(null);
        });

        // 선택한 병원 저장
        window.kakao.maps.event.addListener(marker, "click", function () {
          setCurrentHospital(hospital);
        });
      });
    }
  }, [hospitalsData, map, setCurrentHospital]);

  useEffect(() => {
    loadKakaoMap();
  }, [loadKakaoMap, map]);

  return <></>;
}
