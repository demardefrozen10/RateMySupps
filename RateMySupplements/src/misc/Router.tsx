import { Routes, Route } from 'react-router-dom'
import Catalog from '../pages/Catalog';
import Home from '../Home';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
    </Routes>
  )
}

export default Router;