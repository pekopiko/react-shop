import { useEffect, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

const initState = {
  tno: 0,
  title: "",
  writer: "",
  dueDate: null,
  complete: false,
};

const ModifyComponent = ({ tno }) => {
  const [todo, setTodo] = useState({ ...initState });

  // 모달창 위한 state 생성
  const [result, setResult] = useState(null);

  // 처리후 이동을 위한 함수
  const { moveToList, moveToRead } = useCustomMove();

  useEffect(() => {
    getOne(tno).then((data) => setTodo(data));
    //console.log(todo);
  }, [tno]);

  // 폼 수정 이벤트 핸들러
  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({ ...todo });
  };
  const handleChangeTodoComplete = (e) => {
    const value = e.target.value;
    todo.complete = value === "Y";
    setTodo({ ...todo });
  };

  // 버튼 클릭 이벤트 핸들러
  const handleClickDelete = () => {
    deleteOne(tno).then((data) => {
      console.log("delete result :" + data);
      setResult("Deleted");
    });
  };
  const handleClickModify = () => {
    putOne(todo).then((data) => {
      console.log("modify result : " + data);
      setResult("Modified");
    });
  };

  // 모달창 close 콜백함수
  const closeModal = () => {
    if (result === "Deleted") {
      moveToList();
    } else {
      moveToRead(tno);
    }
  };

  return (
    <>
      {result ? (
        <ResultModal
          title={"Result"}
          content={result}
          callbackFn={closeModal}
        ></ResultModal>
      ) : (
        <></>
      )}

      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Modify
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="tno"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tno
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="bg-gray-100 pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      {todo.tno}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={todo.title}
                    onChange={handleChangeTodo}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="writer"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Writer
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="bg-gray-100 pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      {todo.writer}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Due Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    value={todo.dueDate}
                    onChange={handleChangeTodo}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="complete"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Complete
                </label>
                <div className="mt-2">
                  <select
                    id="complete"
                    name="complete"
                    value={todo.complete ? "Y" : "N"}
                    onChange={handleChangeTodoComplete}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="Y">Completed</option>
                    <option value="N">Not Yet</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="my-6 flex items-center justify-end">
            <button
              type="button"
              onClick={handleClickDelete}
              className="ml-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={handleClickModify}
              className="ml-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Modify
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ModifyComponent;
