import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { BsDot } from "react-icons/bs";

interface BlogCardType {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export default function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardType) {
  return (
    <Link to={`/blog/${id}`} className="w-full lg:w-6/12">
      <div className="mt-3 border-b-2 p-2 w-full">
        <div className="mr-2 flex items-center">
          <div className="mr-2">
            <Avatar name={authorName} size={"small"} />
          </div>
          <h1>{authorName}</h1>
          <BsDot />
          <p className="text-sm font-light">{publishedDate}</p>
        </div>
        <h1 className="font-bold text-xl mt-1">{title}</h1>
        <p className="text-base">{content.slice(0, 100) + "..."}</p>
        <p className="mr-4 font-light mt-2 text-sm">
          {Math.ceil(content.length / 100) + " minute(s) read"}
        </p>
      </div>
    </Link>
  );
}
