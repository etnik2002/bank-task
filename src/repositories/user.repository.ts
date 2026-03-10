import fs from "fs/promises";
import path from "path";
import { User } from "../types";

const dataPath = path.join(__dirname, "../data/users.json");

export class UserRepository {
    private async readData(): Promise<User[]> {
        try {
            const data = await fs.readFile(dataPath, "utf-8");
            return JSON.parse(data) as User[];
        } catch {
            return [];
        }
    }

    async getByUsername(username: string): Promise<User | null> {
        const users = await this.readData();
        return users.find((u) => u.username === username) || null;
    }
}

export const userRepository = new UserRepository();
