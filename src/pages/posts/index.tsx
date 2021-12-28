import useSWR from "swr";
import { NextPage } from "next";
import { PostData } from "../../types/Post";
import { fetcher } from "../../utils/fetcher";
import { marked } from "marked";

const PostPage: NextPage = () => {
  const {data, error } = useSWR("http://localhost:1337/api/posts/", fetcher);

  if (error) return <div>Failed Loading...</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      {data.data.map((postdata: PostData) => {
        const { attributes, id } = postdata;
        const { title, contents, author } = attributes;
        return (
          <div key={`posts-${id}`}>
            <article>
              <h1>{title}</h1>
              <p>작성자 : {author}</p>
              <div dangerouslySetInnerHTML={
                { __html: marked(contents)}
              }></div>
            </article>
          </div>
        )
      })}
    </div>
  )
}

export default PostPage;