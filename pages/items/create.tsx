import type { NextPage } from "next";
import { useEffect } from "react";
import { Button, Input, Textarea } from "@components/atom";
import { useForm, SubmitHandler } from "react-hook-form";
import Layout from "@components/layout/layout";
import useMutation from "@libraries/client/useMutation";
import { useRouter } from "next/router";
import { Item } from "@prisma/client";

interface createItemMutationProps {
  ok: boolean;
  item: Item;
  // name:string;
  // description:string;
  // price:number;
}
interface createItemProps {
  name: string;
  price: number;
  description: string;
}
const Create: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<createItemProps>();
  const [createItem, { isLoading, data }] =
    useMutation<createItemMutationProps>("/api/items");
  const onValid: SubmitHandler<createItemProps> = (data) => {
    if (isLoading) return;
    createItem(data);
  };

  useEffect(() => {
    if (data?.ok) {
      router.push(`/items/${data.item.id}`);
    }
  }, [data, router]);

  return (
    <Layout goBackHandler title="업로드">
      <form onSubmit={handleSubmit(onValid)} className={"px-4 space-y-5 py-10"}>
        <div>
          <label
            className={
              "cursor-pointer w-full flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md mb-3 text-gray-600 hover:text-orange-500 hover:border-orange-500"
            }
          >
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
            <input type="file" className={"hidden"} />
          </label>
        </div>
        <Input
          register={register("name", { required: "입력칸이 비었습니다!" })}
          name={"product-name"}
          outerLabel={"상품명"}
          isRequired
        />
        <Input
          register={register("price", { required: "입력칸이 비었습니다!" })}
          name="price"
          outerLabel={"가격"}
          isRequired
          rightInnerLabel={"원"}
          placeholder={"0"}
        />
        <Textarea
          register={register("description", {
            required: "입력칸이 비었습니다!",
          })}
          name={"description"}
          label={"설명"}
          isRequired
        />
        <Button clickHandler={handleSubmit(onValid)}>
          {isLoading ? "...로딩중" : "업로드"}
        </Button>
      </form>
    </Layout>
  );
};

export default Create;
