import { createRoot } from 'react-dom/client'
import "./style/global.css"
import { RouterProvider } from 'react-router-dom'
import { router } from './router'


createRoot(document.getElementById('root')!).render(

  <RouterProvider router={router} />

)
