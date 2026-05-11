import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import LogoSvg from '../assets/logo.svg';
import { useToastStore } from '../store/toastStore';

export function Register() {
  const {showToast} = useToastStore()
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      showToast('Preencha todos os campos', 'error')
      return;
    }

    if (password !== confirmPassword) {
      showToast('Senha não coincidem', 'error')
      return;
    }

    if (password.length < 6) {
      showToast('A senha precisa ter no mínimo 6 caracteres', 'error')
      return;
    }

    try {
      await api.post('/auth/register', {
        fullName: fullName,
        email: email,
        password: password,
      });
      showToast('Cadastro realizado com sucesso!', 'success')
      navigate('/login');
    } catch (error) {
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
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Ex: João Silva"
              className="w-full pl-3.5 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@email.com"
              className="w-full pl-3.5 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="*********"
              className="w-full pl-3.5 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">
              Confirmar Senha
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="*********"
              className="w-full pl-3.5 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mt-4 flex items-center justify-center disabled:opacity-50"
            >
              Criar Conta
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
