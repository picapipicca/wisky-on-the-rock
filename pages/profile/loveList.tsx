import type {NextPage} from "next";
import Layout from "@components/layout/layout";
import ProductList from "@components/productList";

const LoveList: NextPage = () => {
    return (
        <Layout goBackHandler>
            <div className={"flex flex-col space-y-1 divide-y-[1px]"}>
            <ProductList type={"likes"}/>
            </div>
        </Layout>
    );
};

export default LoveList;