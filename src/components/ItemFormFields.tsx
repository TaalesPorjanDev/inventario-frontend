import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { ItemFormData } from '../schemas/itemSchema';

type ItemFormFieldsProps = {
    register: UseFormRegister<ItemFormData>;
    errors: FieldErrors<ItemFormData>;
};

export function ItemFormFields({register, errors}: ItemFormFieldsProps) {
    return (
            <>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Item
                </label>
                <input
                  {...register('nome')}
                  type="text"
                  placeholder="Ex: Câmera Mirrorless"
                  className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
              </div>

             
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select
                    {...register('categoria')}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione</option>
                    <option value="Eletrodomésticos">Eletrodomésticos</option>
                    <option value="Eletrônicos">Eletrônicos</option>
                    <option value="Móveis">Móveis</option>
                    <option value="Decoração">Decoração</option>
                    <option value="Outros">Outros</option>
                  </select>
                  {errors.categoria && <span className="text-red-500 text-sm">{errors.categoria.message}</span>}
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Localização
                  </label>
                  <select
                    {...register('local')}
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
                  {errors.local && <span className="text-red-500 text-sm">{errors.local.message}</span>}
                </div>
              </div>

              
              <div className="mb-6">
                <label className="flex justify-between items-center text-sm font-medium text-gray-700 mb-1">
                  Observação
                  <span className="text-gray-400 text-xs ml-2">Opcional</span>
                </label>
                <textarea
                  {...register('observacao')}
                  rows={6}
                  placeholder="Adicione detalhes como número de série, data de compra..."
                  className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                {errors.observacao && <span className="text-red-500 text-sm">{errors.observacao.message}</span>}
              </div>
              </>
    )
}