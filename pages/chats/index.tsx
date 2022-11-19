import type {NextPage} from "next";
import Layout from "@components/layout/layout";
import Link from "next/link";

const Chat: NextPage = () => {
    return (
        <Layout title={"채팅"} isTabBar>
            <div className={"divide-y-[1px]"}>
                {[1, 2, 3, 4, 5].map((_, i) => (
                    <Link legacyBehavior href={`/chats/${i}`} key={i}>
                        <a className="flex px-4 cursor-pointer py-3 items-center space-x-3">
                            <div className="w-12 h-12 rounded-full bg-slate-300"/>
                            <div>
                                <p className="text-gray-700">윤방구</p>
                                <p className="text-sm text-gray-500">ㅋㅋㅋㅋㅋ 그거 그렇게 하는거 아닌데</p>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
        </Layout>)
}

export default Chat;