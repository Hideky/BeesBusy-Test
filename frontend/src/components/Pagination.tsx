import { PAGINATION_COUNT } from "@/config";

type Props = {
  count: number
  page: number
  setPage: (value:number) => void
}

export const Pagination = ({ count, page, setPage }: Props) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(count/PAGINATION_COUNT); i++) {
    paginationNumbers.push(i);
  }

  return (
    <nav>
        <ul className="flex items-center h-8 text-sm">
            {page > 1 && (
                <li>
                    <a href="#" onClick={() => setPage(page-1)} className="flex items-center px-3 h-8 ms-0 border border-e-0 rounded-s-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                        <span className="sr-only">Previous</span>
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                        </svg>
                    </a>
                </li>
            )}
            {paginationNumbers.map(i => (
                <li key={i}>
                { i == page ? (
                  <a href="#" aria-current="page" className="z-10 flex items-center px-3 h-8 text-blue-400 border border-gray-700 bg-gray-900 hover:text-white">{i}</a>
                ) : (
                  <a href="#" onClick={() => setPage(i)} className="flex items-center px-3 h-8 border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">{i}</a>
                )}
                </li>
            ))}
            {page < count && (
                <li>
                    <a href="#" onClick={() => setPage(page+1)} className="flex items-center px-3 h-8 border rounded-e-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                        <span className="sr-only">Next</span>
                        <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                    </a>
                </li>
            )}
        </ul>
    </nav>
  );
};