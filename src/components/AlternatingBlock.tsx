import { useEffect, useRef, useState } from 'react';

interface InfrastructureCardProps {
  description: string;
  className?: string;
}

export default function InfrastructureCard({
  description,
  className = '',
}: InfrastructureCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isLg, setIsLg] = useState(false);
  const [isCentered, setIsCentered] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    setIsLg(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsLg(e.matches);
    };

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  useEffect(() => {
    if (isLg) return;

    const checkPosition = () => {
      const el = cardRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowCenterY = window.innerHeight / 2;
      const elementCenterY = rect.top + rect.height / 2;
      const distanceToCenter = Math.abs(windowCenterY - elementCenterY);

      setIsCentered(distanceToCenter < 40);
    };

    checkPosition();
    window.addEventListener('scroll', checkPosition, { passive: true });
    window.addEventListener('resize', checkPosition);

    return () => {
      window.removeEventListener('scroll', checkPosition);
      window.removeEventListener('resize', checkPosition);
    };
  }, [isLg]);

  const hoverClass = 'bg-secondary-400-dark text-white dark:bg-primary-dark';

  return (
    <div
      ref={cardRef}
      className={`
        border-2 border-secondary-400-dark dark:border-primary-dark
        lap:flex lap:items-center
        rounded-lg px-4 py-6 text-center
        transition duration-300
        hover:bg-secondary-400-dark dark:hover:bg-primary-dark hover:text-white
        ${!isLg && isCentered ? hoverClass : ''}
        ${className}
      `}
    >
      <p className="text-sm md:text-base xl:text-lg lg:text-xl text-left lap:text-center">
        {description}
      </p>
    </div>
  );
}
