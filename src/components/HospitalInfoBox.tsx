import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import { currentHospitalState } from "@/atom";
import { useRecoilState } from "recoil";

export default function HospitalInfoBox() {
  const router = useRouter();
  const [hospital, setHospital] = useRecoilState(currentHospitalState);

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
          <div>
            <button
              type='button'
              onClick={() => router.push(`/hospitals/${hospital.id}`)}
              className='w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold'
            >
              상세보기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
