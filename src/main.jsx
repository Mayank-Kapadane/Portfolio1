import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <App />
  //</StrictMode>,

  // Temporarily comment out "Strict Mode" so that we can a clear output in console. and understand it in better way. 

)
