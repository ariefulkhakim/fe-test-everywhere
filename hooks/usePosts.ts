import { useEffect, useState } from "react";
import { getCachedData, fetchDataDetail } from "@/app/actions";
import { PostItemType } from "@/types/posts.type";

const POSTS_PER_PAGE = 6;

export const usePosts = (initialPage: number = 1) => {
  const [posts, setPosts] = useState<PostItemType[]>([]);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await getCachedData({
          endpoint: "posts",
          limit: POSTS_PER_PAGE,
          skip: (currentPage - 1) * POSTS_PER_PAGE,
        });
        setPosts(data.posts);
        setTotalPosts(data.total);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return { posts, totalPages, currentPage, loading, error, handlePageChange };
};

export const usePostDetail = (id: number) => {
  const [post, setPost] = useState<PostItemType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPostDetail = async () => {
      setLoading(true);
      try {
        const data = await fetchDataDetail({ id, endpoint: "posts" });
        setPost(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    getPostDetail();
  }, [id]);

  return { post, loading, error };
};
