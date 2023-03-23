import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// context
import AppContextProvider from 'context';

// routes
import Router from './routes';

// theme
import ThemeProvider from './theme';

// components
import ScrollToTop from './components/ScrollToTop';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <AppContextProvider>
            <ScrollToTop />
            <Router />
          </AppContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
