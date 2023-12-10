import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Clientes from './Pages/Clientes'
import { Error404 } from './Pages/Error404'
import RequireAuth from './Components/RequireAuth'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route element={<RequireAuth adminRole={false} />}>
            <Route path='/clientes' element={<Clientes />} />
          </Route>

          <Route path='*' element={<Error404 />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
