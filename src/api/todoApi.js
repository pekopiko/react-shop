import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/todo`;

// tno 로 Todo 조회 : async와 await를 붙혀야 API서버가 응답해줄때까지 기다렸다가 리턴됨.
export const getOne = async (tno) => {
  const response = await jwtAxios.get(`${prefix}/${tno}`);
  return response.data; // 응답 객체에서 데이터만 꺼내 리턴 -> then의 매개변수로 받아짐
};

// list 조회 : 외부 호출 예시 -> getList({page:1, size:10})
// axios.get("요청URL", {config}) : config객체의 params 속성을 이용해서 파라미터전달
// params속성의 값은 객체 형태로 작성
export const getList = async (pageParams) => {
  const { page, size } = pageParams;
  const response = await jwtAxios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });
  return response.data; // == PageResponseDTO
};

// 글 등록
export const postAdd = async (todoObj) => {
  const response = await jwtAxios.post(`${prefix}/`, todoObj);
  return response.data; // {tno: tno값}
};

// 수정
export const putOne = async (todoObj) => {
  const response = await jwtAxios.put(`${prefix}/${todoObj.tno}`, todoObj);
  return response.data;
};

// 삭제
export const deleteOne = async (tno) => {
  const response = await jwtAxios.delete(`${prefix}/${tno}`);
  return response.data;
};
