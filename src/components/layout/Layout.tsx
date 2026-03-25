import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  hideFooter?: boolean;
}

export default function Layout({ hideFooter = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0]">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content" className="flex-1 pt-16">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
