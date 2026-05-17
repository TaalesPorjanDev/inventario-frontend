import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useItemStore } from '../store/itemStore';
import { useToastStore } from '../store/toastStore';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

interface EditFormData {
  nome: string;
  categoria: string;
  local: string;
  observacao: string
}


export function EditarItem() {
  const { showToast } = useToastStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EditFormData>();
  const { id: idParam } = useParams<{ id: string }>();
  const id = idParam!;

  const { itens, atualizarItem } = useItemStore();

  

  const itemAtual = itens.find((item) => item.id === id);

  useEffect(() => {
    if (!itemAtual) {
      navigate('/');
    }
  }, [itemAtual, navigate]);

  useEffect(() => {
    if (itemAtual) {
      reset({
        nome: itemAtual.nome,
        categoria: itemAtual.categoria,
        local: itemAtual.local,
        observacao: itemAtual.observacao,
      })
    }
  }, [itemAtual, reset]);

  function onSubmit(data: EditFormData) {
    setIsSubmitting(true)
    try {
      atualizarItem(id, data)
      showToast("Item atualizado com sucesso", "success")
      setTimeout(() => {
        setIsSubmitting(false)
        navigate('/')
      }, 1000)

    } catch(error) {
      setIsSubmitting(false)
      showToast("Erro ao adicionar item", "error")
    }
  }

  return (
    <main className="max-w-xl mx-auto mt-16 px-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className=" text-gray-900 text-3xl font-bold mb-2 ">Editar Item</h1>

        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">

          <fieldset>
            <legend className='sr-only'></legend>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Item
            </label>
            <input
              {...register('nome', {
                required: "Nome é obrigatório",
                minLength: { value: 3, message: "Mínimo de 3 caracteres" }
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
                {...register('categoria', {required: "Categoria é obrigatória"})}
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
                {...register('local', { required: "Localização é obrigatória" })}
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
          </fieldset>
          <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-gray-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors 
              flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Salvando alterações...
                </>
              ): (
                "Salvar"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-4 text-[#505F76] hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancelar
            </button>
          </div>
          
        </div>
      </form>
    </main>
  );
}
