import { useState, useEffect } from "react";
import { Blog } from "./useBlogs";
import { fetchStatusCode } from "./useBlogs";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function useBlog({ id }: { id: string }) {
  const [blog, setBlog] = useState<Blog>();
  const [fetchStatus, setFetchStatus] = useState(fetchStatusCode.initial);

  useEffect(() => {
    setFetchStatus(fetchStatusCode.loading);
    const fetchBlogs = async () => {
      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      if (res) {
        const { blog } = res.data;
        setBlog(blog);
        setFetchStatus(fetchStatusCode.success);
      } else {
        setFetchStatus(fetchStatusCode.failure);
      }
    };
    fetchBlogs();
  }, [id]);

  return { blog, fetchStatus };
}
