import { useEffect, useState } from "react";
import { getOne } from "../../api/productsApi";
import { API_SERVER_HOST } from "../../api/todoApi";
import { Tab } from "@headlessui/react";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  uploadedFileNames: [],
};
const host = API_SERVER_HOST;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ReadComponent = ({ pno }) => {
  const [product, setProduct] = useState(initState);
  const { moveToList, moveToModify } = useCustomMove();

  useEffect(() => {
    getOne(pno).then((data) => {
      console.log(data);
      setProduct(data);
    });
  }, [pno]);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {product.uploadedFileNames.map((image, idx) => (
                    <Tab
                      key={idx}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">{product.pname}</span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img
                              src={`${host}/api/products/view/${image}`}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? "ring-indigo-500" : "ring-transparent",
                              "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                {product.uploadedFileNames.map((image, idx) => (
                  <Tab.Panel key={idx}>
                    <img
                      src={`${host}/api/products/view/${image}`}
                      alt={product.pname}
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.pname}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-2xl tracking-tight text-gray-900">
                  {product.price} 원
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.pdesc }}
                />
              </div>

              <div className="mt-10 flex">
                <button
                  type="button"
                  onClick={() => moveToModify(pno)}
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Modify
                </button>
                <button
                  type="button"
                  onClick={() => moveToList()}
                  className="ml-4 flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-slate-300 px-8 py-3 text-base font-medium text-white hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadComponent;
