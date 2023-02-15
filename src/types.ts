export interface PostDB {
    id: string ,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator_id: string
}

export interface PostModel {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator: {
        id: string,
        name: string
    }
}

export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface UserModel {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    createdAt: string
}

export interface PostEditDB{
    content?:string,
    likes?:number,
    dislikes?:number,
    updated_at?:string
}
