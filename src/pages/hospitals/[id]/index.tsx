import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import { HospitalType } from "@/interface";

import Loader from "@/components/Loader";
import Map from "@/components/Map";
import Marker from "@/components/Marker";

export default function HospitalPage() {
  const [map, setMap] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const fetchHospital = async () => {
    const { data } = await axios(`/api/hospitals?id=${id}`);
    return data as HospitalType;
  };

  const {
    data: hospital,
    isSuccess,
    isFetching,
    isError,
  } = useQuery(`hospital-${id}`, fetchHospital, {
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return (
      <div className='w-full h-screen mx-auto pt-[10%] text-red-500'>
        다시 시도해주세요
      </div>
    );
  }

  if (isFetching) {
    return <Loader className='mt-[20]' />;
  }
  return (
    <>
      <div className='max-w-5xl mx-auto px-4 py-8'>
        <div className='px-4 sm:px-0'>
          <h3 className='text-base font-semibold leading-7 text-gray-900'>
            {hospital?.name}
          </h3>
          <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
            {hospital?.address}
          </p>
        </div>
        <div className='mt-6 border-t border-gray-100'>
          <dl className='divide-y divide-gray-100'>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                위도
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {hospital?.lat}
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                경도
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {hospital?.lng}
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                연락처
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {hospital?.phone}
              </dd>
            </div>
            <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
              <dt className='text-sm font-medium leading-6 text-gray-900'>
                병원타입
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {hospital?.category}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {isSuccess && (
        <div className='overflow-hidden w-full mb-20 max-w-5xl mx-auto max-h-[600px]'>
          <Marker map={map} hospital={hospital} />
          <Map lat={hospital.lat} lng={hospital.lng} zoom={1} setMap={setMap} />
        </div>
      )}
    </>
  );
}
