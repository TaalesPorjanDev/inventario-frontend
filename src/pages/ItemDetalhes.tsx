import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useItemStore } from '../store/itemStore';
import { Pencil, Trash2 } from 'lucide-react';
import { useToastStore } from '../store/toastStore';

export function ItemDetalhes() {
  const navigate = useNavigate();
  const { itens, removerItem, carregarItens, loading, hasLoaded } = useItemStore();
  const { showToast } = useToastStore();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    carregarItens();
  }, [carregarItens]);

  if (loading || !hasLoaded) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Carregando item...</p>
      </main>
    );
  }

  const item = itens.find((item) => item.id === id);
  if (!item) {
    navigate('/');
    return null;
  }

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      await removerItem(item.id);
      showToast('Item removido com sucesso', 'success');
      navigate('/');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* LADO ESQUERDO: IMAGEM */}
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-4">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.nome}
                className="w-full h-auto object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400">
                📷
              </div>
            )}
          </div>

          {/* LADO DIREITO: INFORMAÇÕES */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {item.nome}
            </h1>

            <div className="space-y-3">
              <p>
                <strong className="font-semibold">Local:</strong> {item.local}
              </p>
              <p>
                <strong className="font-semibold">Categoria:</strong> {item.categoria}
              </p>

              {item.observacao && (
                <div>
                  <strong className="font-semibold">Observação:</strong>
                  <p className="text-gray-700 mt-1">{item.observacao}</p>
                </div>
              )}
            </div>

            {/* BOTÕES DE AÇÃO */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => navigate(`/editar/${item.id}`)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Pencil className="h-4 w-4" />
                Editar
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4" />
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>

     
    </main>
  );
}