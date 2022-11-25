import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@components/layout/layout";
import { Button, Textarea } from "@components/atom";
import { useForm, SubmitHandler } from "react-hook-form";
import useSWR from "swr";
import { Comment, Post, User } from "@prisma/client";
import { useRouter } from "next/router";
import useMutation from "@libraries/client/useMutation";
import { cls } from "@libraries/client/utils";
import { useEffect } from "react";

interface PostCommentProps {
  comment: string;
}
interface CommentWithUserProps extends Comment {
  user: User;
}
interface PostWithUserProps extends Post {
  user: User;
  _count: {
    comments: number;
    sameQuestions: number;
  };
  comments: CommentWithUserProps[];
}
interface CommunityResponseProps {
  ok: boolean;
  post: PostWithUserProps;
  isSameQuestion: boolean;
}
interface CommentResponseProps {
  ok: boolean;
  comment: Comment;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostCommentProps>();
  const [sameQuestion, { isLoading }] = useMutation(
    `/api/posts/${router.query.communityId}/sameQuestion`
  );
  const [sendComment, { data: commentsData, isLoading: commentsIsLoading }] =
    useMutation<CommentResponseProps>(
      `/api/posts/${router.query.communityId}/comment`
    );
  const { data, mutate } = useSWR<CommunityResponseProps>(
    router.query.communityId ? `/api/posts/${router.query.communityId}` : null
  );
  const onClickSameQuestion = () => {
    if (!data) return;
    mutate(
      {
        ...data,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            sameQuestions: data.isSameQuestion
              ? data.post._count.sameQuestions - 1
              : data.post._count.sameQuestions + 1,
          },
        },
        isSameQuestion: !data.isSameQuestion,
      },
      false
    );
    if (!isLoading) {
      sameQuestion({});
    }
  };
  const onValid: SubmitHandler<PostCommentProps> = (data) => {
    if (commentsIsLoading) return;
    sendComment(data);
  };
  useEffect(() => {
    if (commentsData && commentsData.ok) {
      reset();
    }
  }, [commentsData, reset]);

  return (
    <Layout goBackHandler>
      <div>
        <span className="inline-flex mb-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          동네질문
        </span>
        <div className="mb-3 px-4 pb-3 border-t py-3 border-b ">
          <Link legacyBehavior href={`/users/profiles/${data?.post?.user?.id}`}>
            <a className="flex cursor-pointer space-x-3 items-center">
              <div className="w-10 h-10 rounded-full bg-slate-300 mb-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {data?.post?.user?.name}
                </p>
                <p className="text-xs font-medium text-gray-500">
                  프로필 보기 &rarr;
                </p>
              </div>
            </a>
          </Link>
        </div>
        <div>
          <div className="mt-2 px-4 font-semibold text-gray-700">
            <span className="text-orange-500 font-semibold">Q.</span>{" "}
            {data?.post?.title}
          </div>
          <div className="mt-2 px-10 text-gray-700">{data?.post?.question}</div>

          <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
            <button
              onClick={onClickSameQuestion}
              className={cls(
                "flex space-x-2 items-center text-sm",
                data?.isSameQuestion ? "text-green-600" : ""
              )}
            >
              {data?.isSameQuestion ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              )}
              <span>궁금해요 {data?.post?._count?.sameQuestions}</span>
            </button>
            <span className="flex space-x-2 items-center text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 {data?.post?._count?.comments}</span>
            </span>
          </div>
        </div>
        <div className="px-4 my-5 space-y-5">
          {data?.post?.comments?.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full" />
              <div>
                <span className="text-sm block font-medium text-gray-700">
                  {comment.user.name}
                </span>
                <span className="text-xs text-gray-500 block ">
                  {new Date(comment.regDate).toString()}
                </span>
                <p className="text-gray-700 mt-2">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onValid)} className="px-4">
          <Textarea
            error={errors}
            register={register("comment", {
              required: "댓글을 입력해주세요",
              minLength: { value: 2, message: "최소 2글자이상 입력해주세요" },
            })}
            rows={4}
            placeholder="답변을 기다리고 있어요!"
          />
          <Button clickHandler={handleSubmit(onValid)}>
            {commentsIsLoading ? "...Loading" : "댓글작성"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
