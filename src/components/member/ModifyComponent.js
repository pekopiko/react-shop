import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { modifyMember } from "../../api/memberApi";
import ResultModal from "../common/ResultModal";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
  email: "",
  password: "",
  nickname: "",
};

const ModifyComponent = () => {
  const [member, setMember] = useState(initState);
  const loginInfo = useSelector((state) => state.loginSlice);

  const [result, setResult] = useState(null);
  const { moveToLogin } = useCustomLogin();

  useEffect(() => {
    setMember({ ...loginInfo, password: "abcd" });
  }, [loginInfo]);

  const handleChange = (e) => {
    member[e.target.name] = e.target.value;
    setMember({ ...member });
  };

  const handleClickModify = () => {
    modifyMember(member).then((result) => {
      setResult("Modified");
    });
  };

  const closeModal = () => {
    setResult(null);
    moveToLogin();
  };

  return (
    <>
      {result ? (
        <ResultModal
          title={"회원 정보"}
          content={"수정 완료"}
          callbackFn={closeModal}
        />
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
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="email"
                    value={member.email}
                    readOnly
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    value={member.password}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Nickname
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="nickname"
                    value={member.nickname}
                    onChange={handleChange}
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
              onClick={handleClickModify}
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
