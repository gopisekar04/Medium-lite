import { useState, useEffect } from "react";
import axios from "axios";

export const fetchStatusCode = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

export default function useBlogs(url: string) {
  const [blogs, setBlog] = useState<Blog[]>([]);
  const [fetchStatus, setFetchStatus] = useState(fetchStatusCode.initial);

  useEffect(() => {
    setFetchStatus(fetchStatusCode.loading);
    const fetchBlogs = async () => {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      if (res) {
        const { blogs } = res.data;
        setBlog(blogs);
        setFetchStatus(fetchStatusCode.success);
      } else {
        setFetchStatus(fetchStatusCode.failure);
      }
    };
    fetchBlogs();
  }, [url]);

  return { blogs, fetchStatus };
}
