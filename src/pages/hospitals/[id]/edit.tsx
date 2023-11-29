import AddressSearch from "@/components/AddressSearch";
import Loader from "@/components/Loader";
import { HospitalType } from "@/interface";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

export default function EditHospital() {
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<HospitalType>();

  const fetchHospital = async () => {
    const { data } = await axios(`/api/hospitals?id=${id}`);
    return data as HospitalType;
  };

  const {
    data: hospital,
    isFetching,
    isError,
    isSuccess,
  } = useQuery(`hospital-${id}`, fetchHospital, {
    onSuccess: (data) => {
      Object.keys(data).forEach((key) => {
        const typedKey = key as keyof HospitalType;
        const value = data[key as keyof HospitalType];
        setValue(typedKey, value);
      });
    },
  });

  if (isFetching) {
    return <Loader className='mt-[20]' />;
  }

  return (
    <form
      className='px-4 md:max-w-4xl mx-auto py-8'
      onSubmit={handleSubmit(async (data) => {
        try {
          const result = await axios.put("/api/hospitals", { ...data });
          if (result.status == 200) {
            toast.success("병원을 수정했습니다.");
            router.replace(`/hospitals/${result?.data?.id}`);
          } else {
            toast.error("다시 시도해주세요");
          }
        } catch (error) {
          console.log(error);
          toast.error("데이터 생성중 문제가 생겼습니다. 다시 시도해주세요.");
        }
      })}
    >
      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            병원 등록
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            아래의 내용을 입력해주세요.
          </p>

          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <label
                htmlFor='name'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                병원명
              </label>
              <div className='mt-2'>
                <input
                  type='text'
                  {...register("name", { required: true })}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 outline-none ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
                {errors?.name?.type === "required" && (
                  <div className='pt-2 text-xs text-red-600'>
                    필수 입력사항입니다.
                  </div>
                )}
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='category'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                기관구분
              </label>
              <div className='mt-2'>
                <select
                  {...register("category", { required: true })}
                  className='block w-full rounded-md border-0 px-2 py-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                >
                  <option value={"병원"}>병원</option>
                  <option value={"의원"}>의원</option>
                </select>
              </div>
            </div>

            <div className='sm:col-span-4'>
              <label
                htmlFor='phone'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                연락처
              </label>
              <div className='mt-2'>
                <input
                  {...register("phone", { required: true })}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
                {errors?.phone?.type === "required" && (
                  <div className='pt-2 text-xs text-red-600'>
                    필수 입력사항입니다.
                  </div>
                )}
              </div>
            </div>

            <AddressSearch
              register={register}
              errors={errors}
              setValue={setValue}
            />
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button
          type='button'
          className='text-sm font-semibold leading-6 text-gray-900'
        >
          뒤로가기
        </button>
        <button
          type='submit'
          className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          수정하기
        </button>
      </div>
    </form>
  );
}
