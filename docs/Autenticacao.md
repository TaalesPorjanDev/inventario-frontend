# Autenticação (Frontend)

Este documento descreve a lógica de autenticação implementada no frontend, como os arquivos se relacionam e algumas recomendações.

Visão geral

- O frontend usa uma store global (`useAuthStore`) para armazenar `isAuthenticated` e `loading`.
- Requisições à API são feitas com `src/services/api.ts`, que já tem `withCredentials: true` para enviar cookies.

Fluxo principal

1. Ao montar rotas protegidas, o componente `ProtectedLayout` chama `validateAuth()` para verificar se o usuário está autenticado.

2. `validateAuth()` faz um `GET /auth/me` via `api`:
   - Em caso de sucesso, chama `setAuthenticated(true)`.
   - Em caso de falha, chama `setAuthenticated(false)`.
   - Sempre finaliza chamando `setLoading(false)` para indicar que a checagem terminou.

3. `ProtectedLayout` inicia com `loading` true (valor inicial da store). Enquanto `loading` for true, mostra um texto "Loading...". Se `loading` for false e `isAuthenticated` for false, redireciona para `/login`. Se autenticado, renderiza as rotas filhas (`<Outlet />`).

4. O hook `useLogin` envia `POST /auth/login` com `email` e `password` (com `withCredentials: true`) e, em caso de sucesso:
   - Chama `setAuthenticated(true)` na store
   - Mostra um toast e navega para `/`

Arquivos relevantes

- [src/store/authStore.ts](src/store/authStore.ts)
- [src/hooks/validateAuth.ts](src/hooks/validateAuth.ts)
- [src/components/ProtectedLayout.tsx](src/components/ProtectedLayout.tsx)
- [src/hooks/useLogin.ts](src/hooks/useLogin.ts)
- [src/services/api.ts](src/services/api.ts)

Observações sobre a implementação atual

- A lógica atual funciona para o fluxo básico: checar sessão via `/auth/me`, proteger rotas e realizar login.
- `api` já define `withCredentials: true` globalmente; os requests individuais também passam `withCredentials`, o que é redundante mas inofensivo.
- `validateAuth()` usa `useAuthStore.getState()` para obter setters diretamente (bom para chamadas fora de componentes).

Recomendações e melhorias

- Definir explicitamente `setLoading(true)` no início de `validateAuth()` para cobrir cenários onde a checagem seja re-disparada após logout ou em revalidações manuais.
- Implementar um `logout()` na `useAuthStore` que limpe cookies / chame a API de logout e defina `isAuthenticated=false`.
- Lidar globalmente com respostas `401` no interceptor de `api` para, por exemplo, chamar `setAuthenticated(false)` e redirecionar para `/login` automaticamente.
- Considerar debounce/cancelamento nas requisições de validação para evitar condições de corrida (útil em StrictMode do React que monta efeitos duas vezes em dev).
- Se a API usar CSRF tokens, documentar como o frontend deve obtê-los (cookie, endpoint) e incluí-los nas requisições.

Exemplo rápido (sugestão) para `validateAuth()` melhorar robustez:

```ts
export async function validateAuth() {
  const { setAuthenticated, setLoading } = useAuthStore.getState();
  setLoading(true);
  try {
    await api.get("/auth/me", { withCredentials: true });
    setAuthenticated(true);
  } catch {
    setAuthenticated(false);
  } finally {
    setLoading(false);
  }
}
```

Conclusão

A implementação atual está correta para um fluxo de autenticação baseado em cookies/sessões. As recomendações acima ajudam a tornar o comportamento mais robusto e previsível em cenários de borda.

---

Mudanças aplicadas neste commit

- `src/hooks/validateAuth.ts`: agora chama `setLoading(true)` no início da verificação para garantir que o estado de carregamento reflita a checagem em andamento.
- `src/store/authStore.ts`: adicionado método `logout()` que reseta `isAuthenticated` para `false` e `loading` para `false` (útil para limpar estado ao deslogar).
- `src/services/api.ts`: interceptor de respostas agora trata `401` explicitamente chamando `useAuthStore.getState().setAuthenticated(false)` e `setLoading(false)` para sincronizar o estado do frontend quando o backend rejeita a sessão.

Motivação das mudanças

- `setLoading(true)` evita janelas onde `loading` poderia estar `false` enquanto uma revalidação está em andamento (especialmente em revalidações manuais ou múltiplos mounts).
- `logout()` dá uma forma centralizada e síncrona de resetar o estado de autenticação sem depender de efeitos colaterais externos.
- Tratar `401` no interceptor garante que, se o servidor invalidar a sessão (por expiração de cookie, revogação, etc.), a UI seja atualizada e rotas protegidas redirecionem imediatamente para `/login`.
