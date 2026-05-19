import { Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";

import { ItemForm } from "./components/ItemForm";
import { EditarItem } from "./components/EditarItem";
import { Layout } from "./components/Layout";
import { Toast } from "./components/Toast";

import { useToastStore } from "./store/toastStore";
import { Register } from "./pages/Register";
import { ProtectedLayout } from "./components/ProtectedLayout";

export function App() {
  const { visible, message, type, hideToast } = useToastStore();

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedLayout />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/adicionar" element={<ItemForm />} />
            <Route path="/editar/:id" element={<EditarItem />} />
          </Route>
        </Route>
      </Routes>

      {visible && <Toast message={message} type={type} onClose={hideToast} />}
    </>
  );
}
