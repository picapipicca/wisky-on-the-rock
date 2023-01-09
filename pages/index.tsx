import type { NextPage } from "next";
import Layout from "@components/layout/layout";
import { Button } from "@components/atom";
import ItemLayout from "@components/item";
import useUser from "@libraries/client/useUser";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import { Item } from "@prisma/client";
import client from "@libraries/server/client";

export interface ItemResponseWithLikeProps extends Item {
  _count: {
    likes: number;
  };
}
interface itemResponseTypeProps {
  ok: boolean;
  items: ItemResponseWithLikeProps[];
}

const Home: NextPage = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const { data } = useSWR<itemResponseTypeProps>("/api/items");

  return (
    <Layout title="홈" isTabBar seoTitle="당신곁의 친구">
      <Head>
        <title>Home</title>
      </Head>
      <div className={"flex flex-col space-y-1 divide-y-[1px]"}>
        {data
          ? data?.items?.map((item) => (
              <ItemLayout
                key={item.id}
                title={item.name}
                price={item.price}
                id={item.id}
                likeNum={item?._count?.likes}
              />
            ))
          : "Loading..."}
        <Button
          buttonType={"float"}
          clickHandler={() => {
            router.push("/items/create");
          }}
        >
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </Button>
      </div>
    </Layout>
  );
};

const Page: NextPage<{items:ItemResponseWithLikeProps[]}> = ({items}) => {
  return (
      <SWRConfig value={{
        fallback:{
          "/api/items" :{
            ok:true,
            items,
          }
        }
      }}>
        <Home />
      </SWRConfig>
    );
};

export async function getServerSideProps() {
  const items = await client.item.findMany({});

  return {
    props: {
      //여기의 데이터가 컴포넌트 안의 prop으로 제공됨
      items:JSON.parse(JSON.stringify(items)),
    },
  };
}
export default Page;
