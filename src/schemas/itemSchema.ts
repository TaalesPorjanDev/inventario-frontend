import { z } from 'zod'

export const itemSchema = z.object({
    nome: z.string().min(3, "Nome deve ter no minimo 3 caracteres"),
    categoria: z.string().min(1,"Categoria é Obrigatório"),
    local: z.string().min(1,"Local é Obrigatório"),
    observacao: z.string().optional(),
    imageUrl: z.string().optional(),
})