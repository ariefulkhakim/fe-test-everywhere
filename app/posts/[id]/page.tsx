"use client";
import CommentsItem from "@/components/page/posts/CommentsItem";
import Loading from "@/components/reusable/Loading";
import { usePostDetail } from "@/hooks/usePosts";
import Image from "next/image";
import React from "react";

import IconEye from "@/public/assets/icons/eye.svg";
import IconThumbsUp from "@/public/assets/icons/thumbs-up.svg";
import IconThumbsDown from "@/public/assets/icons/thumbs-down.svg";
import IconTag from "@/public/assets/icons/tag.svg";

const PostID = ({ params }: { params: { id: string } }) => {
  const postId = parseInt(params.id, 10);

  const { post, loading, error } = usePostDetail(postId);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>No post found</div>;
  }
  return (
    <div className="container mx-auto mt-6 p-4 pt-0">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center space-x-4 text-gray-600 mb-6">
        <div className="flex items-center gap-2">
          <Image src={IconEye} alt="icon-eye" width={16} height={16} />
          <span>{post.views} views </span>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={IconThumbsUp}
            alt="icon-thumbs-up"
            width={16}
            height={16}
          />
          <span>{post.reactions.likes} likes</span>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={IconThumbsDown}
            alt="icon-thumbs-down"
            width={16}
            height={16}
          />
          <span>{post.reactions.dislikes} dislikes</span>
        </div>
      </div>
      <p className="text-gray-800 mb-5 leading-8">{post.body}</p>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm gap-2"
          >
            <Image src={IconTag} alt="icon-tag" width={12} height={12} />
            <span>{tag}</span>
          </div>
        ))}
      </div>

      <CommentsItem />
    </div>
  );
};

export default PostID;
