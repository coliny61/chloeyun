import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  hideFooter?: boolean;
}

export default function Layout({ hideFooter = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBFC]">
      <Navigation />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}
