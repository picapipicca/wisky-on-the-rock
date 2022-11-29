import React,{ReactNode} from "react";
import {cls} from "@libraries/client/utils";
import Link from "next/link";
import {useRouter} from "next/router";

interface LayoutProps {
    children: ReactNode;
    title?: string;
    goBackHandler?: boolean;
    isTabBar?: boolean;
}

const Layout = ({children, title, goBackHandler, isTabBar}: LayoutProps) => {
    const router = useRouter();
    const pageBack = () => {
        router.back();
    }
    return (
        <div>
            <div className="bg-white w-full h-12 max-w-xl justify-center text-lg px-10 font-medium  fixed text-gray-800 border-b top-0 flex items-center">
                {goBackHandler ? (
                    <button onClick={pageBack} className="absolute left-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>) : null}
                {title ? (
                    <span className={cls(goBackHandler ? "mx-auto" : "", "")}>{title}</span>
                ) : null}
            </div>
            <div className={cls("pt-16", isTabBar ? "pb-20" : "")}>
                {children}
            </div>

            {isTabBar ? (
                <nav
                    className={"cursor-pointer bg-white max-w-xl text-gray-700 border-t fixed bottom-0 w-full px-10 pb-5 pt-3 flex justify-between text-xs"}>
                    <Link legacyBehavior href={"/"}>
                        <a
                            className={cls(
                                "flex flex-col items-center space-y-2 ",
                                router.pathname === "/"
                                    ? "text-emerald-600"
                                    : "hover:text-gray-500 transition-colors"
                            )}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                            </svg>
                            <span>홈</span>
                        </a>
                    </Link>
                    <Link legacyBehavior href={"/community"}>
                        <a
                            className={cls(
                                "flex flex-col items-center space-y-2 ",
                                router.pathname === "/community"
                                    ? "text-emerald-600"
                                    : "hover:text-gray-500 transition-colors"
                            )}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"/>
                            </svg>
                            <span>동네생활</span>
                        </a></Link>
                    <Link legacyBehavior href={"/chats"}>
                        <a
                            className={cls(
                                "flex flex-col items-center space-y-2 ",
                                router.pathname === "/chats"
                                    ? "text-emerald-600"
                                    : "hover:text-gray-500 transition-colors"
                            )}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>
                            </svg>
                            <span>채팅</span>
                        </a>
                    </Link>
                    <Link legacyBehavior href={"/streams"}>
                        <a
                            className={cls(
                                "flex flex-col items-center space-y-2 ",
                                router.pathname === "/stream"
                                    ? "text-emerald-600"
                                    : "hover:text-gray-500 transition-colors"
                            )}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round"
                                      d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"/>
                            </svg>
                            <span>라이브</span>
                        </a>
                    </Link>
                    <Link legacyBehavior href={"/profile"}>
                        <a
                            className={cls(
                                "flex flex-col items-center space-y-2 ",
                                router.pathname === "/profile"
                                    ? "text-emerald-600"
                                    : "hover:text-gray-500 transition-colors"
                            )}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            <span>프로필</span>
                        </a>
                    </Link>
                </nav>
            ) : null}
        </div>
    );
}

export default Layout;