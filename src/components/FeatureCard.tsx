
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  index?: number;
}

const FeatureCard = ({ icon, title, description, className, index = 0 }: FeatureCardProps) => {
  const animationDelay = 100 + (index * 100);
  
  return (
    <div 
      className={cn(
        "glass-panel glass-panel-hover rounded-xl p-6 flex flex-col items-center text-center card-hover",
        className
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="mb-4 h-14 w-14 flex items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
};

export default FeatureCard;
