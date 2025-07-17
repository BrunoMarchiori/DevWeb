import Home from "./pages/HomePage/home";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout/mainLayout";
import ProductDetail from "./pages/ProductDetails/product-detail";
import Login from "./pages/Login/login";
import Carrinho from "./pages/Carrinho/carrinho";
import Cadastro from "./pages/Cadastro/cadastro";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/product/:id',
                element: <ProductDetail></ProductDetail>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/cadastro',
                element: <Cadastro></Cadastro>
            },
            {
                path: '/carrinho',
                element: <Carrinho></Carrinho>
            }
        ]
        
    }])

export default router;