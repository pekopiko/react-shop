import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/products`;

// 상품 등록 요청
export const postAdd = async (product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const response = await jwtAxios.post(`${host}/`, product, header);
  return response.data;
};

// 상품 목록 조회 요청
export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const response = await jwtAxios.get(`${host}/list`, {
    params: { page: page, size: size },
  });
  return response.data; // PageResponseDTO {list, prev, next...}
};

// 상품 조회 요청
export const getOne = async (pno) => {
  const response = await jwtAxios.get(`${host}/${pno}`);
  return response.data; // ProductDTO
};

// 수정
export const putOne = async (pno, product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const response = await jwtAxios.put(`${host}/${pno}`, product, header);
  return response.data;
};

// 삭제
export const deleteOne = async (pno) => {
  const response = await jwtAxios.delete(`${host}/${pno}`);
  return response.data;
};
