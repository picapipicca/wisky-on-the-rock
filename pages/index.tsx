import type { NextPage } from "next";
import Layout from "@components/layout/layout";
import {Button} from "@components/atom";
import Item from "@components/item";

const Home: NextPage = () => {
  return (
      <Layout title="홈" isTabBar>
          <div className={"flex flex-col space-y-1 divide-y-[1px]"}>
              {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
                  <Item key={i} title={"임영웅 포스터 대형"} price={20000} id={23} commentsNum={2} likeNum={1}/>
              ))}
              <Button buttonType={"float"}>
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