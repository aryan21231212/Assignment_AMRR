
import { createRoot } from 'react-dom/client'
import {Route, Routes , BrowserRouter} from 'react-router-dom'

import './index.css'

import View from './components/View.jsx'
import Add from './components/Add.jsx'
import Nav from './components/Nav.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Nav />
    <Routes>
      <Route path='/' element={<View />} />
      <Route path='/add' element={<Add />} />

      
    </Routes>
  </BrowserRouter>
    


)
