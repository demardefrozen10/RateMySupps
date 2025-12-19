import '../App.css'
import { useNavigate } from 'react-router-dom';
function NavBar() {

  const navigate = useNavigate();

  const HandleClick = () => {
    navigate('/');
  }

  return (
    <>
    <div className="flex flex-col items-center">
      <div className="w-full h-16">
      <div className="w-full h-16 flex items-center justify-between px-8 bg-white shadow">
      <div className="w-32"></div>
      <h1 className="text-3xl font-bold" onClick={HandleClick}>
        RateMy<span className="text-emerald-300">Supplements</span>
      </h1>
      <button className="bg-emerald-300 hover:bg-emerald-400 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
        Write a Review
      </button>
      </div>
      </div>
      </div>
    </>
  )
}

export default NavBar