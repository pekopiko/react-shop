import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import TodoHeader from "./TodoHeader";
import { Outlet } from "react-router-dom";

// /todo/로 시작하는 페이지들의 Base 페이지격
const TodoIndex = () => {
  return (
    <BasicLayout>
      {/* Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <TodoHeader />
        <main>
          <Outlet />
        </main>
      </div>
    </BasicLayout>
  );
};

export default TodoIndex;
