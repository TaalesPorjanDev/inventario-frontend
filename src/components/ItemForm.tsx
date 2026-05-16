
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useItemStore } from '../store/itemStore';
import { useToastStore } from '../store/toastStore';
import { Camera} from 'lucide-react';
import { Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';


interface ItemFormData {
  nome: string;
  categoria: string;
  local: string;
  observacao: string;
}



export function ItemForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<ItemFormData>();
  const { showToast } = useToastStore();
  const { adicionarItem } = useItemStore();
  const navigate = useNavigate();
  

  function onSubmit(data: ItemFormData) {
    setIsSubmitting(true)
    try {
      const { nome, categoria, local, observacao} = data
      adicionarItem({ nome, categoria, local, observacao });
      showToast("item adicionado com sucesso!", "success")

      setTimeout(() => {
        setIsSubmitting(false)
        navigate('/')
      }, 1000)  

    } catch (error) {
      setIsSubmitting(false)
      showToast("Erro ao adicionar item", "error")
    }
  }

  return (
    
    <main className="max-w-xl mx-auto mt-16 px-8">
      <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register('nome', {
                required: "Nome é obrigatório",
                minLength: {value: 3, message: "Nome deve ter no mínimo 3 caracteres"}
                })}
                type="text"
                placeholder="Ex: Câmera Mirrorless"
                className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                
              />
              {errors.nome && <span className='text-red-500 text-sm'>{errors.nome.message}</span>}
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  {...register('categoria' ,{required: "Categoria é obrigatório"})}
                  id="categoria"
                  className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                  
                  <option value="">Selecione</option>
                  <option value="Eletrodomésticos">Eletrodomésticos</option>
                  <option value="Eletrônicos">Eletrônicos</option>
                  <option value="Móveis">Móveis</option>
                  <option value="Decoração">Decoração</option>
                  <option value="Outros">Outros</option>
                </select>
                {errors.categoria && <span className='text-red-500 text-sm'>{errors.categoria.message}</span>}
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Localização
                </label>
                <select
                  {...register('local', {required: "Localização é obrigatório"})}
                  id="localizacao"
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
                {errors.local && <span className='text-red-500 text-sm'>{errors.local.message}</span>}
              </div>
            </div>

            <div className="mb-6">
              <label className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
                Observacao
                <span className="text-gray-400 text-xs ml-2">Opcional</span>
              </label>
              <textarea
                {...register('observacao')}
                id="observacao"
                
                rows={6}
                placeholder="Adicione detalhes como número de série, data de compra..."
                
                className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
              {errors.observacao && <span className='text-red-500 text-sm'>{errors.observacao.message}</span>}
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
                disabled={isSubmitting}
                className="px-6 py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors 
                flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className='h-4 w-4 animate-spin'/>
                    Salvando...
                  </>
                ) : (
                  "Salvar"
                )}
                
              </button>
            </div>
          </fieldset>
        </div>
        <div className='flex flex-col md:flex-row gap-6 mt-6'>
          <div className='flex-1 flex flex-col items-center justify-center bg-blue-50 p-6 rounded-lg'>
            <Camera className='h-5 w-5 text-blue-600 mb-2'/>
            <h3 className='font-semibold text-gray-700'>Adicionar Foto</h3>
          </div>
          <Link to='/recentes' className='flex-1 flex flex-col items-center justify-center bg-blue-50 p-6 rounded-lg'>
            <Clock className='h-5 w-5 text-blue-600 mb-2'/>
            <h3 className='font-semibold text-gray-700 '>Itens Recentes</h3>
          </Link>
        </div>
      </form>
    </main>
  );
}
