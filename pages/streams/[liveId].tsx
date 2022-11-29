import type { NextPage } from "next";
import Message from "@components/message";
import Layout from "@components/layout/layout";
import useSWR from "swr";
import { Stream } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useMutation from "@libraries/client/useMutation";
import useUser from "../../libraries/client/useUser";

interface OneChatProps {
  message: string;
  id: number;
  user: {
    avatarUrl?: string;
    id: number;
  };
}

interface ChatInStreamProps extends Stream {
  chats: OneChatProps[];
}

interface StreamResponseProps {
  ok: boolean;
  stream: ChatInStreamProps;
}
interface ChatFormProps {
  message: string;
}

const StreamDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<ChatFormProps>();

  const { data, mutate } = useSWR<StreamResponseProps>(
    router.query.liveId ? `/api/streams/${router.query.liveId}` : null,
    {
      refreshInterval: 1000,
    }
  );
  const [newChat, { isLoading, data: chatData }] = useMutation(
    `/api/streams/${router.query.liveId}/messages`
  );
  const onValid: SubmitHandler<ChatFormProps> = (data) => {
    if (isLoading) return;
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            chats: [
              ...prev.stream.chats,
              {
                id: Date.now(),
                message: data.message,
                user: { ...user },
              },
            ],
          },
        } as any),
      false
    );
    newChat(data);
    reset();
  };

  useEffect(() => {
    if (data && !data.ok) {
      alert("잘못된 접근입니다!");
      return;
    }
  }, [data]);

  return (
    <Layout goBackHandler title="온 라이브">
      <div className={"px-4 space-y-4"}>
        <div
          className={"w-full rounded-md shadow-sm bg-slate-300 aspect-video"}
        />
        <div className="mt-5">
          <h1 className="text-2xl font-bold text-gray-900">
            {data?.stream.name}
          </h1>
          <span className="text-xl block mt-2 text-gray-900">
            {data?.stream.price}
          </span>
          <p className="my-3 text-gray-700">{data?.stream.description}</p>
        </div>
        <div>
          <h2 className="text-md font-bold text-gray-900"> 🔴 라이브 채팅</h2>
          <div
            className={"mt-4 pb-4 h-[36vh] overflow-y-scroll px-4 space-y-4"}
          >
            {data?.stream?.chats.map((chat) => (
              <Message
                reversed={chat.user.id === user?.id}
                key={chat.id}
                message={chat.message}
              />
            ))}
          </div>
          <div className={"fixed w-full mx-auto max-w-md bottom-2 inset-x-0"}>
            <form
              onSubmit={handleSubmit(onValid)}
              className={"relative flex items-center"}
            >
              <input
                {...register("message", { required: true })}
                type="text"
                className={
                  "shadow-sm rounded-full w-full pr-12 border-gray-300 focus:ring-emerald-700 focus:outline-none focus:border-emerald-700"
                }
              />
              <div className={"absolute inset-y-0 flex py-1.5 pr-1.5 right-0"}>
                <button
                  onClick={handleSubmit(onValid)}
                  className={
                    "flex bg-gray-100 rounded-full px-3 text-sm items-center cursor-pointer hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 "
                  }
                >
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
