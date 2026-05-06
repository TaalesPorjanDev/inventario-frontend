import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ItemForm } from './components/ItemForm'
import { Menu } from './components/Menu'
import { EditarItem } from './components/EditarItem'
import { useToastStore } from './store/toastStore'
import { Toast } from './components/Toast'
import { Login } from './pages/Login'
import { ProtectedRoute } from './components/ProtectedRoute'


export function App() {
  const { message, type, visible, hideToast } = useToastStore();

  return (
    <>
    <Menu />
    {visible && <Toast message={message} type={type} onClose={hideToast}/>}
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />
      <Route path="/adicionar" element={
         <ProtectedRoute>
          <ItemForm />
         </ProtectedRoute>
      } />
      <Route path="/editar/:id" element={
        <ProtectedRoute>
          <EditarItem />
        </ProtectedRoute>
      } />
    </Routes>
    </>
  )
}

