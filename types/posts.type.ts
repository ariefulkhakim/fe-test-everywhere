export type PostItemType = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: ReactionType;
  views: number;
  userId: number;
};

export type ReactionType = {
  likes: number;
  dislikes: number;
};

export type PostRequestType = {
  endpoint: string;
  limit?: number;
  skip?: number;
  search?: string;
};

export type PostResponseType = {
  posts: PostItemType[];
  total: number;
  skip: number;
  limit: number;
};
