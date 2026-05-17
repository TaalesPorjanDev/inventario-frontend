import { z } from 'zod';

export const registerSchema = z.object({
    fullName: z.string().min(4, "Nome muito curto"),
    email: z.string().email({ message: "E-mail inválido"}),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"]
})