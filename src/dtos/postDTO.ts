import { BadRequestError } from "../errors/BadRequestError";
import { PostModel } from "../types";

export interface GetPostInput {
    q: unknown
    token: string | undefined
}

export type GetPostsOutput = PostModel[]

export interface CreatePostInput {
    content: string,
    token: string | undefined
}

export interface CreateEditInput {
    content: unknown,
    token: string | undefined,
    id: string
}


export interface CreatePostOutput {
    message: string,
    post: PostModel
}

export class PostsDTO {

    public CreatePostInputDTO = (
        content:unknown,
        token:unknown
        ):CreatePostInput => { 

        if(typeof content!=='string')
        {throw new BadRequestError('Content deve ser uma string')}
        
        if(typeof token !== 'string')
        {throw new BadRequestError('token invalida')}
        
        const dto : CreatePostInput = {
            content,
            token
        }
        return dto
    }

}