import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItemStore } from '../store/itemStore';
import { useToastStore } from '../store/toastStore';

export function ItemForm() {
  const { showToast } = useToastStore();
  const { adicionarItem } = useItemStore();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [local, setLocal] = useState('');
  const [observacao, setObservacao] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!nome || !categoria || !local) {
      showToast("Preencha todos os campos", "error")
      return;
    }

    adicionarItem({ nome, categoria, local, observacao });
    showToast("item adicionado com sucesso!", "success")
    navigate('/');
  }

  return (
    
    <main className="max-w-xl mx-auto mt-16 px-8">
      <form onSubmit={handleSubmit}>
        <h1 className=" text-gray-900 text-3xl font-bold mb-2 ">
          Adicionar Novo Item
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Organize sua casa registrando um novo objeto com detalhes precisos.
        </p>

        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          <fieldset>
            <legend className="sr-only">Detalhes do Item</legend>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Item
              </label>
              <input
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                type="text"
                placeholder="Ex: Câmera Mirrorless"
                className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  name="categoria"
                  id="categoria"
                  value={categoria}
                  onChange={(event) => setCategoria(event.target.value)}
                  className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione</option>
                  <option value="Eletrodomésticos">Eletrodomésticos</option>
                  <option value="Eletrônicos">Eletrônicos</option>
                  <option value="Móveis">Móveis</option>
                  <option value="Decoração">Decoração</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Localização
                </label>
                <select
                  name="localizacao"
                  id="localizacao"
                  value={local}
                  onChange={(event) => setLocal(event.target.value)}
                  className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione</option>
                  <option value="Sala">Sala</option>
                  <option value="Quarto">Quarto</option>
                  <option value="Cozinha">Cozinha</option>
                  <option value="Escritório">Escritório</option>
                  <option value="Garagem">Garagem</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
                Observacao
                <span className="text-gray-400 text-xs ml-2">Opcional</span>
              </label>
              <textarea
                name="observacao"
                id="observacao"
                value={observacao}
                rows={6}
                placeholder="Adicione detalhes como número de série, data de compra..."
                onChange={(event) => setObservacao(event.target.value)}
                className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-4 text-[#505F76] hover:bg-gray-100 rounded-md transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Salvar
              </button>
            </div>
          </fieldset>
        </div>
      </form>
    </main>
  );
}
