import type { NextPage } from "next";
import { useEffect } from "react";
import Layout from "@components/layout/layout";
import { Button, Input, Textarea } from "@components/atom";
import { useForm, SubmitHandler } from "react-hook-form";
import useMutation from "@libraries/client/useMutation";

interface PostCreateProps {
  name: string;
  description: string;
}
const Create: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreateProps>();
  const [post, { isLoading, data }] = useMutation("/api/posts");
  const onValid: SubmitHandler<PostCreateProps> = (data) => {
    post(data);
  };
  useEffect(() => {
    
  }, [data]);
  return (
    <Layout goBackHandler title="당신이 궁금한 동네생활은 무엇인가요?">
      <form
        onSubmit={handleSubmit(onValid)}
        className={"px-4 flex flex-col space-y-3"}
      >
        <Input
          error={errors}
          register={register("name", {
            required: "필수 입력칸입니다.",
            minLength: { value: 3, message: "최소 3자 이상 작성해주세요" },
          })}
          outerLabel={"제목"}
          isRequired={true}
        />
        <Textarea
          error={errors}
          register={register("description", {
            required: "내용이 비어있습니다.",
          })}
          placeholder="당신의 동네생활이 궁금해요!"
          rows={4}
        />
        <Button clickHandler={handleSubmit(onValid)}>게시글작성</Button>
      </form>
    </Layout>
  );
};

export default Create;
