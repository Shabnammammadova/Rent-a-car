import { createRoot } from 'react-dom/client'
import "./style/global.css"
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './config/queryClient'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import { store } from './store'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/zoom'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors />
    </QueryClientProvider>
  </Provider>
)
