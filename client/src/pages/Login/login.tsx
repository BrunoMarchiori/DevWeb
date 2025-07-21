import { Link, useNavigate } from 'react-router-dom'
import s from './login.module.css'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from '../../api/api'
import { UserLogin, userLoginSchema } from '../../schemas/UserLoginSchema'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';




export default function login() {
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    var nav = useNavigate()

    var form = useForm({
        resolver: zodResolver(userLoginSchema)
    })

    async function ValidateUser(data: UserLogin) {
        
        
        try{
            
            var obj = {
                    email : data.EmailOuUsuario,
                    senha : data.Senha
                }

            await api.post('autenticacao/login', obj)
            .then((resp) => {
                console.log(resp.data)
                    const userId = resp.data.token; 
                    localStorage.setItem('userId', userId);
                if(resp.status == 200){
                    nav('/')
                }
                
                
            }).catch((err) => {
                if(err.response.status == 404){
                    setErrorMessage('Usuário ou senha inválidos')
                }
            })
            
        }catch{
            
            form.setError('root', {
                type: 'server',
                message: 'Erro de servidor ao fazer login'
            })
        }
        

    }



    return (

        <div className={s.loginContainer}>
            <h1 className={s.title}>Login</h1>

            <form onSubmit={form.handleSubmit(ValidateUser)} action="" >
                
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <br></br>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="E-mail"  {...form.register("EmailOuUsuario")}/>
                    
                    
                    {form.formState.errors.EmailOuUsuario && <span className={s.errorMessage}>{form.formState.errors.EmailOuUsuario.message}</span>}
                    <br></br>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Senha</label>
                    
                    {/* 👇 NOVA DIV ENVOLVENDO O INPUT E O BOTÃO 👇 */}
                    <div className={s.passwordWrapper}>
                        <input 
                        type={showPassword ? "text" : "password"} // Lógica para mudar o tipo do input
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

          {/* 👇 NOVA DIV PARA AGRUPAR OS BOTÕES 👇 */}
          <div className={s.actionButtons}>

            {/* Botão de Entrar agora com as classes do Bootstrap */}
            <button 
              type="submit" 
              className={`btn btn-primary ${s.entrar_btn}`} // Adiciona btn e btn-primary
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>

            {/* O "Cadastre-se" agora é um Link estilizado como botão secundário */}
            <Link 
              to='/cadastro'
              className={`btn btn-outline-primary ${s.cadastrar_btn}`} // Estilo de botão vazado
              aria-disabled={form.formState.isSubmitting} // Para acessibilidade
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