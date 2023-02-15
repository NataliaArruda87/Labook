import express from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostController } from "../controller/PostController";
import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { PostsDTO } from "../dtos/postDTO";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const postRouter = express.Router()

const postController = new PostController(
    new PostsDTO,
    new PostBusiness(
        new PostsDTO,
        new PostDatabase(),
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager()
    )  
)

postRouter.get('/', postController.getPosts)
postRouter.post("/", postController.createPosts)
postRouter.post('/:id', postController.editPost)