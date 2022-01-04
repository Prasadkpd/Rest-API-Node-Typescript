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

export default {getPosts}