import { lazy, Suspense } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { useLocation } from './router';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const JoinPage = lazy(() => import('./pages/JoinPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function RouteFallback() {
  return <main className="route-fallback" aria-label="Loading page" />;
}

export default function App() {
  const location = useLocation();
  let page: React.ReactNode;

  switch (location.pathname) {
    case '/':
      page = <HomePage />;
      break;
    case '/about':
      page = <AboutPage />;
      break;
    case '/join':
      page = <JoinPage />;
      break;
    case '/contact':
      page = <ContactPage />;
      break;
    default:
      page = <HomePage />;
  }

  return (
    <Layout>
      <Suspense fallback={<RouteFallback />}>
        <div key={location.pathname}>{page}</div>
      </Suspense>
    </Layout>
  );
}
