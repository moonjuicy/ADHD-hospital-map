import { HospitalType } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

interface LikeProps {
  hospitalId: number | undefined;
}

export default function Like({ hospitalId }: LikeProps) {
  const { data: session } = useSession();
  const fetchHospital = async () => {
    const { data } = await axios(`/api/hospitals?id=${hospitalId}`);
    return data as HospitalType;
  };

  const { data: hospital } = useQuery(
    `like-hospital-${hospitalId}`,
    fetchHospital,
    {
      enabled: !!hospitalId,
      refetchOnWindowFocus: false,
    }
  );

  const toggleLike = async () => {
    if (session?.user && hospital) {
      try {
        const like = await axios.post("/api/likes", {
          hospitalId: hospital.id,
        });

        if (like.status === 201) {
          toast.success("병원을 찜했습니다");
        } else {
          toast.warn("찜을 취소 하였습니다");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <button type='button' onClick={toggleLike}>
      {hospital?.likes?.length ? (
        <AiOutlineHeart className='hover:text-pink-300 focus:text-pink-600' />
      ) : (
        <AiFillHeart className='hover:text-pink-200 focus:text-pink-200 text-pink-300' />
      )}
    </button>
  );
}
