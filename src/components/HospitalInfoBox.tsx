import { HospitalType } from "@/interface";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface HospitalInfoBoxProps {
  hospital: HospitalType | null;
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
              <h4 className='text-xl font-semibold'>{hospital.name}</h4>
            </div>
            <button type='button' onClick={() => setHospital(null)}>
              <AiOutlineClose />
            </button>
          </div>
          <div className='p-5 text-sm'>
            <ul>
              <li>{hospital.address}</li>
              <li>{hospital.phone}</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
