import type {NextPage} from "next";

const Stream:NextPage = ()=> {
    return(
        <div className={"py-10 space-y-4 divide-y-2"} >
            {[1,2,2,2,2].map((_,i)=>( <div className={"pt-4 px-4"} key={i}>
                <div className={"w-full rounded-md shadow-sm bg-slate-300 aspect-video"} />
                <h3 className={"text-gray-700 text-lg mt-2"}>영웅시대</h3>
            </div>))}
            <button className={"fixed text-white bottom-10 right-5 transition-colors bg-emerald-600 p-5 shadow-xl rounded-full border-transparent hover:bg-emerald-700 cursor-pointer"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin={"round"} strokeWidth={"2"}
                          d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"/>
                </svg>
            </button>
        </div>
    )
}

export default Stream;