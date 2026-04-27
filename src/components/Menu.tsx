import LogoSvg from '../assets/logo.svg';
import { Link } from 'react-router-dom';


export function Menu() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        {/* logo + título */}
        <div className="flex items-center gap-2">
          <img src={LogoSvg} alt="Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold tracking-tight ">Meu Inventário</h1>
        </div>

        {/* botão */}
        <Link to="/adicionar">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
            + Novo Item
          </button>
        </Link>
      </div>
    </nav>
  )
}