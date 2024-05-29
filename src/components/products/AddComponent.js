import { PhotoIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { postAdd } from "../../api/productsApi";
import ProgressModal from "../common/ProgressModal";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  pname: "",
  pdesc: "",
  price: 0,
  files: [],
};

const AddComponent = () => {
  const [product, setProduct] = useState({ ...initState });
  const [progress, setProgress] = useState(false); // 진행중모달 띄우기 여부
  const [result, setResult] = useState(null); // 결과 모달 띄우기 여부

  const uploadRef = useRef(); // input file에 id속성처럼 사용할 훅

  const { moveToList } = useCustomMove();

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };

  const handleClickAdd = () => {
    console.log("Add btn clicked!!");
    // 파일정보 가져와 FormData에 담기 : uploadRef.current == input file
    const files = uploadRef.current.files;
    console.log(files);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);

    console.log(formData);

    setProgress(true); // 진행중 모달 띄우기
    postAdd(formData).then((data) => {
      console.log("postAdd result : ", data);
      setProgress(false); // 진행중 모달 닫기
      setResult(data.RESULT);
    });
  };

  const closeModal = () => {
    setResult(null); // 결과 모달 닫기
    moveToList({ page: 1 });
  };

  return (
    <>
      {progress ? <ProgressModal /> : <></>}
      {result ? (
        <ResultModal
          title={"Product Add Result"}
          content={`${result}번 등록 완료`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              New Product
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="pname"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="pname"
                    id="pname"
                    value={product.pname}
                    onChange={handleChangeProduct}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="pdesc"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="pdesc"
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
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={product.price}
                    onChange={handleChangeProduct}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
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
              className="ml-3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleClickAdd}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddComponent;
