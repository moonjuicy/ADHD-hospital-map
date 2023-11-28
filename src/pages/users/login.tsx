import { useEffect } from "react";
import { useRouter } from "next/router";
import { AiOutlineGoogle } from "react-icons/ai";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";

import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [router, status]);
  return (
    <div className='flex flex-col justify-center px-6 lg:px-8 h-[60vh]'>
      <div className='mx-auto w-full max-w-sm text-center'>
        <div className='text-blue-800 text-4xl font-semiold italic'>
          ADHD 병원 MAP
        </div>
        <div className='text-center mt-6 text-2xl font-bold text-gray-600'>
          SNS 계정으로 로그인 해주세요
        </div>
        <p>계정이 없다면 자동으로 회원가입이 진행됩니다</p>
      </div>
      <div className='mt-10 mx-auto w-full max-w-sm'>
        <div className='flex flex-col gap-3'>
          <button
            type='button'
            onClick={() => signIn("google")}
            className='text-white flex gap-2 bg-[#4285F4] hover:bg-[#4285F4]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center '
          >
            <AiOutlineGoogle className='w-6 h-6' />
            <span className='min-w-[40%]'>구글로 로그인하기</span>
          </button>
          <button
            type='button'
            // onClick={() => signIn("kakao")}
            className='text-black flex gap-2 bg-[#fef01b] hover:bg-[#fef01b]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center '
          >
            <RiKakaoTalkFill className='w-6 h-6' />
            <span className='min-w-[40%]'>카카오로 로그인하기</span>
          </button>
          <button
            type='button'
            onClick={() => signIn("naver")}
            className='text-white flex gap-2 bg-[#2db400] hover:bg-[#2db400]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center '
          >
            <SiNaver className='w-4 h-4' />
            <span className='min-w-[40%]'>네이버로 로그인하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
