import type { NextPage } from "next";
import { useEffect,useState } from "react";
import Layout from "@components/layout/layout";
import { Button, Input } from "@components/atom";
import { useForm, SubmitHandler } from "react-hook-form";
import useUser from "../../libraries/client/useUser";
import useMutation from "../../libraries/client/useMutation";


interface EditProfileReponseProps {
  ok: boolean;
  error: string;
}
interface EditProfileFormProps {
  avatarUrl?: FileList;
  name?: string;
  email?: string;
  phoneNum?: string;
  errorForm?: string;
}
const EditProfile: NextPage = () => {
  const { user } = useUser();
  const [previewAvatar,setPreviewAvatar] = useState("")
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<EditProfileFormProps>();

  useEffect(() => {
    if (user) {
      Object.entries(user).forEach(([name, value]: [name: any, value: any]) => {
        setValue(name, value);
      });
    }
    // if (user?.email) {
    //   setValue("email", user?.email);
    // }
    // if (user?.phoneNum) {
    //   setValue("phoneNum", user.phoneNum);
    // }
    // if (user?.name) {
    //   setValue("name", user.name);
    // }
  }, [user, setValue]);
  const watchAvatar = watch("avatarUrl");
  const [changeUserProfile, { isLoading, data }] =
    useMutation<EditProfileReponseProps>("/api/users/profile");

  const onValid: SubmitHandler<EditProfileFormProps> = (data) => {
    if (isLoading) return;
    if (data.email === "" && data.phoneNum === "" && data.name === "") {
      return setError("errorForm", {
        message: "이메일과 휴대폰 번호 중 하나는 필수로 입력해주세요.",
      });
    }
    changeUserProfile(data);
  };
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("errorForm", { message: data.error });
    }
  }, [data, setError]);
  useEffect(()=>{
    if(watchAvatar && watchAvatar.length !== 0){
      console.log(watchAvatar)
      const file = watchAvatar[0];
      setPreviewAvatar(URL.createObjectURL(file));
    }
  },[watchAvatar])

  return (
    <Layout goBackHandler>
      <form onSubmit={handleSubmit(onValid)} className={"px-4 space-y-4"}>
        <div className={"flex items-center space-x-6"}>
          {previewAvatar ? <img src={previewAvatar} className={"w-20 h-20 rounded-full bg-slate-200"} /> :<div className={"w-20 h-20 rounded-full bg-slate-200"} /> }
          <label
            htmlFor={"profile-img"}
            className={
              "cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 text-gray-700"
            }
          >
            프로필 변경
            <input
              {...register("avatarUrl")}
              id="profile-img"
              type={"file"}
              className={"hidden"}
              accept={"image/*"}
            />
          </label>
        </div>
        <Input outerLabel={"이름"} register={register("name")} type="text" />
        <Input
          outerLabel={"이메일"}
          register={register("email")}
          type="email"
        />
        <Input
          outerLabel={"휴대폰번호"}
          register={register("phoneNum")}
          type="number"
        />
        {errors.errorForm ? (
          <span className="my-2 text-red-500 font-medium text-center block">
            {errors.errorForm.message}
          </span>
        ) : null}
        <Button clickHandler={handleSubmit(onValid)}>
          {isLoading ? "...Loading..." : "프로필 업데이트"}
        </Button>
      </form>
    </Layout>
  );
};

export default EditProfile;
