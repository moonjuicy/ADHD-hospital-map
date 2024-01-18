import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import { HospitalType } from "@/interface";

import Loader from "@/components/Loader";
import Map from "@/components/Map";
import Marker from "@/components/Marker";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";
import Like from "@/components/Like";

export default function HospitalPage() {
  const router = useRouter();
  const { id } = router.query;
  const { status } = useSession();

  const handleDelete = async () => {
    const confirm = window.confirm("해당 병원을 삭제 하시겠습니까?");

    if (confirm && hospital) {
      try {
        const result = await axios.delete(`/api/hospitals?id=${hospital?.id}`);
        if (result.status === 200) {
          toast.success("병원을 삭제하였습니다.");
          router.replace("/");
        } else {
          toast.error("다시 시도 해주세요");
        }
      } catch (error) {
        console.log(error);
        toast.error("다시 시도 해주세요");
      }
    }
  };

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

  if (isFetching) {
    return <Loader className='mt-[20]' />;
  }

  if (isError) {
    return (
      <div className='w-full h-screen mx-auto pt-[10%] text-red-500'>
        다시 시도해주세요
      </div>
    );
  }

  return (
    <>
      <div className='max-w-5xl mx-auto px-4 py-8'>
        <div className='md:flex justify-between items-center py-4 md:py-0'>
          <div className='px-4 sm:px-0'>
            <h3 className='text-base font-semibold leading-7 text-gray-900'>
              {hospital?.name}
            </h3>
            <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
              {hospital?.address}
            </p>
          </div>
          {status === "authenticated" && (
            <div className='flex items-center gap-4'>
              <Like hospitalId={hospital?.id} />
              <Link
                className='underline hover:text-gray-400 text-sm'
                href={`/hospitals/${hospital?.id}/edit`}
              >
                수정
              </Link>
              <button
                type='button'
                onClick={handleDelete}
                className='underline  hover:text-gray-400 text-sm'
              >
                삭제
              </button>
            </div>
          )}
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
          <Marker hospital={hospital} />
          <Map lat={hospital.lat} lng={hospital.lng} zoom={1} />
        </div>
      )}
    </>
  );
}
