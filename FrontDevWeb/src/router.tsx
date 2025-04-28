import Home from "./pages/HomePage/home";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout/mainLayout";
import ProductDetail from "./pages/ProductDetails/product-detail";
import Login from "./pages/Login/login";

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
            }
        ]
        
    }])

export default router;