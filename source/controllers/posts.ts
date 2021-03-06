import {Request, Response} from "express";
import axios, {AxiosResponse} from 'axios';

interface Post {
  userId: number,
  id: number,
  title: string,
  body: string
}

//getting all posts
const getPosts = async (request: Request, response: Response) => {
  //get some posts
  let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
  let post: Post = result.data;
  return response.status(200).json({
    message: post
  });
};

const getPost = async (request: Request, response: Response) => {
  //get the post id from the Request
  let id: string = request.params.id;
  // get the post
  let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  let post: Post = result.data;
  return response.status(200).json({
    message: post
  });
};

//updating a post
const updatePost = async (request: Request, response: Response) => {
  //get the post id from the Request
  let id: string = request.params.id;
  //get the data from Request Body
  let title: string = request.body.title ?? null;
  let body: string = request.body.body ?? null;
  //update the post
  let result: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    ...(title && {title}),
    ...(body && {body})
  });
  // return response
  return response.status(200).json({
    message: result.data
  })
}

//deleting a post
const deletePost = async (request: Request, response: Response) => {
  //get the post id from the Request
  let id: string = request.params.id;
  //delete the post
  let result: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  // return response
  return response.status(200).json({
    message: 'Post deleted successfully'
  });
};

//adding a post
const addPost = async (request: Request, response: Response) => {
  //get the data from request body
  let title: string = request.body.title;
  let body: string = request.body.body;
  //add the post
  let result: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
    title,
    body
  });
  //return result
  return response.status(200).json({
    message: result.data
  });
};
export default {getPosts, getPost, updatePost, deletePost, addPost};