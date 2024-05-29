import React from "react";
import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/todo/ModifyComponent";

const ModifyPage = () => {
  const { tno } = useParams();

  return (
    <>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6">
          <div>Modify Page</div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <ModifyComponent tno={tno} />
        </div>
      </div>
    </>
  );
};

export default ModifyPage;
