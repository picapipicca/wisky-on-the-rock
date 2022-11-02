import type { NextPage } from "next";

const Upload: NextPage = () => {
    return (
        <div className={"px-4 py-16"}>
            <div>
                <label className={"cursor-pointer w-full flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md mb-3 text-gray-600 hover:text-orange-500 hover:border-orange-500"}>
                    <svg
                        className="h-12 w-12"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <input type="file" className={"hidden"}/>
                </label>
            </div>

            <div className={"my-5"}>
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
                <label className={"text-sm font-medium text-gray-700 mb-1 block"}>Description</label>
                    <textarea rows={4} className={"mt-1 shadow-sm w-full focus:ring-emerald-700 rounded-md border-gray-300 focus:border-emerald-800"}/>
            </div>
            <button className={"bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:outline-none mt-6 w-full"}>업로드</button>
        </div>
    );
};

export default Upload;