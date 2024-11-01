import { RouterProvider } from 'react-router'
import ThemeProvider from './theme/ThemeProvider'
import {QueryClientProvider,QueryClient} from '@tanstack/react-query'
import { router } from './router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type intialCacheLoadStatus = {
  agent: boolean, 
  customer: boolean, 
  design: boolean, 
  sizes: boolean, 
  transport: boolean 
}

const queryClient = new QueryClient();

function App() {

  return (
    <ThemeProvider>
        <ToastContainer/>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
