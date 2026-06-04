import { UserRole } from "../../entities/UserRole";

export type GetUserResponse = {
    id: string;
    username: string;
    name: string;
    role: UserRole;
    active: boolean;
    createdAt: string;
    updatedAt: string;
};