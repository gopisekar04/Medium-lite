import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";
import { BACKEND_URL } from "../config";
import useBlogs, { fetchStatusCode } from "../hooks/useBlogs";
import { useEffect } from "react";
import MyLoader from "../components/MyLoader";

export default function Blogs() {
  const navigate = useNavigate();
  const { blogs, fetchStatus } = useBlogs(`${BACKEND_URL}/api/v1/blog/bulk`);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      navigate("/signin");
    }
  });

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center">
        {fetchStatus === fetchStatusCode.success
          ? blogs.map((eachBlog) => (
              <BlogCard
                key={eachBlog.id}
                id={eachBlog.id}
                authorName={eachBlog.author.name}
                title={eachBlog.title}
                content={eachBlog.content}
                publishedDate={"4th Feb 2021"}
              />
            ))
          : ""}

        {fetchStatus === fetchStatusCode.loading ? (
          <>
            <MyLoader />
            <MyLoader />
            <MyLoader />
            <MyLoader />
            <MyLoader />
          </>
        ) : null}
      </div>
    </div>
  );
}
