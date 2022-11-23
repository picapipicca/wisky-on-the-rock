import type { NextPage } from "next";
import Layout from "@components/layout/layout";
import { Button } from "@components/atom";
import ItemLayout from "@components/item";
import useUser from "@libraries/client/useUser";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Item } from "@prisma/client";

interface ItemResponseWithLikeProps extends Item {
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
    <Layout title="홈" isTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className={"flex flex-col space-y-1 divide-y-[1px]"}>
        {data?.items?.map((item) => (
          <ItemLayout
            key={item.id}
            title={item.name}
            price={item.price}
            id={item.id}
            commentsNum={2}
            likeNum={item?._count.likes}
          />
        ))}
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

export default Home;
