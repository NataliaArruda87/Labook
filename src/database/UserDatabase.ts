import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
   public static TABLE_USERS = "users"
    
    public getAllUsers = async () => {
        const userDB = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()

        return userDB
    }

    public getUsersById = async (q: string) => {
        const userDB = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where("id", "LIKE", `%${q}%`)

        return userDB
    }
}