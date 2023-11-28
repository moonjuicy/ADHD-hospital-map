import React, { useCallback, useEffect, useRef, useState } from "react";
import { HospitalType } from "@/interface";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import Loading from "@/components/Loading";
import useIntersectionObserver from "@/hook/useIntersectionObserver";
import Loader from "@/components/Loader";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { searchState } from "@/atom";

export default function HospitalList() {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;
  const searchValue = useRecoilValue(searchState);

  const router = useRouter();
  const searchParams = {
    q: searchValue?.q,
    district: searchValue?.district,
  };
  const fetchHospitals = async ({ pageParam = 1 }) => {
    const { data } = await axios("/api/hospitals?page=" + pageParam, {
      params: {
        limit: 3,
        page: pageParam,
        ...searchParams,
      },
    });
    return data;
  };
  const {
    data: hospitals,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery(["hospitals", searchParams], fetchHospitals, {
    getNextPageParam: (lastPage: any) =>
      lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timer = setTimeout(() => {
        fetchNext();
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [fetchNext, isPageEnd, hasNextPage]);

  if (isError) {
    return (
      <div className='w-full h-screen mx-auto pt-[10%] text-red-500'>
        다시 시도해주세요
      </div>
    );
  }

  return (
    <div className='px-4 md:max-w-5xl mx-auto py-8'>
      <SearchBar />
      <ul role='list' className='divide-y divide-gray-100'>
        {isLoading ? (
          <Loading />
        ) : (
          hospitals?.pages?.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((hospital: HospitalType, i: number) => (
                <li
                  className='flex justify-between gap-x-6 py-5 cursor-pointer hover:bg-gray-50'
                  key={i}
                  onClick={() => router.push(`/hospitals/${hospital.id}`)}
                >
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
              ))}
            </React.Fragment>
          ))
        )}
      </ul>
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className='w-full touch-none h-10 mb-10' ref={ref}></div>
    </div>
  );
}
