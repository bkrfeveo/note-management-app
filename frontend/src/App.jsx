import './App.css'
import "@radix-ui/themes/styles.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotesApp from './components/NotesList'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'
import { ThemeProvider } from './context/themeProvider';
// import NoteForm from './components/NoteForm';

function App() {

  return (
    <>
      <ThemeProvider>
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
            {/* <Route 
              path='/nouveau-note' 
              element={<NoteForm />}
            /> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
