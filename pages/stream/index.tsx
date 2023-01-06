import type { NextPage } from "next";
import Layout from "@components/layout/layout";
import { Button } from "@components/atom";
import Link from "next/link";
import useSWR from "swr";
import { useEffect } from "react";
import { Stream } from "@prisma/client";
import streams from "pages/api/streams";
import Image from "next/image";

interface LiveListResponseProps {
  ok: boolean;
  streams: Stream[];
}

const Streams: NextPage = () => {
  const { data } = useSWR<LiveListResponseProps>(`/api/streams`);
  useEffect(() => {
    if (data && !data.ok) {
      return;
    }
  }, [data]);
  
  return (
    <Layout title={"라이브"} isTabBar>
      <div className={"space-y-4 divide-y-2 pb-4"}>
        {data?.streams?.map((stream) => (
          <Link legacyBehavior href={`/stream/${stream.id}`} key={stream.id}>
            <a className={"pt-4 px-4"}>
              <div  className={"w-full relative overflow-hidden rounded-md shadow-sm bg-slate-300 aspect-video"}> 
              <Image
               src={`https://videodelivery.net/${stream?.cloudFlareId}/thumnails/thumnail.jpg?height=320`}
               fill
               alt="thumnails"
              />
              </div>
              <h3 className={"text-gray-700 text-lg font-bold mt-2"}>{stream.name}</h3>
            </a>
          </Link>
        ))}
        <Link legacyBehavior href={"/stream/create"}>
          <a>
            <Button buttonType={"float"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin={"round"}
                  strokeWidth={"2"}
                  d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </Button>
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default Streams;
