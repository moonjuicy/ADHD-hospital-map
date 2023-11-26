import { HospitalProp } from "@/interface";
import React from "react";

export default function HospitalList({
  hospitals,
}: {
  hospitals: HospitalProp[];
}) {
  return (
    <div className='px-4 md:max-w-5xl mx-auto py-8'>
      <ul role='list' className='divide-y divide-gray-100'>
        {hospitals.map((hospital, index) => (
          <li className='flex justify-between gap-x-6 py-5' key={index}>
            <div>
              <p className='text-sm font-semibold leading-9 text-gray-900'>
                {hospital.dutyname}
              </p>
              <p className='mt-1 text-xs truncate font-semibold leading-5 text-gray-500'>
                {hospital.dutyemclsname}
              </p>
            </div>
            <div className='hidden sm:flex sm:flex-col sm:items-end'>
              <p className='text-sm font-semibold leading-6 text-gray-900'>
                {hospital.dutyaddr}
              </p>
              <p className='text-sm font-semibold leading-6 text-gray-500'>
                {hospital.dutytel1} | {hospital.dutydivnam} |{" "}
                {hospital.dutymapimg}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const hospitals = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/hospitals`
  ).then((res) => res.json());
  return {
    props: { hospitals },
  };
}
