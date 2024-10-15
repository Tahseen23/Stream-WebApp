import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Index.jsx'
import axios from 'axios'
import { Provider } from 'react-redux'
import { store } from './app/store/store.js'
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
const vari = import.meta.env.VITE_REACT_APP_ACCESS_TOKEN
// setup axios
axios.defaults.baseURL = "https://api.themoviedb.org/3"
axios.defaults.headers.common['Authorization'] = `Bearer ${vari}`

export const persistor=persistStore(store)


createRoot(document.getElementById('root')).render(


    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <RouterProvider router={router} />
      </PersistGate>
      
    </Provider>,
)
