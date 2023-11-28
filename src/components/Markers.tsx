import { useEffect, Dispatch, SetStateAction, useCallback } from "react";
import { HospitalType } from "@/interface";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currentHospitalState, locationState, mapState } from "@/atom";

interface MarkerProps {
  hospitals: HospitalType[];
}
export default function Markers({ hospitals }: MarkerProps) {
  const map = useRecoilValue(mapState);
  const setCurrentHospital = useSetRecoilState(currentHospitalState);
  const [location, setLocation] = useRecoilState(locationState);

  const loadKakaoMap = useCallback(() => {
    if (map) {
      hospitals.map((hospital: HospitalType) => {
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
          setLocation({
            ...location,
            lat: hospital.lat,
            lng: hospital.lng,
          });
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hospitals, map]);

  useEffect(() => {
    loadKakaoMap();
  }, [loadKakaoMap, map]);

  return <></>;
}
