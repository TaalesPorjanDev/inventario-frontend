import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ItemForm } from './components/ItemForm'
import { Menu } from './components/Menu'
import { EditarItem } from './components/EditarItem'
import { useToastStore } from './store/toastStore'
import { Toast } from './components/Toast'


export function App() {
  const { message, type, visible, hideToast } = useToastStore();

  return (
    <>
    <Menu />
    {visible && <Toast message={message} type={type} onClose={hideToast}/>}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/adicionar" element={<ItemForm />} />
      <Route path="/editar/:id" element={<EditarItem />} />
    </Routes>
    </>
  )
}

