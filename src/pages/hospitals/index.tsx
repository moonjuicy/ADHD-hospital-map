import React from "react";
import { HospitalType } from "@/interface";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "@/components/Loading";

export default function HospitalList() {
  const {
    isLoading,
    isError,
    data: hospitals,
  } = useQuery("hospitals", async () => {
    const { data } = await axios("/api/hospitals");
    return data as HospitalType[];
  });

  if (isError) {
    return <span>다시 시도해주세요</span>;
  }
  return (
    <div className='px-4 md:max-w-5xl mx-auto py-8'>
      <ul role='list' className='divide-y divide-gray-100'>
        {isLoading ? (
          <Loading />
        ) : (
          hospitals?.map((hospital, index) => (
            <li className='flex justify-between gap-x-6 py-5' key={index}>
              <div>
                <p className='text-sm font-semibold leading-9 text-gray-900'>
                  {hospital.name}
                </p>
                <p className='mt-1 text-xs truncate font-semibold leading-5 text-gray-500'>
                  {hospital.category}
                </p>
              </div>
              <div className='hidden sm:flex sm:flex-col sm:items-end'>
                <p className='text-sm font-semibold leading-6 text-gray-900'>
                  {hospital.address}
                </p>
                <p className='text-sm font-semibold leading-6 text-gray-500'>
                  {hospital.phone}
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
