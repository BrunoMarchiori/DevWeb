import { z } from "zod";

export const userLoginSchema = z.object({
    EmailOuUsuario: z.string().nonempty('O e-mail ou Usuário não pode ser vazio').refine((value) => {
        const emailSchema = z.string().email();
        const usernameSchema = z.string().regex(/^[a-zA-Z0-9_ ]+$/)
        return  emailSchema.safeParse(value).success|| usernameSchema.safeParse(value).success;
    },
    {
        message: "O usuário não deve conter espaços ou acentos ou o e-mail deve ser válido"
    }
),
    Senha: z.string().nonempty('A senha não pode ser vazia').min(6, 'A senha deve ter no mínimo 6 caracteres')
})

export type UserLogin = z.infer<typeof userLoginSchema>

