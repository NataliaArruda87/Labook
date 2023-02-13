import { PostDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase {
   public static TABLE_POSTS = "posts"
    
    public getAllPosts = async () => {
        const postsDB = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select()

        return postsDB
    }

    public getPostsWithUsers = async (q: string | undefined) => {
        
        let postsDB: PostDB[]
        if (q) {
            postsDB = await this.getPostsById(q)
        } else {
            postsDB = await this.getAllPosts()
        }

        const usersDB = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()

        return {
            postsDB,
            usersDB
        }
    }

    public getPostsById = async (q: string) => {
        const postsDB = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select()
            .where("id", "LIKE", `%${q}%`)

        return postsDB
    }
}