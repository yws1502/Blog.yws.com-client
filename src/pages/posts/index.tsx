import useSWR from "swr";
import { NextPage } from "next";
import { PostData } from "../../types/Post";
import { fetcher } from "../../utils/fetcher";
import { MDViewer } from "../../components/MDViewer";

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
            <MDViewer
              key={`posts-${id}`} 
              title={title}
              contents={contents}
              author={author}
            />
        )
      })}
    </div>
  )
}

export default PostPage;