import { LikeDislikeDB, PostDB, PoststWithCreatorDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase {
   public static TABLE_POSTS = "posts"
   public static TABLE_LIKE_DISLIKES = "likes_dislikes"
    
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


    public findById = async (id: string): Promise<PostDB | undefined> => {
        const result: PostDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select()
        .where({ id })

        return result[0]
    }

    public async insertPost(newPostDB: PostDB) {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .insert(newPostDB)
    }

    public updatePost = async (id: string, postDB: PostDB):Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .update(postDB)
            .where({ id })
    }

    public deletePost = async (id: string): Promise<void> => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .delete()
        .where({ id })
    }

    public likeDislikePost = async (likeDislike: LikeDislikeDB): Promise<void> => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_LIKE_DISLIKES)
        .insert(likeDislike)
    }

    public findPostWithCreatorById = async (
        postId: string
    ): Promise<PoststWithCreatorDB | undefined> => {
        const result: PoststWithCreatorDB[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                "posts.id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "posts.creator_id",
                "users.name AS creator_name"
            )
            .join("users", "posts.creator_id", "=", "users.id")
            .where("posts.id", postId)
        
        return result[0]
    }
}