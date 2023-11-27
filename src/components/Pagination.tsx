import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  url: string;
  page: number;
  totalPage: number;
}

export default function Pagination({ url, page, totalPage }: PaginationProps) {
  return (
    <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <Link
          href={{
            pathname: url,
            query: { page: page - 1 },
          }}
          className={`${page <= 1 && "pointer-events-none opacity-50"}`}
        >
          <span className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>
            이전
          </span>
        </Link>

        <Link
          href={{
            pathname: url,
            query: { page: page + 1 },
          }}
          className={`${page >= totalPage && "pointer-events-none opacity-50"}`}
        >
          <span className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'>
            다음
          </span>
        </Link>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-center'>
        <div>
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <Link
              href={{
                pathname: url,
                query: { page: page - 1 },
              }}
              className={`${page <= 1 && "pointer-events-none opacity-50"}`}
            >
              <span className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
                <span className='sr-only'>이전</span>
                <FaChevronLeft className='h-5 w-5' aria-hidden='true' />
              </span>
            </Link>

            {[...Array(totalPage)].map((e, i) => (
              <Link href={{ pathname: url, query: { page: i + 1 } }} key={i}>
                <span
                  aria-current='page'
                  className={`relative hidden items-center px-4 py-2 text-sm font-semibold ${
                    page === i + 1
                      ? "bg-indigo-600 text-white"
                      : "text-gray-500 hover:bg-gray-50"
                  } ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 md:inline-flex`}
                >
                  {i + 1}
                </span>
              </Link>
            ))}

            <Link
              href={{
                pathname: url,
                query: { page: page + 1 },
              }}
              className={`${
                page >= totalPage && "pointer-events-none opacity-50"
              }`}
            >
              <span className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
                <span className='sr-only'>다음</span>
                <FaChevronRight className='h-5 w-5' aria-hidden='true' />
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
