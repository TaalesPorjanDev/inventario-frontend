import type { Item } from '../types/item';
import { Trash2, Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface ItemCardProps {
  item: Item;
  onDelete: () => void;
}

export function ItemCard({ item, onDelete }: ItemCardProps) {
  const navigate = useNavigate();

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      {/* Link que envolve IMAGEM + TÍTULO (clicável para detalhes) */}
      <Link to={`/detalhes/${item.id}`} className="block">
        {/* IMAGEM */}
        <div className="w-full h-60">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.nome}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
              📷
            </div>
          )}
        </div>

        {/* TÍTULO (dentro do Link) */}
        <div className="p-3 pb-0">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
            {item.nome}
          </h3>
        </div>
      </Link>

      {/* ÁREA NÃO CLICÁVEL (badges + botões) */}
      <div className="p-3 pt-0 flex-1 flex flex-col">
        {/* Botões (Editar / Deletar) */}
        <div className="flex justify-end gap-2 mb-2">
          <button onClick={() => navigate(`/editar/${item.id}`)}>
            <Pencil className="text-gray-400 h-4 w-4 cursor-pointer hover:text-gray-600" />
          </button>
          <button onClick={onDelete}>
            <Trash2 className="text-red-500 h-4 w-4 cursor-pointer" />
          </button>
        </div>

        {/* Badges (Categoria / Local) */}
        <div className="flex flex-wrap gap-1 mt-auto">
          <span className="px-2 py-0.5 border border-gray-200 rounded-full text-xs text-[#505f76]">
            {item.categoria}
          </span>
          <span className="px-2 py-0.5 border border-gray-200 rounded-full text-xs text-[#505f76]">
            {item.local}
          </span>
        </div>
      </div>
    </article>
  );
}