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
              <Avatar size="big" name={blog?.author.name || "Anonymous"} />
              <h1 className="ml-3">{blog?.author.name}</h1>
            </div>
            <p className="mt-3">
              A sample description about the author. Tech geek, nerd, frontend
              dev, backend dev
            </p>
          </div>
        </div>
      ) : null}
      {fetchStatus === fetchStatusCode.loading ? (
        <>
          <div className="grid grid-cols-12 px-10 lg:px-20 mt-16 mb-10 animate-pulse">
            <div className="col-span-12 lg:col-span-8 lg:mr-20">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="col-span-4 block lg:hidden mt-3">
                <div className="bg-gray-200 rounded h-6 w-16"></div>
                <div className="mt-2 flex">
                  <div className="bg-gray-200 rounded-2xl w-8 h-8"></div>
                  <div className="ml-3 bg-gray-200 rounded h-6 w-16"></div>
                </div>
                <div className="mt-3 bg-gray-200 rounded h-6 w-full"></div>
              </div>
              <div className="mt-4 bg-gray-200 rounded h-60 w-full"></div>
            </div>
            <div className="col-span-4 hidden lg:block">
              <div className="bg-gray-200 rounded h-4 w-16"></div>
              <div className="mt-2 flex">
                <div className="bg-gray-200 rounded-2xl w-8 h-8"></div>
                <div className="ml-3 bg-gray-200 rounded h-6 w-16"></div>
              </div>
              <div className="mt-3 bg-gray-200 rounded h-6 w-full"></div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
