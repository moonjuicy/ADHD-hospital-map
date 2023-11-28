import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, status } = useSession();
  return (
    <>
      <div className='navbar bg-white'>
        <Link href='/' className='navbar__logo'>
          ADHD 병원 지도
        </Link>
        <div className='navbar__list'>
          <Link href='/hospitals' className='navbar__list--item'>
            병원 목록
          </Link>
          <Link href='/hospitals/new' className='navbar__list--item'>
            병원 등록
          </Link>
          <Link href='/users/likes' className='navbar__list--item'>
            찜한 병원
          </Link>
          {status == "authenticated" ? (
            <button type='button' onClick={() => signOut()}>
              로그아웃
            </button>
          ) : (
            <Link href='/api/auth/signin' className='navbar__list--item'>
              로그인
            </Link>
          )}
        </div>
        <div
          role='presentation'
          className='navbar__button'
          onClick={() => setIsOpen((val) => !val)}
        >
          {isOpen ? <AiOutlineClose /> : <BiMenu />}
        </div>
      </div>
      {/* Mobile Nav */}
      {isOpen && (
        <div className='navbar--mobile'>
          <div className='navbar__list--mobile'>
            <Link href='/stores' className='navbar__list--item--mobile'>
              병원 목록
            </Link>
            <Link href='/stores/new' className='navbar__list--item--mobile'>
              병원 등록
            </Link>
            <Link href='/users/likes' className='navbar__list--item--mobile'>
              찜한 병원
            </Link>
            <Link
              href='/api/auth/signin'
              className='navbar__list--item--mobile'
            >
              로그인
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
