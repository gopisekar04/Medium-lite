import Header from "../components/Header";
import { useParams } from "react-router-dom";
import useBlog from "../hooks/useBlog";
import Avatar from "../components/Avatar";
import { fetchStatusCode } from "../hooks/useBlogs";

export default function Blog() {
  const { id } = useParams();

  const { blog, fetchStatus } = useBlog({ id: id || "" });

  return (
    <div>
      <Header />
      {fetchStatus === fetchStatusCode.success ? (
        <div className="grid grid-cols-12 px-10 lg:px-20 mt-16 mb-10">
          <div className="col-span-12 lg:col-span-8 lg:mr-20  ">
            <h1 className="text-3xl font-bold">{blog?.title}</h1>
            <div className="col-span-4 block lg:hidden mt-3">
              <h1>Author</h1>
              <div className=" mt-2 flex">
                <Avatar size="big" name={"blog?.author.name"} />
                <h1 className="ml-3">{blog?.author.name}</h1>
              </div>
              <p className="mt-3">
                A sample description about the author. Tech geek, nerd, frontend
                dev, backend dev
              </p>
            </div>
            <p className="mt-4">{blog?.content}</p>
          </div>
          <div className="col-span-4 hidden lg:block">
            <h1>Author</h1>
            <div className=" mt-2 flex">
              <Avatar size="big" name={"blog?.author.name"} />
              <h1 className="ml-3">{blog?.author.name}</h1>
            </div>
            <p className="mt-3">
              A sample description about the author. Tech geek, nerd, frontend
              dev, backend dev
            </p>
          </div>
        </div>
      ) : null}
      {fetchStatus === fetchStatusCode.loading ? <div>loading...</div> : null}
    </div>
  );
}
