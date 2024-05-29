import { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { getList } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";

const initState = {
  list: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  pageNumLength: 0,
  current: 0,
};

const ListComponent = () => {
  // useCustomMove 이용해서 현재 요청한 page,size 꺼내기
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();

  const [serverData, setServerData] = useState(initState);

  // 목록 데이터 요청
  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size, refresh]);

  return (
    <>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              Tno
            </th>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              Title
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
            >
              Due Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {serverData.list.map((todo) => (
            <tr key={todo.tno} onClick={() => moveToRead(todo.tno)}>
              <td className="px-3 py-4 text-sm text-gray-500">{todo.tno}</td>
              <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                {todo.title}
                <dl className="font-normal lg:hidden">
                  <dt className="sr-only">Due Date</dt>
                  <dd className="mt-1 truncate text-gray-700">
                    {todo.dueDate}
                  </dd>
                </dl>
              </td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                {todo.dueDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
    </>
  );
};

export default ListComponent;
