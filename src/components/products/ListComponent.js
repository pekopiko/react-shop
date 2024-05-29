import { useEffect, useState } from "react";
import ProgressModal from "../common/ProgressModal";
import { getList } from "../../api/productsApi";
import useCustomMove from "../../hooks/useCustomMove";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
  list: [],
  pageNumList: [],
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  pageNumLength: 0,
  current: 0,
};

const host = API_SERVER_HOST; // ...localhost:8080

const ListComponent = () => {
  const [serverData, setServerData] = useState(initState);
  const [progress, setProgress] = useState(false); // 준비중 모달 띄우기 여부
  const { page, size, moveToList, refresh, moveToRead } = useCustomMove();

  // 예외 처리 함수
  const { exceptionHandle } = useCustomLogin();

  useEffect(() => {
    setProgress(true);
    getList({ page, size })
      .then((data) => {
        console.log(data);
        setServerData(data);
        setProgress(false);
      })
      .catch((err) => exceptionHandle(err));
  }, [page, size, refresh]);

  return (
    <>
      {progress ? <ProgressModal /> : <></>}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Product List
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {serverData.list.map((product) => (
              <div
                key={product.pno}
                onClick={() => moveToRead(product.pno)}
                className="group relative"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={`${host}/api/products/view/th_${product.uploadedFileNames[0]}`}
                    alt={product.pname}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.pname}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PageComponent serverData={serverData} movePage={moveToList} />
      </div>
    </>
  );
};

export default ListComponent;
