import Script from "next/script";
import * as hospitalData from "@/data/hospital_data.json";

declare global {
  interface Window {
    kakao: any;
  }
}
interface HospitalsProp {
  DATA?: HospitalProp[];
  DESCRIPTION?: HospitalProp;
}
interface HospitalProp {
  dutyinf: string;
  dutytel3: string;
  dutytel1: string;
  dutydivnam: string;
  dutytime2c: string;
  dutyeryn: string;
  dutytime6c: string;
  dutytime8c: string;
  dutytime4c: string;
  wgs84lat: string;
  dutydiv: string;
  dutytime1s: string;
  wgs84lon: string;
  dutytime5s: string;
  dutytime8s: string;
  postcdn2: string;
  postcdn1: string;
  dutytime3s: string;
  dutytime3c: string;
  dutyemclsname: string;
  dutytime1c: string;
  dutytime7s: string;
  dutyemcls: string;
  dutyname: string;
  dutyetc: string;
  hpid: string;
  dutytime5c: string;
  dutyaddr: string;
  dutytime7c: string;
  dutytime2s: string;
  work_dttm: number;
  dutytime6s: string;
  dutytime4s: string;
  dutymapimg: string;
}
const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

export default function Map() {
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      const hospitals: HospitalsProp = hospitalData;
      hospitals?.["DATA"]?.map((hospital: HospitalProp) => {
        const markerPosition = new window.kakao.maps.LatLng(
          hospital.wgs84lat,
          hospital.wgs84lon
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);
      });
    });
  };
  return (
    <>
      <Script
        strategy='afterInteractive'
        type='text/javascript'
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id='map' className='w-full h-screen'></div>
    </>
  );
}
