import { Routes, Route } from 'react-router-dom'
import Home from '../Home';
import ProductCatalog from '../pages/ProductCatalog';
import ProductPage from '../pages/ProductPage';
import BrandCatalog from '../pages/BrandCatalog';
import AddReview from '../pages/AddReview';
import AddSupplement from '../pages/AddSupplement';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/brands" element={<BrandCatalog />} />
      <Route path="/products/:brandId" element={<ProductCatalog />} />
      <Route path="/product/:supplementId" element={<ProductPage />} />
      <Route path="/product/add-supplement/:brandId" element={<AddSupplement />} />
      <Route path="/add-review" element={<AddReview />} />
    </Routes>
  )
}

export default Router;