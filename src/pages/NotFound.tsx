import { Link } from 'react-router-dom';
import { LogoIcon } from '../components/ui/Logo';
import Button from '../components/ui/Button';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta(
    'Page Not Found | Chloe Eats DFW',
    'The page you are looking for does not exist. Browse food spots, events, vlogs, or head back home.'
  );
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Animated burger logo */}
        <div className={prefersReducedMotion ? '' : 'animate-float'}>
          <LogoIcon size={96} className="mx-auto" />
        </div>

        <h1 className="mt-8 font-heading text-5xl font-bold text-[#2D2424]">
          404
        </h1>
        <p className="mt-3 font-heading text-xl text-[#E8919F]">
          This spot's not on the menu
        </p>
        <p className="mt-4 text-[#2D2424]/70">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Navigation links */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/food-spots">
            <Button variant="outline" size="sm">Food Spots</Button>
          </Link>
          <Link to="/events">
            <Button variant="outline" size="sm">Events</Button>
          </Link>
          <Link to="/vlog">
            <Button variant="outline" size="sm">Vlog</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="sm">Contact</Button>
          </Link>
        </div>

        {/* Take Me Home CTA */}
        <Link to="/" className="mt-6 inline-block">
          <Button size="lg">Take Me Home</Button>
        </Link>
      </div>
    </div>
  );
}
