import type {NextPage} from "next";
import Layout from "../../components/layout/layout";
import Item from "../../components/item";

const BuyList: NextPage = () => {
    return (
        <Layout goBackHandler>
            <div className={"flex flex-col space-y-1 divide-y-[1px]"}>
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
                    <Item key={i} title={"임영웅 포스터 대형"} price={20000} id={23} commentsNum={2} likeNum={1}/>
                ))}
            </div>
        </Layout>
    );
};

export default BuyList;