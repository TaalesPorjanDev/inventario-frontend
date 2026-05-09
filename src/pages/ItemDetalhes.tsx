import { useParams, useNavigate } from 'react-router-dom';
import { useItemStore } from '../store/itemStore';

export function ItemDetalhes() {
  const navigate = useNavigate();
  const { itens } = useItemStore();
  const { id } = useParams<{ id: string }>();

  const item = itens.find((item) => item.id === id);
  if (!item) {
    navigate('/');
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{item.nome}</h1>
        <p className="text-gray-700 mb-2">
          <strong className="font-semibold">Local:</strong> {item.local}
        </p>
        <p className="text-gray-700 mb-2">
          <strong className="font-semibold">Categoria:</strong> {item.categoria}
        </p>

        {item.observacao && (
          <div>
            <strong className="font-semibold">Observação:</strong>
            <p className="text-gray-700 mb-2">{item.observacao}</p>
          </div>
        )}

        <button
          className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          onClick={() => navigate('/')}
        >
          Voltar
        </button>
      </div>
    </main>
  );
}
