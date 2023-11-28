import Map from "@/components/Map";
import Markers from "@/components/Markers";

import { HospitalType } from "@/interface";
import HospitalInfoBox from "@/components/HospitalInfoBox";

import axios from "axios";

export default function Home({ hospitals }: { hospitals: HospitalType[] }) {
  return (
    <>
      <Map />
      <Markers hospitals={hospitals} />
      <HospitalInfoBox />
    </>
  );
}

export async function getStaticProps() {
  const result = await axios(
    `${process.env.NEXT_PUBLIC_API_URL}/api/hospitals`
  );

  return {
    props: { hospitals: result.data },
    revalidate: 60 * 60,
  };
}
