import type {NextPage} from "next";
import Layout from "@components/layout/layout";
import {Button, Textarea} from "@components/atom";

const CommunityPostDetail: NextPage = () => {
    return (
        <Layout goBackHandler>
            <div>
          <span
              className="inline-flex mb-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            동네질문
          </span>
                <div className="flex mb-3 px-4 cursor-pointer pb-3 border-t py-3 border-b items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-slate-300"/>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Steve Jebs</p>
                        <p className="text-xs font-medium text-gray-500">
                            View profile &rarr;
                        </p>
                    </div>
                </div>
                <div>
                    <div className="mt-2 px-4 text-gray-700">
                        <span className="text-orange-500 font-medium">Q.</span> 근처에 테니스 배울곳 있나요??
                    </div>
                    <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
          <span className="flex space-x-2 items-center text-sm">
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>궁금해요 1</span>
          </span>
                        <span className="flex space-x-2 items-center text-sm">
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            <span>답변 1</span>
          </span>
                    </div>
                </div>
                <div className="px-4 my-5 space-y-5">
                    <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-slate-200 rounded-full"/>
                        <div>
                            <span className="text-sm block font-medium text-gray-700">영웅시대</span>
                            <span className="text-xs text-gray-500 block ">2시간 전</span>
                            <p className="text-gray-700 mt-2">저도배우고싶네용 ㅠㅠ</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-slate-200 rounded-full"/>
                        <div>
                            <span className="text-sm block font-medium text-gray-700">냐옹미야옹</span>
                            <span className="text-xs text-gray-500 block">3시간 전</span>
                            <p className="text-gray-700 mt-2">근처에 대학교가 있으면 문화센터 프로그램처럼 하는거 있어요 한번 찾아보세요</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-slate-200 rounded-full"/>
                        <div>
                            <span className="text-sm block font-medium text-gray-700">하늘맘</span>
                            <span className="text-xs text-gray-500 block ">4시간 전</span>
                            <p className="text-gray-700 mt-2">아담센터에 개인레슨 해주는분 계세요</p>
                        </div>
                    </div>
                </div>
                <div className="px-4">
                    <Textarea rows={4} placeholder="답변을 기다리고 있어요!"/>
                    <Button>댓글작성</Button>
                </div>
            </div>
        </Layout>

    );
};

export default CommunityPostDetail;