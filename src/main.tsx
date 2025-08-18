// Librerías y hooks
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Estilos y assets
import './index.css';

// Rutas
import { Router } from './Rutas/Rutas';

// Contextos
import { ReproductorProvider } from './context/reproductorContext';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>   
    <QueryClientProvider client={queryClient}>
      <ReproductorProvider>
        <Router />
      </ReproductorProvider>
    </QueryClientProvider>
  </StrictMode>,
);