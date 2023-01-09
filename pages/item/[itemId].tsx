import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import Layout from "@components/layout/layout";
import { Item, User } from "@prisma/client";
import useMutation from "@libraries/client/useMutation";
import { cls } from "@libraries/client/utils";
import useUser from "../../libraries/client/useUser";
import Image from "next/image";


//mutate: bound(지금화면에서 데이터 변경), unbound(다른화면의 데이터 변경)

interface ItemWithUserProfile extends Item {
  user: User;
}
interface ItemDetailResponseProps {
  ok: boolean;
  item: ItemWithUserProfile;
  relatedItems: Item[];
  isLike: boolean;
}
const ItemDetail: NextPage = () => {
  const { isLoading, user } = useUser();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponseProps>(
    router.query.itemId ? `/api/items/${router.query.itemId}` : null
  );
  const [toggleLike] = useMutation(`/api/items/${router.query.itemId}/like`);
  const clickLike = () => {
    if (!data) return;
    boundMutate({ ...data, isLike: !data.isLike }, false);
    // boundMutate((prev) => prev && { ...prev, isLike: !prev.isLike }, false);
    // mutate("/api/users/userProfile", (prev: any) => ({ ok: !prev.ok }), false);
    toggleLike({});
  };
  return (
    <Layout goBackHandler seoTitle="상품 상세">
      <div className={"px-4 py-4"}>
        <div className={"mb-8"}>
        <div className="relative pb-80"><Image src={`https://imagedelivery.net/zhbr1LNZLH9IvC2xyaJjWQ/${data?.item.imageUrl}/public`} className={"h-96 bg-slate-300 object-cover"} fill alt="item"/></div>
          {/*user Profile*/}
          <div className={"flex py-3 border-t border-b items-center space-x-3"}>
            {/*user Avatar*/}
            <Image width={48} height={48} src={`https://imagedelivery.net/zhbr1LNZLH9IvC2xyaJjWQ/${data?.item?.user?.avatarUrl}/avatar`} className={"w-12 h-12 rounded-full bg-slate-300"} alt="avatar"/>
            <div>
              <p className={"text-sm font-medium text-gray-700"}>
                {data?.item?.user?.name}
              </p>
              <Link
                legacyBehavior
                href={`/users/profiles/${data?.item?.user?.id}`}
              >
                <a
                  className={"text-xs cursor-pointer font-medium text-gray-500"}
                >
                 프로필 보기 &rarr;
                </a>
              </Link>
            </div>
          </div>

          {data?.item ? (
            <div className={"mt-5"}>
              <h1 className={"text-3xl font-bold text-gray-900"}>
                {data?.item?.name}
              </h1>
              <p className={"text-3xl mt-3 text-gray-900 block"}>
                {data?.item?.price} 원
              </p>
              <p className={"text-base my-6 text-gray-700"}>
                {data?.item?.description}
              </p>
              <div className={"flex items-center justify-between space-x-2"}>
                <button
                  className={
                    "flex-1 bg-emerald-600 text-white py-3 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 hover:bg-emerald-700"
                  }
                >
                  판매자와 대화하기
                </button>
                <button
                  onClick={clickLike}
                  className={cls(
                    "p-3 flex items-center justify-center hover:bg-gray-100rounded-md",
                    data?.isLike
                      ? "text-red-500 hover:text-red-600"
                      : "text-gray-400 hover:text-gray-500"
                  )}
                >
                  {data?.isLike ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ) : (
            "...Loading"
          )}
        </div>
        <div>
          <h2 className={"text-2xl font-bold text-gray-900"}>비슷한 상품</h2>
          <div className={"mt-6 grid grid-cols-2 gap-4"}>
            {data?.relatedItems?.map((item) => (
              <Link legacyBehavior key={item.id} href={`/item/${item.id}`}>
                <div key={item.id}>
                  <div className={"h-56 mb-4 w-full bg-slate-300"} />
                  <h3 className={"text-gray-700 -mb-1"}>{item.name}</h3>
                  <p className={"text-xs font-medium text-gray-900"}>
                    {item.price}원
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
