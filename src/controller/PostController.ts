import { Request, Response } from "express"
import knex from 'knex'
import { PostBusiness } from "../business/PostBusiness"
import { CreateEditInput, CreatePostInput, GetPostInput, PostsDTO } from "../dtos/postDTO"

export class PostController {
    constructor(
        private postDto: PostsDTO,
        private postBusiness: PostBusiness
    ){}

    public getPosts = async (req: Request, res: Response) => {
        try {

            const input: GetPostInput = {
                q: req.query.q,
                token: req.headers.authorization
            }
         

            const output = await this.postBusiness.getPosts(input)

            res.status(200).send(output)
    
        } catch (error) {
            console.log(error)
        
            if (req.statusCode === 200) {
                res.status(500)
            }
        
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }          
        }
    }

    public createPosts = async (req: Request, res: Response) => {
        try {
            const input: CreatePostInput = {
                content: req.body.content,
                token: req.headers.authorization
            }

            const output = await this.postBusiness.createPost(input)

            res.status(201).send(output)
            
        } catch (error) {
            console.log(error)
        
            if (req.statusCode === 200) {
                res.status(500)
            }
        
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }          
        }
    }

    public editPost = async (req: Request, res: Response) => {
        try {
            const input = {
                data:this.postDto.CreatePostInputDTO(req.body.content, req.headers.authorization),
                id: req.params.id
            }

            const output = await this.postBusiness.editPost(input)

            res.status(201).send(output)
    
        } catch (error) {
            console.log(error)
        
            if (req.statusCode === 200) {
                res.status(500)
            }
        
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }          
        }
    }
}