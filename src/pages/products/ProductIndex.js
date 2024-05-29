import { Outlet } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import ProductHeader from "./ProductHeader";

const ProductIndex = () => {
  return (
    <BasicLayout>
      {/* Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductHeader />
        <main>
          <Outlet />
        </main>
      </div>
    </BasicLayout>
  );
};

export default ProductIndex;
