import { useState } from 'react'

import './App.css'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import AuthPage from './components/Auth'
import RefreshHandler from './RefreshHandler'

import Header from './components/header/Header'


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/auth" />;
  }

  return (
      <BrowserRouter>
        <Header />
        <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
        <Routes>
          <Route path="/" element={<Navigate to={"/auth"} />} />
          <Route path="/*" element={<Navigate to={"/auth"} />} />

          <Route path="/auth" element={<AuthPage />} />


          <Route path='/home' element={<PrivateRoute element={<Home/>} />}/>
        </Routes>

      </BrowserRouter>

  )
}

export default App
