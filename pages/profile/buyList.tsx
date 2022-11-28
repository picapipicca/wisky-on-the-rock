import type {NextPage} from "next";
import Layout from "@components/layout/layout";
import ProductList from "@components/productList";

const BuyList: NextPage = () => {
    return (
        <Layout goBackHandler>
            <div className={"flex flex-col space-y-1 divide-y-[1px]"}>
            <ProductList type={"purchases"}/>
            </div>
        </Layout>
    );
};

export default BuyList;