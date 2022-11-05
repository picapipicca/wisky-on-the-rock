import {cls} from "../../libraries/utils";

interface InputProps {
    leftInnerLabel?: string;
    rightInnerLabel?: string;
    placeholder?: string;
    outerLabel?: string;
    isRequired?: boolean;
    id?: string;
}

//TODO : OuterLabel 위치 손보기 input components 에 고정? 밖으로 뺄것인지?
const Input = ({id, isRequired = false, leftInnerLabel, rightInnerLabel, placeholder, outerLabel}: InputProps) => {
    return (
        <div>
            {outerLabel && <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-700">
                {outerLabel}
            </label>}
            <div className="rounded-md relative flex shadow-sm">
                {leftInnerLabel &&
                        <span
                            className={"flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm"}>{leftInnerLabel}</span>}
                <input id={id}
                       placeholder={placeholder}
                       type="text"
                       className={cls(leftInnerLabel ? "px-8 rounded-l-none" : rightInnerLabel ? "pr-20" : "", "px-3 appearance-none w-full py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500")}
                       required={isRequired}/>
                {rightInnerLabel &&
                    <div
                        className={"py-2.5 absolute pointer-events-none right-0 px-3 border-l flex items-center justify-center"}>
                        <span className={"text-gray-500 text-sm"}>{rightInnerLabel}</span>
                    </div>}
            </div>
        </div>
    );
};

export default Input;