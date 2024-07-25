"use client";
import Loading from "@/components/reusable/Loading";
import Pagination from "@/components/reusable/Pagination";
import { usePosts } from "@/hooks/usePosts";
import Link from "next/link";
import React from "react";

const PostItem = () => {
  const { posts, totalPages, currentPage, loading, error, handlePageChange } =
    usePosts();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-6">
      <ul className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        {posts.map((post) => (
          <li
            key={post.id}
            className="p-4 border border-transparent bg-zinc-100 rounded-xl px-6"
          >
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            </Link>
            <p className="text-gray-600 leading-7">
              {post.body.length > 200
                ? `${post.body.substring(0, 200)}...`
                : post.body}
            </p>
            <Link href={`/posts/${post.id}`}>
              <div className="text-white mt-4 inline-block bg-slate-800 px-4 py-2 text-[14px] rounded-lg">
                Read more
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-8">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PostItem;
