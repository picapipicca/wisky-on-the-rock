import type {NextPage} from "next";
import {Button, Input, Textarea} from "../../components/atom";

const Create: NextPage = () => {
    return (
        <div className={"px-4 space-y-5 py-10"}>
            <div>
                <label
                    className={"cursor-pointer w-full flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md mb-3 text-gray-600 hover:text-orange-500 hover:border-orange-500"}>
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
            <Input id={"product-name"} outerLabel={"상품명"} isRequired/>
            <Input id="price" outerLabel={"가격"} isRequired rightInnerLabel={"원"} placeholder={"0"}/>
            <Textarea id={"description"} label={"설명"}/>
            <Button>업로드</Button>
        </div>
    );
};

export default Create;