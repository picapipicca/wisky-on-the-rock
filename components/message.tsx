import {cls} from "../libraries/utils";

interface MessageProps {
    reversed?: boolean
    message:string;
}
const Message = ({reversed,message}:MessageProps) => {

    return (
        <div className={cls("flex items-start space-x-2",reversed ? "flex-row-reverse space-x-reverse":"")}>
            <div className={"w-8 h-8 rounded-full bg-slate-300"}/>
            <div className={"w-1/2 text-sm text-gray-800 border border-gray-300 p-2 rounded-md"}>
                <p>{message}</p>
            </div>

        </div>
    );
};

export default Message;