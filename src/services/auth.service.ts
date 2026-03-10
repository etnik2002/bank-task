import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository";
import { env } from "../config/env";

export class AuthService {
    async authenticate(username: string, password: string): Promise<string | null> {
        const user = await userRepository.getByUsername(username);

        if (!user) {
            return null;
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            return null;
        }

        const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
            expiresIn: env.JWT_EXPIRES_IN as any,
        });

        return token;
    }
}

export const authService = new AuthService();
