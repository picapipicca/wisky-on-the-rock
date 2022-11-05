import type {NextPage} from "next";

interface TextAreaProps {
    label?: string;
    placeholder?: string;
    rows?: number;
    id?:string;
}

const Textarea = ({id,label, placeholder = "", rows = 4}: TextAreaProps) => {
    return (
        <div>
            {label && <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>}
            <textarea
                id={id}
                className="mt-1 shadow-sm w-full focus:ring-emerald-500 rounded-md border-gray-300 focus:border-emerald-500 "
                rows={rows}
                placeholder={placeholder}/>
        </div>
    );
};

export default Textarea;