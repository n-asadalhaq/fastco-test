import axios from 'axios';
import { PostItem } from './types';

// const baseURL = process.env.PART_5_BE_URL;
const baseURL = 'http://localhost:3333';

export const fetchPosts = (searchQuery: string) =>
  axios
    .get(`${baseURL}/posts${searchQuery ? `?search=${searchQuery}` : ''}`)
    .then((response) => response.data);

export const createPost = (postData: PostItem) =>
  axios.post(`${baseURL}/posts`, postData).then((response) => response.data);

export const updatePost = (postId: string, postData: PostItem) =>
  axios
    .put(`${baseURL}/posts/${postId}`, postData)
    .then((response) => response.data);

export const deletePost = (postId: string) =>
  axios.delete(`${baseURL}/posts/${postId}`).then((response) => response.data);
