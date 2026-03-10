import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(1, "Korisnickoto ime e zadolzitelno"),
    password: z.string().min(1, "Lozinkata e zadolzitelna"),
});
