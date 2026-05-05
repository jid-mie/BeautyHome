import { ComponentType, LazyExoticComponent, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const RouteFallback = () => (
  <div className="flex min-h-[320px] items-center justify-center">
    <Loader2 className="animate-spin text-secondary" size={32} />
  </div>
);

interface LazyRouteProps {
  component: LazyExoticComponent<ComponentType>;
}

export function LazyRoute({ component: Component }: LazyRouteProps) {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Component />
    </Suspense>
  );
}
