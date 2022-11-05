import type {NextPage} from "next";
import Message from "../../components/message";
import Layout from "../../components/layout/layout";

const StreamDetail:NextPage = ()=> {
    return(
        <Layout goBackHandler>
            <div className={"px-4 space-y-4"}>
                <div className={"w-full rounded-md shadow-sm bg-slate-300 aspect-video"}/>
                <h3 className={"text-gray-800 font-semibold text-2xl mt-2"}>영웅시대</h3>
                <div className={"mt-10 pb-8 h-[38vh] overflow-y-scroll px-4 space-y-4"}>
                    <Message message={"안녕하세요 아직 판매 하시나요?"}/>
                    <Message message={"넹 이만원이요"} reversed/>
                    <Message message={"넘비싸요"}/>
                    <Message message={"안녕하세요 아직 판매 하시나요?"}/>
                    <Message message={"넹 이만원이요"} reversed/>
                    <Message message={"넘비싸요"}/>
                    <Message message={"안녕하세요 아직 판매 하시나요?"}/>
                    <Message message={"넹 이만원이요"} reversed/>
                    <Message message={"넘비싸요"}/>
                    <Message message={"안녕하세요 아직 판매 하시나요?"}/>
                    <Message message={"넹 이만원이요"} reversed/>
                    <Message message={"넘비싸요"}/>
                    <Message message={"안녕하세요 아직 판매 하시나요?"}/>
                    <Message message={"넹 이만원이요"} reversed/>
                    <Message message={"넘비싸요"}/>
                </div>
                <div className={"fixed w-full mx-auto max-w-md bottom-2 inset-x-0"}>
                    <div className={"relative flex items-center"}>
                        <input type="text"
                               className={"shadow-sm rounded-full w-full pr-12 border-gray-300 focus:ring-emerald-700 focus:outline-none focus:border-emerald-700"}/>
                        <div className={"absolute inset-y-0 flex py-1.5 pr-1.5 right-0"}>
                            <button
                                className={"flex bg-gray-100 rounded-full px-3 text-sm items-center cursor-pointer hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 "}>&rarr;</button>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default StreamDetail;