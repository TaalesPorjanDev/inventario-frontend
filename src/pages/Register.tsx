import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import LogoSvg from '../assets/logo.svg';
import { useToastStore } from '../store/toastStore';
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react';

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string
}

export function Register() {
  const {showToast} = useToastStore()
  const { register, handleSubmit, formState: {errors}, watch, reset} = useForm<RegisterFormData>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate();

  async function onSubmit(data: RegisterFormData ) {
    setIsSubmitting(true)
   try {
      const {fullName, email, password} = data
      await api.post('/auth/register', {
        fullName: fullName,
        email: email,
        password: password,
      });
      showToast('Cadastro realizado com sucesso!', 'success')
      setTimeout(() => {
        setIsSubmitting(false)
        navigate('/login');
      },1000)
    } catch (error) {
      setIsSubmitting(false)
      showToast('Erro ao cadastrar. Tente novamente.', 'error')
    }
  }
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-2">
          <img
            src={LogoSvg}
            alt="Logo do Meu Inventario"
            className="h-12 w-12 mx-auto"
          />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Meu Inventário</h1>

        <p className="text-gray-500 text-center mb-6">
          Organize sua vida com um toque de zen.
        </p>
        <div className="bg-white p-6 rounded-lg border border-gray-200 w-full max-w-md">
          <h2 className="text-xl font-semibold text-center mb-2">
            Criar Nova Conta
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">
              Nome Completo
            </label>
            <input
              {...register('fullName', {
              required: "Nome completo é obrigatório",
              minLength: {value: 9, message: "Nome completo deve ter no minimo 9 caracteres"}
              
              })}
              type="text"
              placeholder="Ex: João Silva"
              className="w-full pl-3.5 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fullName && <span className='text-red-500 text-sm'>{errors.fullName.message}</span>}
            <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">
              E-mail
            </label>
            <input
            {...register('email', {
              required: "email é obrigatório",
              minLength: {value: 15, message: "O email deve ter no mínimo de 15 caracteres"}
            })}
              type="email"
              
              placeholder="seu@email.com"
              className="w-full pl-3.5 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
            <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">
              Senha
            </label>
            <input
               {...register('password', {
              required: "senha é obrigatório",
              minLength: {value: 6, message: "A senha deve ter no minimo de 6 caracteres"}
              })}
              type="password"
              
              placeholder="*********"
              className="w-full pl-3.5 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
            <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">
              Confirmar Senha
            </label>
            <input
               {...register('confirmPassword', {
              required: "Confirme sua senha",
              validate: (value) => value === watch('password') || "As senhas não coincidem"
              })}
             
              placeholder="*********"
              className="w-full pl-3.5 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

              <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mt-4 flex items-center justify-center disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className='h-4 w-4 animate-spin'/>
                  Criando conta...
                </>
              ) : (
                 "Criar Conta"
              )}
            </button>
            <Link
              to="/login"
              className="block text-center text-sm text-blue-600 hover:underline mt-4"
            >
              Já tem uma conta? Entrar
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}
