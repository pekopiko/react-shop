import { useState } from "react";
import { Link } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import KakaoLoginComponent from "./KakaoLoginComponent";

const initState = {
  email: "",
  password: "",
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });
  const { execLogin, moveToPath } = useCustomLogin();

  const handleClickLogin = () => {
    execLogin(loginParam).then((data) => {
      console.log(data);
      if (data.error) {
        alert("이메일과 비밀번호를 다시 확인하세요!");
      } else {
        alert("로그인 성공!");
        moveToPath("/");
      }
    });
  };

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="my-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                name="email"
                type="email"
                value={loginParam.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <Link className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                name="password"
                type="password"
                value={loginParam.password}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={handleClickLogin}
              className="mt-6 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>

          <KakaoLoginComponent />
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
