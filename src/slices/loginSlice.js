import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

// email에 해당하는 값이 있으면 -> 로그인상태, 없으면 -> 비로그인상태 간주
const initState = {
  email: "",
};

// 쿠키 확인함수 추가
const getMemberCookie = () => {
  const memberInfo = getCookie("member");
  if (memberInfo && memberInfo.nickname) {
    // 한글깨짐 대비
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  }
  return memberInfo;
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  return loginPost(param);
});

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: getMemberCookie() || initState,
  reducers: {
    login: (state, action) => {
      console.log("login.......");
      const data = action.payload;
      setCookie("member", JSON.stringify(data), 1);
      return data;
    },
    logout: (state, action) => {
      console.log("logout......");
      removeCookie("member"); // 로그아웃시 쿠키도 삭제
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        // 성공
        console.log("fulfilled");
        const payload = action.payload;
        // 정상 처리시에만 쿠키 생성
        if (!payload.error) {
          setCookie("member", JSON.stringify(payload), 1); // 1day
        }
        return payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        // 진행중
        console.log("pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        // 실패
        console.log("rejected");
      });
  },
});

// 액션크리에이터 외부로 내보내기
export const { login, logout } = loginSlice.actions;
// 리듀서 내보내기 -> configureStore에 등록
export default loginSlice.reducer;
