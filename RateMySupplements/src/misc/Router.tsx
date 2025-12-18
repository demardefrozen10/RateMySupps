import { Routes, Route } from 'react-router-dom'
import Home from '../Home';
import ProductCatalog from '../pages/ProductCatalog';
import ProductPage from '../pages/ProductPage';
import BrandCatalog from '../pages/BrandCatalog';
import AddReview from '../pages/AddReview';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/brands" element={<BrandCatalog />} />
      <Route path="/products/:brandId" element={<ProductCatalog />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/add-review" element={<AddReview />} />
    </Routes>
  )
}

export default Router;