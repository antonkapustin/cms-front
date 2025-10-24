import { User } from "./user.interface"

export interface LoginResponse {
    login: {
        access_token: string,
        user: User
    }
}