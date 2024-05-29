import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../../api/kakaoApi";

const KakaoLoginComponent = () => {
  const link = getKakaoLoginLink();

  return (
    <div>
      <div className="relative mt-10">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm font-medium leading-6">
          <span className="bg-white px-6 text-gray-900">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex w-full items-center justify-center">
          <Link to={link}>
            <img
              src={
                process.env.PUBLIC_URL +
                "/assets/imgs/kakao_login_large_wide.png"
              }
              alt="kakako"
            />
          </Link>
        </div>
        <div className="mt-4 relative flex justify-center text-xs font-medium leading-6">
          <span className="bg-white px-6 text-gray-500">
            로그인시, 자동 가입 처리 됩니다.
          </span>
        </div>
      </div>
    </div>
  );
};

export default KakaoLoginComponent;
