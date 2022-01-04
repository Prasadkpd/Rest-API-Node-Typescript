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
  })
}

export default {getPosts, getPost}