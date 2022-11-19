import React, {ReactNode} from "react";

interface ButtonProps {
    buttonType?: string;
    children?: string | number | ReactNode;
    clickHandler?: (...args:any) => void;
    [key: string]: any;
}

const buttonTypeObj: { [key: string]: string } = {
    "login":"flex justify-center px-4 py-2 border border-gray-300 shadow-sm rounded-md text-sm font-medium text-gray-500 hover:bg-gray-50",
    "default": "flex-1 mt-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 focus:outline-none",
    "icon": "p-2.5 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 rounded-md",
    "float": "fixed text-white bottom-24 right-5 transition-colors bg-emerald-600 p-5 shadow-xl rounded-full hover:bg-emerald-700 cursor-pointer",
}

const Button = ({clickHandler, buttonType = "default", children}: ButtonProps) => {
    return (
        <button
            className={`transition-button no-underline
				${buttonTypeObj[buttonType]}`}
            type="button"
            onClick={clickHandler}
        >
                {children}
        </button>
    );
};

export default Button;