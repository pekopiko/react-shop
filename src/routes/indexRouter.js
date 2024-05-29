import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingPage from "../components/common/LoadingPage";
import todoRouter from "./todoRouter";
import productsRouter from "./productsRouter";
import memberRouter from "./memberRouter";

const Main = lazy(() => import("../pages/MainPage"));
const About = lazy(() => import("../pages/AboutPage"));
const TodoIndex = lazy(() => import("../pages/todo/TodoIndex"));
const ProductIndex = lazy(() => import("../pages/products/ProductIndex"));
const MemberIndex = lazy(() => import("../pages/member/MemberIndex"));

// 경로 매핑하는 곳 (root)
const Router = () => {
  return useRoutes([
    {
      path: "",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Main />
        </Suspense>
      ),
    },
    {
      path: "about",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <About />
        </Suspense>
      ),
    },
    {
      path: "todo",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <TodoIndex />
        </Suspense>
      ),
      children: todoRouter(),
    },
    {
      path: "products",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <ProductIndex />
        </Suspense>
      ),
      children: productsRouter(),
    },
    {
      path: "member",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <MemberIndex />
        </Suspense>
      ),
      children: memberRouter(),
    },
  ]);
};

export default Router;
