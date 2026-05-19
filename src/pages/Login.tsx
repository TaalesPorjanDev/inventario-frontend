import LogoSvg from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '../schemas/LoginSchema';

type LoginData = z.infer<typeof LoginSchema>

export function Login() {
  
  const { register, handleSubmit, formState: {errors}} = useForm<LoginData>({
    resolver: zodResolver(LoginSchema)
  })
  const { login, loading } = useLogin();

  async function onSubmit(data:LoginData) {
    await login({
      email: data.email,
      password: data.password
    });
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md mt-8">
        <div className="text-center mb-2">
          <img
            src={LogoSvg}
            alt="Logo do Meu Inventário"
            className="h-12 w-12 mx-auto"
          />
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Meu Inventário</h1>

        <p className="text-gray-500 text-center mb-6">
          Bem-vindo de volta! Organize seu espaço com facilidade.
        </p>

        <div className="bg-white p-6 rounded-lg border border-gray-200 w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                <input
                  {...register('email')}
                  type="email"
                  placeholder="nome@exemplo.com"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
            </div>

            <div className="relative mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Senha
                </label>

                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Esqueci minha senha
                </a>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                <input
                  {...register('password')}
                  type="password"
                  placeholder="********"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mt-5 flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Entrar
                  <LogIn className="h-4 w-4 ml-2" />
                </>
              )}
            </button>
            <div className="text-center text-sm text-gray-600 mt-4">
              Ainda não possui uma conta?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Cadastre-se agora
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
