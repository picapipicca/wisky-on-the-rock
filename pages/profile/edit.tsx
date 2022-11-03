import type { NextPage } from "next";

const EditProfile: NextPage = () => {
    return (
        <div className={"py-10 px-4 space-y-4"}>
            <div className={"flex items-center space-x-6"}>
                <div className={"w-20 h-20 rounded-full bg-slate-200"}/>
                <label htmlFor={"profile-img"} className={"cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 text-gray-700"} >
                    프로필 변경
                    <input id="profile-img" type={"file"} className={"hidden"} accept={"image/*"}/>
                </label>

            </div>
            <div className={"space-y-1"} >
                <label htmlFor={"profile-email"} className={"text-sm font-medium text-gray-700"}>이메일</label>
                <input id="profile-email" type="number" required className="appearance-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-700 focus:border-green-700 w-full px-3 py-2 border border-gray-300"/>
            </div>
            <div className={"space-y-1"} >
                <label htmlFor={"login-input"} className={"text-sm font-medium text-gray-700"}>휴대폰번호</label>
                <div className={"mt-1"}>
                        <div className={"flex rounded-md shadow-sm"}>
                            <span className={"flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm"}>+82</span>
                            <input id="login-input" type="number" required className="appearance-none rounded-l-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-700 focus:border-green-700 w-full px-3 py-2 border border-gray-300"/>
                        </div>
                </div>
            </div>
            <button className={"bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium w-full focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:outline-none mt-5"}>프로필 업데이트</button>
        </div>
    );
};

export default EditProfile;