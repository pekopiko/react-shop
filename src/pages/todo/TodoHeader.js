import React from "react";
import { useNavigate } from "react-router-dom";

const TodoHeader = () => {
  // 페이지 이동하는 훅 생성
  const navigate = useNavigate();

  const handleClickList = () => {
    navigate({ pathname: "list" });
  };
  const handleClickAdd = () => {
    navigate({ pathname: "add" });
  };

  return (
    <div className="my-6 md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Todo
        </h2>
      </div>
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <button
          type="button"
          onClick={handleClickList}
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          List
        </button>
        <button
          type="button"
          onClick={handleClickAdd}
          className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoHeader;
