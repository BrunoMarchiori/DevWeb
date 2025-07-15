import styles from "./login.module.css"; 

export default function Login() {

    return (
          
                

                    <div className={styles.loginContainer}>
                        <h1>Login</h1>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <br></br>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="E-mail"></input>
                                
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Senha</label>
                                <br></br>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Senha"></input>
                            </div>
                            <br></br>
                            <button type="submit" className="btn btn-primary">Entrar</button>
                        </form>
                    </div>
                

            
        
        
        
        


    )


}