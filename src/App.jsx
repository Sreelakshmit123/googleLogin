
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Auth from './components/Auth'
import Home from './components/Home'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='/register' element={<Auth insideRegister/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
    </>
  )
}

export default App
