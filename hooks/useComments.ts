import { useCallback, useEffect, useState } from "react";
import { getCachedComments } from "@/app/actions";
import { CommentsItemType } from "@/types/comments.type";

export const useComments = (initialLimit: number = 3) => {
  const [comments, setComments] = useState<CommentsItemType[]>([]);
  const [totalComments, setTotalComments] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [skip, setSkip] = useState<number>(0);

  const loadMoreComments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCachedComments({
        endpoint: "comments",
        limit: initialLimit,
        skip,
      });
      setComments((prevComments) => {
        const existingCommentIds = new Set(
          prevComments.map((comment) => comment.id)
        );
        const newComments = data.comments.filter(
          (comment) => !existingCommentIds.has(comment.id)
        );
        return [...prevComments, ...newComments];
      });
      setTotalComments(data.total);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [initialLimit, skip]);

  useEffect(() => {
    loadMoreComments();
  }, [loadMoreComments]);

  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + initialLimit);
    loadMoreComments();
  };

  return {
    comments,
    totalComments,
    loading,
    error,
    loadMoreComments,
    handleLoadMore,
  };
};
