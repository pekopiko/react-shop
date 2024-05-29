import { useEffect, useRef, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/productsApi";
import ProgressModal from "../common/ProgressModal";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  delFlag: false,
  uploadedFileNames: [],
};
const host = API_SERVER_HOST;

const ModifyComponent = ({ pno }) => {
  const [product, setProduct] = useState(initState);
  const [progress, setProgress] = useState(false); // 로딩 모달
  const [result, setResult] = useState(null); // 결과 모달

  const { moveToList, moveToRead } = useCustomMove();

  const uploadRef = useRef();

  useEffect(() => {
    setProgress(true);
    getOne(pno).then((data) => {
      setProduct(data);
      setProgress(false);
    });
  }, [pno]);

  // input 내용 변경 처리
  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };

  // 수정 버튼 이벤트 핸들러
  const handleClickModify = () => {
    const formData = new FormData();
    // 새로 추가하는 이미지 formData에 넣기
    const files = uploadRef.current.files;
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    //나머지 데이터
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);
    formData.append("delFlag", product.delFlag);
    // 기존 이미지중 남긴것
    for (let i = 0; i < product.uploadedFileNames.length; i++) {
      formData.append("uploadedFileNames", product.uploadedFileNames[i]);
    }
    // 수정 처리 요청
    setProgress(true);
    putOne(pno, formData).then((data) => {
      setResult("Modified");
      setProgress(false);
    });
  };

  // 삭제 버튼 이벤트 핸들러
  const handleClickDelete = () => {
    setProgress(true);
    deleteOne(pno).then((data) => {
      setResult("Deleted");
      setProgress(false);
    });
  };

  // 기존 이미지 delete 버튼 클릭 핸들러 : uploadedFileNames에서 imageName만 삭제
  const deleteOldImage = (imageName) => {
    // 삭제클릭된 이미지명을 제외한 uploadedFileNames 리스트를 받아 통으로 갈아 엎기
    const remainFileNames = product.uploadedFileNames.filter(
      (fileName) => fileName !== imageName
    );
    product.uploadedFileNames = remainFileNames;
    setProduct({ ...product });
  };

  const closeModal = () => {
    if (result === "Modified") {
      moveToRead(pno);
    } else if (result === "Deleted") {
      moveToList({ page: 1 });
    }
    setProgress(null); // 결과 모달 닫기
  };

  return (
    <>
      {progress ? <ProgressModal /> : <></>}
      {result ? (
        <ResultModal
          title={`${result}`}
          content={"정상적으로 처리되었습니다."}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Modify Product
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="pname"
                    value={product.pname}
                    onChange={handleChangeProduct}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Product Description
                </label>
                <div className="mt-2">
                  <textarea
                    name="pdesc"
                    value={product.pdesc}
                    onChange={handleChangeProduct}
                    rows={4}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {product.pdesc}
                  </textarea>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write details about product.
                </p>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChangeProduct}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Delete
                </label>
                <div className="mt-2">
                  <select
                    name="delFlag"
                    value={product.delFlag}
                    onChange={handleChangeProduct}
                    defaultValue={false}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={false}>사용</option>
                    <option value={true}>삭제</option>
                  </select>
                </div>
              </div>
              {/* oldImage 이미 업로드된 이미지 보여주기 */}
              <div className="bg-white col-span-full">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                  <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
                    {product.uploadedFileNames.map((image, idx) => (
                      <div
                        key={idx}
                        className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2"
                      >
                        <img
                          src={`${host}/api/products/view/${image}`}
                          alt={product.pname}
                          className="object-cover object-center group-hover:opacity-75"
                        />
                        <div
                          aria-hidden="true"
                          className="bg-gradient-to-b from-transparent to-black opacity-50"
                        />
                        <div className="flex items-end p-6">
                          <button
                            type="button"
                            onClick={() => deleteOldImage(image)}
                            className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-gray-900  hover:bg-gray-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* newImage 새로 추가할 이미지 업로드 */}
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Images
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                      <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          ref={uploadRef}
                          multiple={true}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-6 flex items-center justify-end">
            <button
              type="button"
              className="ml-3 rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
              onClick={handleClickDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="ml-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleClickModify}
            >
              Modify
            </button>
            <button
              type="button"
              className="ml-3 rounded-md bg-slate-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
              onClick={moveToList}
            >
              List
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ModifyComponent;
