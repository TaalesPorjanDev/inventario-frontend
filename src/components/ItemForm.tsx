import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItemStore } from '../store/itemStore';

export function ItemForm() {
  const { adicionarItem } = useItemStore();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [local, setLocal] = useState('');
  const [observacao, setObservacao] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!nome || !categoria || !local) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    adicionarItem({ nome, categoria, local, observacao });
    navigate('/');
  }

  return (
    <div className="max-w-md mx-auto mt-10 pt-20">
        <form onSubmit={handleSubmit}>
            <h1 className='text-2xl font-bold mb-2'>Adicionar Novo Item</h1>
            <p className='text-gray-500 text-sm mb-6'>Organize sua casa registrando um novo objeto com detalhes
            precisos.
            </p>
        </form>
    </div>
  )
  
  
}
