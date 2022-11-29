import type { NextPage } from "next";
import { useEffect } from "react";
import Layout from "@components/layout/layout";
import { Button, Input, Textarea } from "@components/atom";
import { useForm, SubmitHandler } from "react-hook-form";
import useMutation from "@libraries/client/useMutation";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import useCoords from "../../libraries/client/useCoords";

interface PostCreateProps {
  title: string;
  question: string;
}

interface PostCreateResponseProps {
  ok: boolean;
  post: Post;
}

const Create: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreateProps>();
  const { longitude, latitude } = useCoords();
  const [post, { isLoading, data }] =
    useMutation<PostCreateResponseProps>("/api/posts");
  const onValid: SubmitHandler<PostCreateProps> = (data) => {
    if (isLoading) return;
    post({ ...data, latitude, longitude });
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);

  return (
    <Layout goBackHandler title="당신이 궁금한 동네생활은 무엇인가요?">
      <form
        onSubmit={handleSubmit(onValid)}
        className={"px-4 flex flex-col space-y-3"}
      >
        <Input
          error={errors}
          register={register("title", {
            required: "필수 입력칸입니다.",
            minLength: { value: 3, message: "최소 3자 이상 작성해주세요" },
          })}
          outerLabel={"제목"}
          isRequired={true}
        />
        <Textarea
          error={errors}
          register={register("question", {
            required: "내용이 비어있습니다.",
          })}
          placeholder="당신의 동네생활이 궁금해요!"
          rows={4}
        />
        <Button clickHandler={handleSubmit(onValid)}>
          {isLoading ? "...Loading" : "게시글작성"}
        </Button>
      </form>
    </Layout>
  );
};

export default Create;
