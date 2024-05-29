import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/member`;

// API 로그인 요청
export const loginPost = async (loginParam) => {
  const header = { Headers: { "Content-Type": "x-www-form-urlencoded" } };
  const form = new FormData();
  form.append("username", loginParam.email);
  form.append("password", loginParam.password);

  const response = await axios.post(`${host}/login`, form, header);

  return response.data;
};

// 회원 정보 수정 요청
export const modifyMember = async (member) => {
  const response = await jwtAxios.put(`${host}/modify`, member);
  return response.data;
};
