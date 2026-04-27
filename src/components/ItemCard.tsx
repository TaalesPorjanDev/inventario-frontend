import type { Item } from '../types/item'
import { Trash2 } from 'lucide-react';

interface ItemCardProps {
    item: Item;
    onDelete: () => void
}
export function ItemCard({item, onDelete}: ItemCardProps) {
    return (
        <div className='bg-gray-50 rounded-lg shadow-md p-4'>
            <div className='flex justify-between items-start'>
                <h3 className='text-lg font-semibold text-blue-600'>{item.nome}</h3>
                <Trash2 className='text-red-500 h-5 w-5 cursor-pointer' onClick={onDelete}></Trash2>
            </div>
            <p className='text-sm text-gray-500 mt-1'>{item.categoria} • {item.local}</p>
        </div>
    )
}