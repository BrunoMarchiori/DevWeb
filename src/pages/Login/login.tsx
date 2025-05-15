import styles from "./login.module.css"; 

export default function Login() {

    return (
          
                

                    <div className={styles.loginContainer}>
                        <h1>Login</h1>
                        <form>
                            <div className={styles.input}>
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                            <div className={styles.input}>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" required />
                            </div>
                            <button type="submit">Login</button>
                        </form>
                    </div>
                

            
        
        
        
        


    )


}