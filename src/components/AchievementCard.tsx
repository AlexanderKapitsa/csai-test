import {
  LaptopIcon,
  ShieldCheckIcon,
  SproutIcon,
  FactoryIcon,
  BrainIcon,
  CableIcon,
  ChartColumnBigIcon,
  LucideProps,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

const iconMap = {
  laptop: LaptopIcon,
  'shield-check': ShieldCheckIcon,
  sprout: SproutIcon,
  factory: FactoryIcon,
  brain: BrainIcon,
  cable: CableIcon,
  'chart-column-big': ChartColumnBigIcon,
};

interface AchievementCardProps {
  description: string;
  icon?: string;
  className?: string;
}

export default function AchievementCard({
  description,
  icon,
  className,
}: AchievementCardProps) {
  const Icon: React.ForwardRefExoticComponent<
    (Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>) | null
  > = icon ? iconMap[icon] : null;

  const [isXl, setIsXl] = useState(false);
  const [isLap, setIsLap] = useState(false);
  const [isCentered, setIsCentered] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lapQuery = window.matchMedia('(min-width: 1024px)');
    const xlQuery = window.matchMedia('(min-width: 1280px)');

    setIsLap(lapQuery.matches);
    setIsXl(xlQuery.matches);

    const handleResize = () => setIsLap(lapQuery.matches);
    lapQuery.addEventListener('change', handleResize);
    xlQuery.addEventListener('change', handleResize);

    return () => {
      lapQuery.removeEventListener('change', handleResize);
      xlQuery.removeEventListener('change', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isLap) return;

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
  }, [isLap]);

  const hoverClass = useMemo(
    () =>
      'bg-accent-700-light dark:border-none border-2 text-white dark:bg-primary-dark dark:text-white',
    []
  );

  const iconSize = isLap ? 50 : isXl ? 40 : 30;
  const enableMobileAutoHover = !isLap && isCentered;

  return (
    <div
      ref={cardRef}
      className={`group flex lap:flex-col md:min-h-24 lap:min-h-48 xl:min-h-52 lg:min-h-56 lg:max-h-56 items-center lap:justify-center gap-2 rounded-lg p-5 
        bg-accent-300-light 
        dark:bg-accent-300-dark 
        transition duration-300 
        hover:bg-accent-700-light 
        hover:border-2 
        hover:text-white 
        dark:hover:border-none 
        dark:hover:bg-primary-dark 
        dark:hover:text-white 
        ${enableMobileAutoHover ? hoverClass : ''} 
        ${className}`}
    >
      {Icon !== null && (
        <Icon
          size={iconSize}
          className={`text-accent-700-light dark:text-primary-dark group-hover:text-white transition-colors duration-300 ${enableMobileAutoHover ? 'text-white dark:text-white' : ''}`}
        />
      )}
      <span className="xl:mt-2 text-xs lap:text-center md:text-base xl:text-lg lg:text-xl">
        {description}
      </span>
    </div>
  );
}
