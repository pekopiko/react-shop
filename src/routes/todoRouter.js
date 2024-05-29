import { Suspense, lazy } from "react";
import LoadingPage from "../components/common/LoadingPage";
import { Navigate } from "react-router-dom";

// 화면에 보여줄 컴포넌트는 지연로딩 -> Suspense 안에 부착
const TodoList = lazy(() => import("../pages/todo/ListPage"));
const TodoRead = lazy(() => import("../pages/todo/ReadPage"));
const TodoAdd = lazy(() => import("../pages/todo/AddPage"));
const TodoModify = lazy(() => import("../pages/todo/ModifyPage"));

const todoRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <TodoList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="list" />,
    },
    {
      path: "read/:tno",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <TodoRead />
        </Suspense>
      ),
    },
    {
      path: "add",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <TodoAdd />
        </Suspense>
      ),
    },
    {
      path: "modify/:tno",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <TodoModify />
        </Suspense>
      ),
    },
  ];
};

export default todoRouter;
