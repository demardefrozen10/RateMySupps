import './App.css'
import Carousel from './components/Carousel'
import Search from './components/Search'
import TextPane from './components/TextPane'
function Home() {

  return (
    <>
      <Search/>
      <Carousel title="Popular Supplements" />
      <TextPane/>
    </>
  )
}

export default Home
