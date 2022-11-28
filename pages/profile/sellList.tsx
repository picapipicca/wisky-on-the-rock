import type { NextPage } from "next";
import Layout from "@components/layout/layout";
import ProductList from "@components/productList";

const SellList: NextPage = () => {
  
  return (
    <Layout goBackHandler title="판매내역">
      <div className={"flex flex-col space-y-1 divide-y-[1px]"}>
        <ProductList type={"sells"}/>
      </div>
    </Layout>
  );
};

export default SellList;
