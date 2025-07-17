import { z } from 'zod';

export const usuarioSchema = z.object({
  nome: z
    .string()
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres')
    .nonempty('O nome é obrigatório'),
  
  endereco: z
    .string()
    .max(255, 'O endereço deve ter no máximo 255 caracteres')
    .nonempty('O endereço é obrigatório'),
  
  telefone: z
    .string()
    .regex(/^\d{10,11}$/, 'Telefone deve ter 10 ou 11 dígitos')
    .nonempty('O telefone é obrigatório'),
  
  email: z
    .string()
    .email('Email deve ter um formato válido')
    .nonempty('O email é obrigatório'),
  
  senha: z
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .nonempty('A senha é obrigatória'),
  
  confirmaSenha: z
    .string()
    .nonempty('A confirmação de senha é obrigatória')
}).refine((data) => data.senha === data.confirmaSenha, {
  message: 'As senhas não coincidem',
  path: ['confirmaSenha'],
});

export type UsuarioFormData = z.infer<typeof usuarioSchema>;

// Tipo para envio ao servidor (com telefone convertido para número)
export type UsuarioRegistroData = Omit<UsuarioFormData, 'telefone'> & {
  telefone: number;
};
