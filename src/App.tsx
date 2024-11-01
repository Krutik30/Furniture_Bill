import { RouterProvider } from 'react-router'
import ThemeProvider from './theme/ThemeProvider'
import {QueryClientProvider,QueryClient} from '@tanstack/react-query'
import { router } from './router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLocalStorage from './hooks/useLocalStorage';
import { getUserHasLoggedIn } from './utils/getUserHasLoggedIn';
import { useEffect, useState } from 'react';
import { InitialCacheLoading } from './components/InitialCacheLoading';

export type intialCacheLoadStatus = {
  agent: boolean, 
  customer: boolean, 
  design: boolean, 
  sizes: boolean, 
  transport: boolean 
}

const queryClient = new QueryClient();

function App() {
  const [userObject] = useLocalStorage('userObject', '');
  const [hasLoggedIn, setHasLoggedIn] = useState(getUserHasLoggedIn());
  const [initialCacheLoaded, setInitialCacheLoaded] = useState<intialCacheLoadStatus>({agent: false, customer: false, design: false, sizes: false, transport: false, });

  useEffect(() => {
    setHasLoggedIn(getUserHasLoggedIn());
  }, [userObject]);
  
  console.log({hasLoggedIn, userObject, initialCacheLoaded});
  return (
    <ThemeProvider>
        <ToastContainer/>
        <QueryClientProvider client={queryClient}>
          {(hasLoggedIn && userObject && Object.values(initialCacheLoaded).some(loadState => !loadState ))
            ? <InitialCacheLoading initialCacheLoaded={initialCacheLoaded} setInitialCacheLoaded={setInitialCacheLoaded}/>
            : <RouterProvider router={router} />
          }
        </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
