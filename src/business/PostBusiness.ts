import { createBrotliCompress } from "zlib"
import { PostDatabase } from "../database/PostDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { CreateEditInput, CreatePostInput, CreatePostOutput, GetPostInput, GetPostsOutput, PostsDTO } from "../dtos/postDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Post } from "../models/Post"
import { User } from "../models/User"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { PostEditDB, USER_ROLES } from "../types"

export class PostBusiness {
    constructor(
        private postDto: PostsDTO,
        private postDatabase: PostDatabase,
        private userDataBase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) {}

    public getPosts = async (input: GetPostInput): Promise<GetPostsOutput> => {
        
        const { q, token } = input

        if (typeof q !== "string" && q !== undefined) {
            throw new BadRequestError("'q' deve ser string ou undefined")
        }

        if (typeof token !== "string") {
            throw new BadRequestError("token está vazio")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token não é valido")
        }

        const {
            postsDB,
            usersDB
        } = await this.postDatabase.getPostsWithUsers(q)

        function getUser(userId: string) {
            const user = usersDB.find((userDB) => {
                return userDB.id === userId
            })  

            return {
                id: user.id,
                name: user.name
            }
        }

        const posts = postsDB.map((postDB) => {
            const post = new Post(
                postDB.id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at,
                getUser(postDB.creator_id)
            ) 

            return post.toBusinessModel()
        })

        return posts
        
    }

    public createPost = async (input: CreatePostInput): Promise<CreatePostOutput> => {
        
        const { content, token } = input

        if (typeof content !== "string") {
            throw new BadRequestError("'content' deve ser uma string")
        }

        if (content.length < 2) {
            throw new BadRequestError("'content' deve possuir pelo menos 2 caracteres")
        }

        if (typeof token !== "string") {
            throw new BadRequestError("token está vazio")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token não é valido")
        }

        const id = this.idGenerator.generate()


        const newPost = new Post(
            id,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload
        )

        
        const newPostDB = newPost.toDBModel()
        await this.postDatabase.insertPost(newPostDB)

        const output: CreatePostOutput = {
            message: "Post criado com sucesso",
            post: newPost.toBusinessModel()
        }

        return output

    }

    public editPost = async (input: { data: CreatePostInput, id: string }): Promise<CreatePostOutput> => {

        const postDB = await this.postDatabase.getPostsByIdToEdit(input.id)

        if (!postDB) {
            throw new NotFoundError("Post não encontrado")
        }

        const userDB = await this.userDataBase.getUsersById(postDB.creator_id)
        if (!userDB) {
            throw new NotFoundError("Erro ao procurar Id do criador do post")
        }

        const payload = this.tokenManager.getPayload(input.data.token)

        if (payload === null) {
            throw new BadRequestError("token não é valido")
        }

        const editedPost = new Post(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            userDB
        )

        editedPost.setContent(input.data.content)
        editedPost.setUpdatedAt(new Date().toISOString())
        const toEdit: PostEditDB = {
            content: editedPost.getContent(),
            updated_at: editedPost.getUpdatedAt()
        }

        await this.postDatabase.editPostbyId(editedPost.getId(), toEdit)

        const output: CreatePostOutput = {
            message: "Post editado com sucesso",
            post: editedPost.toBusinessModel()
        }
    
        return output

    }
        
}