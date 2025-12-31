import { Routes, Route } from 'react-router-dom'
import Home from '../Home';
import ProductCatalog from '../pages/ProductCatalog';
import ProductPage from '../pages/ProductPage';
import BrandCatalog from '../pages/BrandCatalog';
import AddReview from '../pages/AddReview';
import AddSupplement from '../pages/AddSupplement';
import NotFound from '../pages/NotFound';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/brands" element={<BrandCatalog />} />
      <Route path="/products/:brandId" element={<ProductCatalog />} />
      <Route path="/product/:brandName/:supplementName/:supplementId" element={<ProductPage />} />
      <Route path="/product/add-supplement" element={<AddSupplement />} />
      <Route path="/add-review" element={<AddReview />} />
      <Route path="*" element={<NotFound />} /> 

    </Routes>
  )
}

export default Router;