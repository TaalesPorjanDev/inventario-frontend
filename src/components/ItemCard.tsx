import type { Item } from '../types/item'
import { Trash2, Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';


interface ItemCardProps {
    item: Item;
    onDelete: () => void
}
export function ItemCard({item, onDelete}: ItemCardProps) {
    const navigate = useNavigate()
    return (
        <article className='bg-white rounded-lg shadow-md p-4 h-full'>
            <Link to={`/detalhes/${item.id}`} className='block no-underline'>
                <h3 className='text-2xl font-semibold text-gray-900 mb-0'>{item.nome}</h3>
                <div className='flex gap-2 mt-2'>
                    <span className='px-2 py-1 border border-gray-200 rounded-full text-xs text-[#505f76]'>{item.categoria}</span>
                    <span className='px-2 py-1 border border-gray-200 rounded-full text-xs text-[#505f76]'>{item.local}</span>
                </div>
            </Link>
            <div className='flex justify-end gap-2 mt-2'>
        
                <div className='flex gap-2'>
                    <button onClick={() => navigate (`/editar/${item.id}`)}>
                        <Pencil className='text-gray-400 h-5 w-5 cursor-pointer' />
                    </button>
                    
                    <button onClick={onDelete}>
                        <Trash2 className='text-red-500 h-5 w-5 cursor-pointer' />
                    </button>
                    
                </div>
            </div>
           
            
        </article> 
    )
}