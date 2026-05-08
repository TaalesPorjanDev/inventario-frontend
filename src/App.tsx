import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ItemForm } from './components/ItemForm'
import { EditarItem } from './components/EditarItem'


import { Login } from './pages/Login'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Layout } from './components/Layout'

export function App() {
  

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
  
      <Route element={<Layout />}>
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/adicionar" element={<ProtectedRoute><ItemForm /></ProtectedRoute>} />
        <Route path="/editar/:id" element={<ProtectedRoute><EditarItem /></ProtectedRoute>} />
      </Route>
    </Routes>
    
  )
}

