import { UserType } from "./users.type";

export type CommentsItemType = {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: UserType;
};

export type CommentRequestType = {
  endpoint: string;
  limit?: number;
  skip?: number;
  postId?: number;
};

export type CommentResponseType = {
  comments: CommentsItemType[];
  total: number;
  skip: number;
  limit: number;
};
