import React from "react";
import { HospitalApiResponse } from "@/interface";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";
export default function HospitalList() {
  const router = useRouter();
  const { page = "1" } = router.query;
  const {
    isLoading,
    isError,
    data: result,
  } = useQuery(`hospitals-${page}`, async () => {
    const { data } = await axios(`/api/hospitals?page=${page}`);
    return data as HospitalApiResponse;
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
          result?.data?.map((hospital, index) => (
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
      {result?.totalPage && result?.page && (
        <Pagination
          url={"/hospitals"}
          page={result.page}
          totalPage={result.totalPage}
        />
      )}
    </div>
  );
}
