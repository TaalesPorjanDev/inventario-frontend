import { itemSchema } from '../schemas/itemSchema';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useItemStore } from '../store/itemStore';
import { useToastStore } from '../store/toastStore';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ItemFormFields } from './ItemFormFields';
import type { ItemFormData } from '../schemas/itemSchema';




export function EditarItem() {
  const { showToast } = useToastStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema)
  });
  const { id: idParam } = useParams<{ id: string }>();
  const id = idParam!;

  const { itens, atualizarItem, carregarItens, loading, hasLoaded } = useItemStore();
  const itemAtual = itens.find((item) => item.id === id);

  useEffect(() => {
    carregarItens();
  }, [carregarItens]);

  useEffect(() => {
    if (hasLoaded && !itemAtual) {
      navigate('/');
    }
  }, [itemAtual, hasLoaded, navigate]);

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

  if (loading || !hasLoaded || !itemAtual) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Carregando item...</p>
      </main>
    );
  }

  async function onSubmit(data: ItemFormData) {
    setIsSubmitting(true)
    try {
      await atualizarItem(id, data)
      showToast("Item atualizado com sucesso", "success")
      setTimeout(() => {
        setIsSubmitting(false)
        navigate('/')
      }, 1000)

    } catch {
      setIsSubmitting(false)
      showToast("Erro ao atualizar item", "error")
    }
  }

  return (
    <main className="max-w-xl mx-auto mt-16 px-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className=" text-gray-900 text-3xl font-bold mb-2 ">Editar Item</h1>

        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">

          <fieldset>
            <legend className='sr-only'></legend>
            <ItemFormFields register={register} errors={errors} />
          </fieldset>
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
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Salvando alterações...
                </>
              ): (
                "Salvar"
              )}
            </button>
            
          </div>
          
        </div>
      </form>
    </main>
  );
}
