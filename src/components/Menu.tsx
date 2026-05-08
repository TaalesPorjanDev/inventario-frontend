import LogoSvg from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function Menu() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
    
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        {/* logo + título */}
        <div className="flex items-center gap-2">
          <img src={LogoSvg} alt="Logo" className="h-10 w-10" />
          <h1 className="hidden md:block text-2xl font-bold tracking-tight text-slate-900 ">
            Meu Inventário
          </h1>
        </div>

        {/* botão */}

        <div className="flex items-center gap-4">
          <Link to="/adicionar">
            <button className="bg-blue-600 text-white  w-full px-2 md:px-4 py-1.5 rounded-md text-sm md:text-sm whitespace-nowrap hover:bg-blue-700">
              + Novo Item
            </button>
          </Link>
          <button className='bg-red-500 text-white hover:bg-red-700 rounded-md px-3 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap' onClick={handleLogout}>Sair</button>
        </div>
      </div>
    </nav>
  );
}
