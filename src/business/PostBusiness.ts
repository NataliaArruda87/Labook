import { PostDatabase } from "../database/PostDatabase"
import { Post } from "../models/Post"

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase
    ) {}

    public getPosts = async (q: string | undefined) => {

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
}