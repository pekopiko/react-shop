import React from "react";
import { useParams } from "react-router-dom";
import ReadComponent from "../../components/todo/ReadComponent";

const ReadPage = () => {
  const { tno } = useParams();
  console.log("tno: ", tno);

  return (
    <>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6">
          <div>Read Page</div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <ReadComponent tno={tno}></ReadComponent>
        </div>
      </div>
    </>
  );
};

export default ReadPage;
