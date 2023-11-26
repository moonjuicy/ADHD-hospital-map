import { useState } from "react";
import Map from "@/components/Map";
import Markers from "@/components/Markers";

import { HospitalProp } from "@/interface";
import HospitalInfoBox from "@/components/HospitalInfoBox";

export default function Home({ hospitals }: { hospitals: HospitalProp[] }) {
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
  const hospitals = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/hospitals`
  ).then((res) => res.json());

  return {
    props: { hospitals },
    revalidate: 60 * 60,
  };
}
