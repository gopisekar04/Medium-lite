import axios from "axios";
import Header from "../components/Header";
import { useState } from "react";
import { CreateBlogInput } from "@gopi_0104/medium-common/dist";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = process.env.BACKEND_URL;

export default function Publish() {
  const navigate = useNavigate();
  const [newBlog, setNewBlog] = useState<CreateBlogInput>({
    title: "",
    content: "",
  });
  const publishBlog = async () => {
    const url = `${BACKEND_URL}/api/v1/blog`;

    if (newBlog.title !== "" && newBlog.content !== "") {
      const res = await axios.post(
        url,
        {
          ...newBlog,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      if (res.data.id) {
        navigate(`/blog/${res.data.id}`);
      }
    }
  };
  return (
    <div>
      <Header />
      <div className="px-10 lg:px-20 mt-12">
        <input
          type="text"
          className="bg-gray-50 text-gray-900 text-2xl font-bold font-serif border-l-2 border-l-slate-400 outline-none  block w-full p-2.5 "
          placeholder="Title"
          required
          onChange={(e) => {
            setNewBlog({
              ...newBlog,
              title: e.target.value,
            });
          }}
        />
        <textarea
          id="message"
          rows={16}
          className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 outline-none   border-gray-300 "
          placeholder="Write your thoughts here..."
          onChange={(e) => {
            setNewBlog({
              ...newBlog,
              content: e.target.value,
            });
          }}
        ></textarea>
        <button
          onClick={publishBlog}
          type="submit"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg mt-3 hover:bg-blue-800"
        >
          Publish blog
        </button>
      </div>
    </div>
  );
}
