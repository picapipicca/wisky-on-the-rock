import { useState } from "react";
import { NextPage } from "next";
import { Input, Button } from "@components/atom";
import { useForm, SubmitHandler } from "react-hook-form";
import useMutation from "@libraries/client/useMutation";
import { cls } from "@libraries/client/utils";

interface LoginForm {
  email?: string;
  phoneNum?: string;
}
interface TokenForm {
  confirmToken: string;
}

interface LoginMutationProps {
  ok: boolean;
}

const Enter: NextPage = () => {
  const [method, setMethod] = useState<"email" | "phoneNum">("email");
  const { register, handleSubmit, reset } = useForm<LoginForm>();
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<TokenForm>();

  //login function , POST 결과 데이터 return 값
  const [login, { isLoading, data, error }] =
    useMutation<LoginMutationProps>("/api/users/login");

  const [confirmToken, { isLoading: tokenIsLoading, data: tokenData }] =
    useMutation<LoginMutationProps>("/api/users/confirm");

  const onEmailClick = () => {
    reset();
    setMethod("email");
  };
  const onPhoneClick = () => {
    reset();
    setMethod("phoneNum");
  };

  const onValid: SubmitHandler<LoginForm> = (data) => {
    if (isLoading) return;
    login(data);
  };
  const onTokenValid: SubmitHandler<TokenForm> = (data) => {
    if (tokenIsLoading) return;
    confirmToken(data);
  };

  console.log("::::data:::::", data);
  return (
    <div className={"mt-16 px-4"}>
      <h3 className={"text-3xl font-bold text-center"}>= Temp. name = </h3>
      <div className={"mt-8"}>
        {data?.ok ? (
          <form
            onSubmit={tokenHandleSubmit(onTokenValid)}
            className={"flex flex-col mt-8 space-y-4"}
          >
            <Input
              register={tokenRegister("confirmToken", { required: true })}
              isRequired
              type="number"
              outerLabel="인증번호 입력"
              name="confirmToken"
            />
            <Button clickHandler={tokenHandleSubmit(onTokenValid)}>
              {tokenIsLoading ? "...Loading" : "로그인하기"}
            </Button>
          </form>
        ) : (
          <>
            <div className={"flex flex-col items-center"}>
              <h5 className="text-sm text-gray-500">로그인</h5>
              <div className={"grid grid-cols-2 w-full border-b gap-16 mt-8"}>
                <button
                  className={cls(
                    "border-b-2 pb-4 font-medium",
                    method === "email"
                      ? "text-green-700 border-green-600"
                      : "border-transparent text-gray-500"
                  )}
                  onClick={onEmailClick}
                >
                  Email
                </button>
                <button
                  className={cls(
                    "border-b-2 pb-4 font-medium",
                    method === "phoneNum"
                      ? "text-green-700 border-green-600"
                      : "border-transparent text-gray-500"
                  )}
                  onClick={onPhoneClick}
                >
                  Phone
                </button>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onValid)}
              className={"flex flex-col mt-8 space-y-4"}
            >
              {method === "email" ? (
                <Input
                  register={register("email", {
                    required: "필수 입력칸 입니다",
                  })}
                  isRequired
                  type="email"
                  outerLabel="이메일"
                  name="login-email"
                />
              ) : null}
              {method === "phoneNum" ? (
                <Input
                  register={register("phoneNum", {
                    required: "필수 입력칸 입니다",
                  })}
                  isRequired
                  type="number"
                  outerLabel="휴대폰 번호"
                  name="login-phone"
                  leftInnerLabel="+82"
                />
              ) : null}

              <Button clickHandler={handleSubmit(onValid)}>
                {isLoading
                  ? "Loading..."
                  : method === "email"
                  ? "이메일로 로그인 링크 전송"
                  : method === "phoneNum"
                  ? "메세지로 1회용 비밀번호 전송"
                  : null}
              </Button>
            </form>
          </>
        )}

        <div className={"mt-8"}>
          <div className={"relative"}>
            <div className={"absolute w-full border-t border-gray-300"} />
            <div className={"relative -top-3 text-center"}>
              <span className={"bg-white px-2 text-sm text-gray-500"}>
                다른 로그인 방법
              </span>
            </div>
          </div>
          <div className={"grid grid-cols-2 mt-3 gap-3"}>
            <Button buttonType={"login"}>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Button>
            <Button buttonType={"login"}>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enter;
