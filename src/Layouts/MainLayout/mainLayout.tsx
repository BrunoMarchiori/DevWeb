import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import { Outlet } from "react-router-dom";
import styles from "./mainLayout.module.css"; // Importando o CSS do MainLayout

export default function MainLayout(){
    return(
        <>
        <Header />
        <main className={styles.main}>
            <Outlet />
        </main>
        <Footer />
        </>
    )
}