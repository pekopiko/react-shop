import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {
  // 쿼리스트링 code 라는 이름으로 넘어오는 인가코드 꺼내기
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code");

  const dispatch = useDispatch();

  const { moveToPath } = useCustomLogin();

  // 꺼낸 인가코드를 주면서 AccessToken 달라고 카카오에 다시 요청
  useEffect(() => {
    getAccessToken(authCode).then((accessToken) => {
      console.log("getAccessToken - accessToken : ", accessToken); // accessToken 출력
      getMemberWithAccessToken(accessToken).then((memberInfo) => {
        console.log("getMemberWithAccessToken - memberInfo : ");
        console.log(memberInfo);
        // 로그인 처리
        dispatch(login(memberInfo));

        // 화면 이동
        // 소셜회원 아닌경우
        if (memberInfo && !memberInfo.social) {
          moveToPath("/"); // 홈으로 이동
        } else {
          // 소셜회원인경우
          moveToPath("/member/modify"); // 회원정보 수정페이지로 이동
        }
      });
    });
  }, [authCode]); // authCode값이 변경될때만 요청되도록 useEffect 사용

  return (
    <div>
      <div>Kakao Redirect Page</div>
      <div>{authCode}</div>
    </div>
  );
};

export default KakaoRedirectPage;
