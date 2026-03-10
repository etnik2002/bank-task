import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { loginSchema } from "../schemas/auth.schema";

export class AuthController {
    async login(req: Request, res: Response): Promise<void> {
        try {
            const parsedBody = loginSchema.safeParse(req.body);

            if (!parsedBody.success) {
                res.status(400).json({ error: "Nevalidni podatoci", details: parsedBody.error.format() });
                return;
            }

            const { username, password } = parsedBody.data;
            const token = await authService.authenticate(username, password);

            if (!token) {
                res.status(401).json({ error: "Pogresno korisnicko ime ili lozinka" });
                return;
            }

            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: "Vnatresna serverska greska" });
        }
    }
}

export const authController = new AuthController();
