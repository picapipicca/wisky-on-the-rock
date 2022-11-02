import type {NextPage} from "next";

const Write : NextPage = () =>{
    return <div className={"py-10 px-4 flex flex-col"}>
         <textarea
             className="mt-1 shadow-sm w-full focus:ring-emerald-500 rounded-md border-gray-300 focus:border-emerald-500 "
             rows={4}
             placeholder="당신의 동네생활이 궁금해요!"/>
        <button className="mt-2 w-full bg-emerald-600 hover:bg-orange-700 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 focus:outline-none ">
            게시글작성
        </button>
    </div>;
}

export default Write;