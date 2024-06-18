import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import PageNav from "./components/PageNav";
import CityList from "./components/CityList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />} >
          <Route index element={<Navigate to="cities" />} />
          <Route path="cities" element={<CityList />} />
          <Route path="countries" element={<p>
            List of countries
          </p>} />
          <Route path="form" element={<p>
            Form
          </p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
