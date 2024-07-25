import Loading from "@/components/reusable/Loading";
import { useComments } from "@/hooks/useComments";
import React from "react";

const CommentsItem = () => {
  const {
    comments,
    loading,
    loadMoreComments,
    error,
    totalComments,
    handleLoadMore,
  } = useComments();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!comments) {
    return <div>No post found</div>;
  }
  return (
    <div className="container mx-auto mb-6">
      <h2 className="text-2xl font-semibold mt-8 mb-4">Comments</h2>
      {error && <div>Error: {error}</div>}
      {loading && <div>Loading comments...</div>}
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="p-4 border rounded-sm bg-gray-100">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">{comment.user.fullName}</p>
              <p className="text-sm">Likes: {comment.likes}</p>
            </div>
            <p className="text-lg mt-3">{comment.body}</p>
          </li>
        ))}
      </ul>
      {comments.length < totalComments && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-slate-900 text-white rounded-md shadow-md text-md"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentsItem;
