import Layout from "@components/layout/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";

interface PostProps {
  title: string;
  date: string;
  category: string;
}

const Blog: NextPage<{ posts: PostProps[] }> = ({ posts }) => {
  return (
    <Layout seoTitle="블로그" title="Blog">
      <h1 className="font-semibold text-center text-xl mt-5 mb-10">최근 게시글</h1>
      <ul>
      {posts.map((post, idx) => (
        <div key={idx} className="mb-5">
          <span className="text-lg text-red-500">{post.title}</span>
          <div>
            <span>
              {post.date} / {post.category}
            </span>
          </div>
        </div>
      ))}
      </ul>
    </Layout>
  );
};

export async function getStaticProps() {
  const blogPosts = readdirSync("./posts").map((file) => {
    const content = readFileSync(`./posts/${file}`, "utf-8");
    return matter(content).data;
  });
  console.log(blogPosts);
  return {
    props: {
      posts: blogPosts.reverse(),
    }, // will be passed to the page component as props
  };
}

export default Blog;
