import { Link } from 'react-router-dom';
import { LogoIcon } from '../components/ui/Logo';
import Button from '../components/ui/Button';

export default function ErrorPage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <LogoIcon size={80} className="mx-auto opacity-60" />

        <h1 className="mt-8 font-heading text-4xl font-bold text-[#2D2424]">
          Something went wrong
        </h1>
        <p className="mt-4 text-[#2D2424]/70">
          We hit a bump in the road. Try refreshing the page or head back home.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Button onClick={handleRefresh}>Refresh Page</Button>
          <Link to="/">
            <Button variant="outline">Go Home</Button>
          </Link>
        </div>

        <p className="mt-8 text-sm text-[#2D2424]/50">
          If this keeps happening,{' '}
          <Link to="/contact" className="text-[#F8A5B8] hover:underline">
            let us know
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
