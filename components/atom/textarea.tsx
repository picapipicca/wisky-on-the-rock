import type { NextPage } from "next";
import type { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  rows?: number;
  register: UseFormRegisterReturn;
  isRequired?: boolean;
  error:any;
}

const Textarea = ({
  isRequired = false,
  register,
  label,
  placeholder = "",
  rows = 4,
  error
}: TextAreaProps) => {
  console.log(error)
  return (
    <div>
      {label && (
        <label
          htmlFor={register.name}
          className="text-sm font-medium text-gray-700 mb-1 block"
        >
          {label}
        </label>
      )}
      <textarea
        {...register}
        id={register.name}
        className="mt-1 shadow-sm w-full focus:ring-emerald-500 rounded-md border-gray-300 focus:border-emerald-500 "
        rows={rows}
        placeholder={placeholder}
        required={isRequired}
      />
      <span className="text-red-500 font-semibold text-sm">{error[register.name]?.message}</span>
    </div>
  );
};

export default Textarea;
