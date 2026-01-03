import '../App.css'
import Carousel from '../components/Carousel'
import Search from '../components/Search'
import TextPane from '../components/TextPane'
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import type { Supplement } from '../types/Supplement';
import { useLocation, useNavigate } from 'react-router-dom';
import Load from '../components/Load';

function Home() {
  const { get } = useFetch("http://localhost:8080/api/supplement/");
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    get('top-rated')
      .then((data: Supplement[]) => {
        setSupplements(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch supplements:", err);
        setSupplements([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (location.state?.brandSubmitted) {
        setShowNotification(true);
        navigate(location.pathname, { replace: true, state: { ...location.state, brandSubmitted: undefined } });
        const timer = setTimeout(() => setShowNotification(false), 3000);
        return () => clearTimeout(timer);
    }
  }, [location.state, navigate, location.pathname]);

  if (loading) {
    return <Load />;
  }

  return (
    <>
    {showNotification && (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">Brand Submitted</span>
        </div>
    </div>
    )}
    <Search/>
    <Carousel 
      title="Top Rated Supplements" 
      supplements={supplements}
    />
    <TextPane/>

    </>
  )
}

export default Home
