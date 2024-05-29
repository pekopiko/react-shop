import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";

const PageComponent = ({ serverData, movePage }) => {
  return (
    <nav className="py-4 flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        {serverData.prev ? (
          <div
            onClick={() => movePage({ page: serverData.prevPage })}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon
              className="mr-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Previous
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="hidden md:-mt-px md:flex">
        {serverData.pageNumList.map((pageNum) => (
          <div
            key={pageNum}
            onClick={() => movePage({ page: pageNum })}
            className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
              serverData.current === parseInt(pageNum)
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            {pageNum}
          </div>
        ))}
      </div>

      <div className="-mt-px flex w-0 flex-1 justify-end">
        {serverData.next ? (
          <div
            onClick={() => movePage({ page: serverData.nextPage })}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon
              className="ml-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default PageComponent;
