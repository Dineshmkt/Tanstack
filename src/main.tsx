import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditUserPage from './pages/EditUserPage';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:id" element={<EditUserPage />} />
      </Routes>
    </BrowserRouter>
    </ErrorBoundary>
  </QueryClientProvider>
);

