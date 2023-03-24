import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';

// context
import AppContextProvider from 'context';

// routes
import Router from './routes';

// theme
import ThemeProvider from './theme';

// components
import ScrollToTop from './components/ScrollToTop';

import 'react-toastify/dist/ReactToastify.css';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <AppContextProvider>
            <ToastContainer />
            <ScrollToTop />
            <Router />
          </AppContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
