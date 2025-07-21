import { Link, useNavigate } from 'react-router-dom'
import s from './login.module.css'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from '../../api/api'
import { UserLogin, userLoginSchema } from '../../schemas/UserLoginSchema'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useUser } from '../../contexts/UserContext'

export default function Login() {
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useUser();
    
    const nav = useNavigate()

    const form = useForm({
        resolver: zodResolver(userLoginSchema)
    })

    async function ValidateUser(data: UserLogin) {
        try{
            const obj = {
                email : data.EmailOuUsuario,
                senha : data.Senha
            }

            const resp = await api.post('autenticacao/login', obj);
            console.log(resp.data)
            const userId = resp.data.token; 
            
            if(resp.status === 200 && userId !== 0){
                await login(userId);
                nav('/')
            } else {
                setErrorMessage('Usuário ou senha inválidos')
            }
        } catch(err: any) {
            if(err.response?.status === 404){
                setErrorMessage('Usuário ou senha inválidos')
            } else {
                form.setError('root', {
                    type: 'server',
                    message: 'Erro de servidor ao fazer login'
                })
            }
        }
    }

    return (
        <div className={s.loginContainer}>
            <h1 className={s.title}>Login</h1>

            <form onSubmit={form.handleSubmit(ValidateUser)}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <br></br>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="E-mail"  
                        {...form.register("EmailOuUsuario")}
                    />
                    {form.formState.errors.EmailOuUsuario && <span className={s.errorMessage}>{form.formState.errors.EmailOuUsuario.message}</span>}
                    <br></br>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Senha</label>
                    
                    <div className={s.passwordWrapper}>
                        <input 
                            type={showPassword ? "text" : "password"}
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder="Senha" 
                            {...form.register("Senha")}
                        />
                        <button 
                            type="button" 
                            className={s.showPasswordButton} 
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>
                
                    <Link className={s.senha_btn} to=''>Esqueci minha senha</Link>
                </div>

                {form.formState.errors.Senha && <span className={s.errorMessage}>{form.formState.errors.Senha.message}</span>}

                <div className={s.actionButtons}>
                    <button 
                        type="submit" 
                        className={`btn btn-primary ${s.entrar_btn}`}
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
                    </button>

                    <Link 
                        to='/cadastro'
                        className={`btn btn-outline-primary ${s.cadastrar_btn}`}
                        aria-disabled={form.formState.isSubmitting}
                    >
                        Cadastre-se
                    </Link>
                </div>

                {form.formState.errors.root && <span className={s.errorMessage}>{form.formState.errors.root.message}</span>}
                {errorMessage && <span className={s.errorMessage}>{errorMessage}</span>}
            </form>
        </div>
    )
}
