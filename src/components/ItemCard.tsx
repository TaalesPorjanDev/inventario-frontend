import type { Item } from '../types/item';
import { Trash2, Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ItemBadge } from './ItemBadge';

interface ItemCardProps {
  item: Item;
  onDelete: () => void;
}

export function ItemCard({ item, onDelete }: ItemCardProps) {
  const navigate = useNavigate();

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      
      <Link to={`/detalhes/${item.id}`} className="block">
        
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

        
        <div className="p-3 pb-0">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
            {item.nome}
          </h3>
        </div>
      </Link>

      
      <div className="p-3 pt-0 flex-1 flex flex-col">
        
        <div className="flex justify-end gap-2 mb-2">
          <button onClick={() => navigate(`/editar/${item.id}`)}>
            <Pencil className="text-gray-400 h-4 w-4 cursor-pointer hover:text-gray-600" />
          </button>
          <button onClick={onDelete}>
            <Trash2 className="text-red-500 h-4 w-4 cursor-pointer" />
          </button>
        </div>

        
        <div className="flex flex-wrap gap-1 mt-auto">
          <ItemBadge>{item.categoria}</ItemBadge>
          <ItemBadge>{item.local}</ItemBadge>
        </div>
      </div>
    </article>
  );
}