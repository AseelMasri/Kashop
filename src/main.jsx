import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// (لو مش مستوردة في main.jsx تقدري تتركيهم هون)
import 'swiper/css';
import 'swiper/css/navigation';
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
