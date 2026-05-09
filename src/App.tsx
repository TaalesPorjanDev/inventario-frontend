import { Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";

import { ItemForm } from "./components/ItemForm";
import { EditarItem } from "./components/EditarItem";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { Toast } from "./components/Toast";
import { ItemDetalhes } from "./pages/ItemDetalhes";

import { useToastStore } from "./store/toastStore";

export function App() {
  const { visible, message, type, hideToast } = useToastStore();

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/adicionar"
            element={
              <ProtectedRoute>
                <ItemForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editar/:id"
            element={
              <ProtectedRoute>
                <EditarItem />
              </ProtectedRoute>
            }
          />
           <Route
            path="/detalhes/:id"
            element={
              <ProtectedRoute>
                <ItemDetalhes />
              </ProtectedRoute>
            }
          /> 
        </Route>
        
      </Routes>

      {visible && <Toast message={message} type={type} onClose={hideToast} />}
    </>
  );
}
