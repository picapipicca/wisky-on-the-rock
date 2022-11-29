import type { NextPage } from "next";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { Button, Input, Textarea } from "@components/atom";
import Layout from "@components/layout/layout";
import { useForm, SubmitHandler } from "react-hook-form";
import useMutation from "../../libraries/client/useMutation";
import { Stream } from "@prisma/client";

interface StreamFormProps {
  name: string;
  price: number;
  description: string;
}
interface StreamResponseProps {
  ok:boolean;
  stream:Stream
}

const StreamCreate: NextPage = () => {
  const router = useRouter();
  const { handleSubmit, register, setError } = useForm<StreamFormProps>();
  const [createStream, { data, isLoading }] = useMutation<StreamResponseProps>("/api/streams");
  const onValid: SubmitHandler<StreamFormProps> = (data) => {
    if (isLoading) return;
    console.log(data);
    createStream(data);
  };
  useEffect(()=>{
    if(data && data.ok){
      router.push(`/streams/${data.stream.id}`)
    }
  },[data,router])
  return (
    <Layout goBackHandler title="라이브">
      <form onSubmit={handleSubmit(onValid)}>
        <div className={"px-4 space-y-5"}>
          <Input
            outerLabel={"상품명"}
            type="text"
            register={register("name", { required: "필수 입력칸입니다." })}
          />
          <Input
            outerLabel={"가격"}
            register={register("price", { required: "필수 입력칸입니다.", valueAsNumber:true })}
            placeholder={"0"}
            rightInnerLabel={"원"}
            type="number"
          />
          <Textarea
            register={register("description", {
              required: "필수 입력칸입니다.",
            })}
            placeholder={"상품설명을 입력해주세요."}
            label={"설명"}
          />
          <Button clickHandler={handleSubmit(onValid)}>
            {isLoading ? "...Loading" : "라이브 시작하기"}
          </Button>
        </div>
      </form>
    </Layout>
  );
};
export default StreamCreate;
