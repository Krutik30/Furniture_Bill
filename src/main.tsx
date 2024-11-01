import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import { HelmetProvider } from 'react-helmet-async';
// import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

ReactDOM.render(
    <React.StrictMode>  
        <HelmetProvider>
            <RecoilRoot>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <App />
                </LocalizationProvider>
            </RecoilRoot>
        </HelmetProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
