import { CommentRequestType, CommentResponseType } from "@/types/comments.type";
import {
  PostItemType,
  PostRequestType,
  PostResponseType,
} from "@/types/posts.type";
import { cache } from "react";

// URL API dasar yang akan digunakan
const API_BASE_URL = "https://dummyjson.com";

// Fungsi untuk menangani fetch data
export const fetchData = async ({
  endpoint,
  limit,
  search = "",
  skip,
}: PostRequestType): Promise<PostResponseType> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${endpoint}?limit=${limit}&skip=${skip}&search=${search}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data: PostResponseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching data");
  }
};

export const fetchDataDetail = async ({
  id,
  endpoint,
}: {
  id: number;
  endpoint: string;
}): Promise<PostItemType> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data: PostItemType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching data");
  }
};

export const fetchComments = async ({
  endpoint,
  limit,
  skip,
  postId,
}: CommentRequestType): Promise<CommentResponseType> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${endpoint}?limit=${limit}&skip=${skip}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data: CommentResponseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching data");
  }
};

// Menggunakan cache untuk menyimpan hasil fetch data
export const getCachedData = cache(fetchData);

export const getCachedComments = cache(fetchComments);
