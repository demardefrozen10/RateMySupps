import './App.css'
import Carousel from './components/Carousel'
import Search from './components/Search'
import TextPane from './components/TextPane'
import { useEffect, useState } from 'react';
import useFetch from './hooks/useFetch';
import type { Supplement } from './types/Supplement';

function Home() {
  const { get } = useFetch("http://localhost:8080/api/supplement/");
  const [supplements, setSupplements] = useState<Supplement[]>([]);


  useEffect(() => {
    get('top-rated')
      .then((data: Supplement[]) => {
        setSupplements(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch supplements:", err);
        setSupplements([]);
      });
  }, []);


  return (
    <>
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
