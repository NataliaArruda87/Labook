import { Request, Response } from "express"
import knex from 'knex'
import { PostBusiness } from "../business/PostBusiness"

export class PostController {
    constructor(
        private postBusiness: PostBusiness
    ){}

    public getPosts = async (req: Request, res: Response) => {
        try {

            const q = req.query.q as string | undefined

            const output = await this.postBusiness.getPosts(q)

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
}