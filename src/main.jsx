import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import './index.css'
import ThemeContextProvider from './context/ThemeContext.jsx'
import './i18n';


createRoot(document.getElementById('root')).render(
    <>
    <ThemeContextProvider>
         <ToastContainer />
          <App />
    </ThemeContextProvider>
    </>
)
