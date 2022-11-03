import type {NextPage} from "next";

const StreamCreate:NextPage=()=>{
    return(
        <div className={"px-4 space-y-5 py-10"}>
            <div>
                <label  className="mb-1 block text-sm font-medium text-gray-700"
                        htmlFor="name">상품명</label>
                <div className="rounded-md relative flex  items-center shadow-sm">
                    <input  id="name"
                            type="email"
                            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                            required/>
                </div>
            </div>
            <div>
                <label className={"text-sm font-medium text-gray-700 mb-1 block"} htmlFor={"price"}>가격</label>
                <div className="flex items-center rounded-md shadow-sm relative">
                    {/*<div className={"absolute left-0 pl-3 flex items-center justify-center"}>*/}
                    {/*    <span className={"text-gray-500 text-sm"}>$</span>*/}
                    {/*</div>*/}
                    <input id={"price"} type="text" placeholder="0" className={"pl-5 appearance-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-700 focus:border-green-700 w-full py-2 border border-gray-300"} />
                    <div className={"absolute pointer-events-none right-0 px-3 border-l flex items-center justify-center"}>
                        <span className={"text-gray-500 text-sm"}>원</span>
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor="description" className={"text-sm font-medium text-gray-700 mb-1 block"}>설명</label>
                <textarea id="description" rows={4} className={"mt-1 shadow-sm w-full focus:ring-emerald-700 rounded-md border-gray-300 focus:border-emerald-800"}/>
            </div>
            <button className={"bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:outline-none w-full"}>라이브 시작하기</button>
        </div>
    )
}
export default StreamCreate;