import type {NextPage} from "next";
import Layout from "@components/layout/layout";
import {Button, Input, Textarea} from "@components/atom";

const Create: NextPage = () => {
    return (
        <Layout goBackHandler>
            <div className={"px-4 flex flex-col space-y-3"}>
                <Input outerLabel={"제목"} isRequired={true}/>
                <Textarea placeholder="당신의 동네생활이 궁금해요!" rows={4}/>
                <Button>게시글작성</Button>
            </div>
        </Layout>
    );
}

export default Create;