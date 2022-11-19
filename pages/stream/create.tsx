import type {NextPage} from "next";
import {Button, Input, Textarea} from "@components/atom";
import Layout from "@components/layout/layout";

const StreamCreate: NextPage = () => {
    return (
        <Layout goBackHandler>
            <div className={"px-4 space-y-5"}>
                <Input outerLabel={"상품명"} id={"product-name"} isRequired/>
                <Input outerLabel={"가격"} id={"price"} placeholder={"0"} rightInnerLabel={"원"} isRequired/>
                <Textarea id={"product-description"} placeholder={"상품설명을 입력해주세요."} label={"설명"}/>
                <Button>라이브 시작하기</Button>
            </div>
        </Layout>
    )
}
export default StreamCreate;