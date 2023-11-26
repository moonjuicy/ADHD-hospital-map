import { HospitalProp } from "@/interface";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

interface HospitalInfoBoxProps {
  hospital: HospitalProp | null;
  setHospital: Dispatch<SetStateAction<any>>;
}

export default function HospitalInfoBox({
  hospital,
  setHospital,
}: HospitalInfoBoxProps) {
  return (
    <div className='fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white overflow-hidden'>
      {hospital && (
        <>
          <div className='flex justify-between items-center py-4 px-5 bg-violet-500 text-white'>
            <div>
              <h4 className='text-xl font-semibold'>{hospital.dutyname}</h4>
            </div>
            <button type='button' onClick={() => setHospital(null)}>
              <AiOutlineClose />
            </button>
          </div>
          <div className='p-5 text-sm'>
            <ul>
              <li>{hospital.dutyaddr}</li>
              <li>{hospital.dutytel1}</li>
              <li>
                월 : {hospital.dutytime1s} ~ {hospital.dutytime1c} | 화 :{" "}
                {hospital.dutytime2s} ~ {hospital.dutytime2c} | 수 :{" "}
                {hospital.dutytime3s} ~ {hospital.dutytime3c} | 목 :{" "}
                {hospital.dutytime4s} ~ {hospital.dutytime4c} | 금 :{" "}
                {hospital.dutytime5s} ~ {hospital.dutytime5c} | 토 :{" "}
                {hospital.dutytime6s} ~ {hospital.dutytime6c} | 일 :{" "}
                {hospital.dutytime7s} ~ {hospital.dutytime7c} | 공휴일 :{" "}
                {hospital.dutytime8s == null
                  ? "휴뮤"
                  : `${hospital.dutytime8s} ~ ${hospital.dutytime8c}`}
              </li>
              <li>{hospital.dutyetc}</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
