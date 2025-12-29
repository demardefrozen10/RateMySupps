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
      <div className="w-full h-15">
      <div className="w-full h-15 flex items-center justify-center px-8 bg-white shadow">
        <h1 className="text-3xl font-bold cursor-pointer" onClick={HandleClick}>
          RateMy<span className="text-emerald-500">Supplements</span>
        </h1>
      </div>
      </div>
      </div>
    </>
  )
}

export default NavBar