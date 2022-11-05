import type {NextPage} from "next";
import Layout from "../../components/layout/layout";
import {Button} from "../../components/atom";

const Stream: NextPage = () => {
    return (
        <Layout title={"라이브"} isTabBar>
            <div className={"space-y-4 divide-y-2 pb-4"}>
                {[1, 2, 2, 2, 2].map((_, i) => (<div className={"pt-4 px-4"} key={i}>
                    <div className={"w-full rounded-md shadow-sm bg-slate-300 aspect-video"}/>
                    <h3 className={"text-gray-700 text-lg mt-2"}>영웅시대</h3>
                </div>))}
                <Button buttonType={"float"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin={"round"} strokeWidth={"2"}
                              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"/>
                    </svg>
                </Button>
            </div>
        </Layout>

    )
}

export default Stream;