import express, { Request, Response } from "express";
import knex from "knex";
import { PostBusiness } from "../business/PostBusiness";
import { PostController } from "../controller/PostController";
import { PostDatabase } from "../database/PostDatabase";

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase()
    )
    
)

postRouter.get('/', postController.getPosts)