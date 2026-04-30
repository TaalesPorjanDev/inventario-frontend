import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ItemForm } from './components/ItemForm'
import { Menu } from './components/Menu'
import { EditarItem } from './components/EditarItem'

export function App() {
  return (
    <>
    <Menu />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/adicionar" element={<ItemForm />} />
      <Route path="/editar/:id" element={<EditarItem />} />
    </Routes>
    </>
  )
}

