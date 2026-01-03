import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home';
import ProductCatalog from '../pages/ProductCatalog';
import ProductPage from '../pages/ProductPage';
import BrandCatalog from '../pages/BrandCatalog';
import AddReview from '../pages/AddReview';
import AddSupplement from '../pages/AddSupplement';
import NotFound from '../pages/NotFound';
import ScrollToTop from '../components/ScrollToTop';
import TermsAndConditions from '../pages/TermsAndConditions';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import AddBrand from '../pages/AddBrand';
import ApprovePage from '../pages/ApprovePage';


function Router() {
  return <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/brands" element={<BrandCatalog />} />
      <Route path="/add-brand" element={<AddBrand />} />
      <Route path="/products/:brandName" element={<ProductCatalog />} />
      <Route path="/product/:brandName/:supplementName/:supplementId" element={<ProductPage />} />
      <Route path="/product/add-supplement" element={<AddSupplement />} />
      <Route path="/add-review" element={<AddReview />} />
      <Route path="/secret" element={<ApprovePage />} />
      <Route path="*" element={<NotFound />} /> 
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

    </Routes>
  </>
}

export default Router;