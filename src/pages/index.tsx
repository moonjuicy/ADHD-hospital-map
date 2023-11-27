import { useState } from "react";
import Map from "@/components/Map";
import Markers from "@/components/Markers";

import { HospitalType } from "@/interface";
import HospitalInfoBox from "@/components/HospitalInfoBox";

import axios from "axios";

export default function Home({ hospitals }: { hospitals: HospitalType[] }) {
  const [map, setMap] = useState(null);
  const [currentHospital, setCurrentHospital] = useState(null);

  return (
    <>
      <Map setMap={setMap} />
      <Markers
        map={map}
        hospitals={hospitals}
        setCurrentHospital={setCurrentHospital}
      />
      <HospitalInfoBox
        hospital={currentHospital}
        setHospital={setCurrentHospital}
      />
    </>
  );
}

export async function getStaticProps() {
  const hospitals = await axios(
    `${process.env.NEXT_PUBLIC_API_URL}/api/hospitals`
  );
  return {
    props: { hospitals: hospitals.data },
    revalidate: 60 * 60,
  };
}
