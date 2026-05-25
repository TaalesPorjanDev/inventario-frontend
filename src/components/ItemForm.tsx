import { Camera, Clock, Loader2 } from 'lucide-react';
import { itemSchema } from '../schemas/itemSchema';
import { ItemFormFields } from './ItemFormFields';
import type { ItemFormData } from '../schemas/itemSchema';
import { Link, useNavigate } from 'react-router-dom'; 
import { useState } from 'react';
import { useItemStore } from '../store/itemStore';
import { useToastStore } from '../store/toastStore';
import { useForm } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod'; 




export function ItemForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const { register, handleSubmit, formState: { errors } } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema)
  });

  const { showToast } = useToastStore();
  const { adicionarItem } = useItemStore();
  const navigate = useNavigate();

  function onSubmit(data: ItemFormData) {
    setIsSubmitting(true);
    try {
      const { nome, categoria, local, observacao } = data;
      adicionarItem({ nome, categoria, local, observacao, imageUrl });
      showToast("Item adicionado com sucesso!", "success");

      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/');
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      showToast("Erro ao adicionar item", "error");
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if(typeof reader.result === 'string') {
        setImageUrl(reader.result)
      }
    };

    reader.readAsDataURL(file);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-xl mx-auto px-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-gray-900 text-3xl font-bold mb-2">
            Adicionar Novo Item
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Organize sua casa registrando um novo objeto com detalhes precisos.
          </p>

          <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <fieldset>
              <legend className="sr-only">Detalhes do Item</legend>

              <ItemFormFields register={register} errors={errors}/>
             

              {/* Botões */}
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
                  className="px-6 py-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    "Salvar"
                  )}
                </button>
              </div>
            </fieldset>
          </div>

          {/* Cards extras */}
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            <div className="flex-1 flex flex-col items-center bg-blue-50 p-4 rounded-lg">
              <Camera className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-700 text-sm mb-2">Adicionar Foto</h3>
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="mt-2 h-16 w-16 object-cover rounded-md border"
                />
              )}
            </div>
            <Link
              to="/recentes"
              className="flex-1 flex flex-col items-center justify-center bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Clock className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-700 text-sm">Itens Recentes</h3>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}