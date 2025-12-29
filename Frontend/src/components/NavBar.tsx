import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="w-full h-20 flex items-center justify-center px-8">
        
        <div 
          className="cursor-pointer select-none transition-transform active:scale-95" 
          onClick={handleLogoClick}
        >
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900">
            RateMy<span className="text-emerald-500">Supplements</span>
          </h1>
        </div>

      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
    </nav>
  );
}

export default NavBar;