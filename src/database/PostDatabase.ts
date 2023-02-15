import { PostDB, PostEditDB } from "../types";
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

    public getPostsWithUsers = async (q: string | undefined | unknown) => {
        
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

    public getPostsById = async (q: string | unknown) => {
        const postsDB = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select()
            .where({q})

        return postsDB
    }

    public getPostsByIdToEdit = async (id:string):Promise<PostDB| undefined> => {
        const [postsDB] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({id})

        return postsDB
    }


    public async insertPost(newPostDB: PostDB) {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(newPostDB)
    }

    public editPostbyId =async (id:string, toEdit:PostEditDB):Promise<void>=> {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .update(toEdit)
        .where({id})
    }
}