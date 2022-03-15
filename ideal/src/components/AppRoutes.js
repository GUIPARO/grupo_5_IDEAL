import Main from "./Main";
import ProductsList from "./ProductsList"
import { Route, Routes} from 'react-router-dom';

function AppRoutes () {
    return (
        <Routes>
            <Route path="/" exact="true" element={<Main />}></Route>
            <Route path="/products" element={<ProductsList />}></Route>
        </Routes>
    )
}

export default AppRoutes;