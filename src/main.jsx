import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  BrowserRouter, HashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DataProviderCompo } from './Context/CreateContext.jsx'

// 1. Create the client instance outside the render
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Pass the client instance to the Provider */}
    <QueryClientProvider client={queryClient}>
    <DataProviderCompo>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </DataProviderCompo>  
    </QueryClientProvider>
  </StrictMode>
)