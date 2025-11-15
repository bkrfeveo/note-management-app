import './App.css'
import "@radix-ui/themes/styles.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotesApp from './components/NotesList'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route 
              path='/' 
              element={
                <ProtectedRoute>
                  <NotesApp />
                </ProtectedRoute>
              }
            />
          <Route 
            path='/connexion' 
            element={<Login />}
          />
          <Route 
            path='/inscription' 
            element={<Register />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
