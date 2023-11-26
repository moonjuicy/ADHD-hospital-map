import { useState } from "react";
import Map from "@/components/Map";
import Markers from "@/components/Markers";

import * as hospitals from "@/data/hospital_data.json";
import { HospitalsProp } from "@/interface";
import HospitalInfoBox from "@/components/HospitalInfoBox";

export default function Home() {
  const [map, setMap] = useState(null);
  const [currentHospital, setCurrentHospital] = useState(null);
  const hospitalsData = hospitals as HospitalsProp;

  return (
    <>
      <Map setMap={setMap} />
      <Markers
        map={map}
        hospitalsData={hospitalsData.DATA}
        setCurrentHospital={setCurrentHospital}
      />
      <HospitalInfoBox
        hospital={currentHospital}
        setHospital={setCurrentHospital}
      />
    </>
  );
}
