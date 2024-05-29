import { useState } from "react";
import { postAdd } from "../../api/todoApi";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  title: "",
  writer: "",
  dueDate: "",
};

const AddComponent = () => {
  const [todo, setTodo] = useState({ ...initState });
  const { moveToList } = useCustomMove();

  // 서버API등록 요청후, 성공하면 result에 데이터 체우고,
  // result state에 값이 있으면 모달띄우기 (모달띄우는 용도로 사용)
  const [result, setResult] = useState(null);

  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({ ...todo });
  };

  const handleClickAdd = () => {
    console.log("add click!");
    console.log(todo);
    postAdd(todo)
      .then((result) => {
        console.log(result);
        setResult(result.tno);
        setTodo({ ...initState }); // todo state 초기화
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 모달 닫기 함수 : 부모인 AddComponent의 state를 자식 ResultModal이 변경하기위해 함수 전달
  const closeModal = () => {
    setResult(null); // 모달 닫기
    moveToList(); // list로 이동
  };

  return (
    <>
      {result ? (
        <ResultModal
          title={"Add Success"}
          content={`New ${result} Added`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              New Todo
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                  <input
                    type="text"
                    name="writer"
                    id="writer"
                    value={todo.writer}
                    onChange={handleChangeTodo}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
            </div>
          </div>
          <div className="my-6 flex items-center justify-end">
            <button
              type="button"
              className="ml-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleClickAdd}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddComponent;
