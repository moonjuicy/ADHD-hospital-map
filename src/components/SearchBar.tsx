import React, { Dispatch, SetStateAction } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { KR_DISTRICT } from "@/data";
import { useRecoilState } from "recoil";
import { searchState } from "@/atom";

export default function SearchBar() {
  const [search, setSearch] = useRecoilState(searchState);
  return (
    <div className='flex flex-col md:flex-row gap-2 my-4'>
      <div className='flex items-center justify-center w-full gap-2'>
        <AiOutlineSearch className='w-6 h-6' />
        <input
          type='search'
          placeholder='병원찾기'
          onChange={(e) => setSearch({ ...search, q: e.target.value })}
          className='block w-full p-3 text-sm textx-gray-800 border border-gray-300 rounded-lg bg-gray-50 outline-none hover:border-blue-50 focus:border-blue-500 focus:border-2'
        />
        <select
          placeholder='지역 선택'
          className='bg-gray-50 border border-gray-300 text-gray-800 text-sm md:max-w-[200px] rounded-lg focus:border-blue-500 outline-none pr-2 block w-full p-3'
          onChange={(e) => setSearch({ ...search, district: e.target.value })}
        >
          <option>지역선택</option>
          {KR_DISTRICT.map((area) => (
            <option value={area} key={area}>
              {area}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
