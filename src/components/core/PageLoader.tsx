import { VAPICard, VAPIText } from '../ui';
import { useVAPITheme } from '../../hooks/useSimpleVAPITheme';
import { cn } from '../../utils/cn';

interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message = "Loading..." }: PageLoaderProps) {
  const vapi = useVAPITheme();

  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <VAPICard className="p-12 text-center animate-fade-in">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className={cn(
            "absolute inset-0 animate-spin rounded-full border-4 border-t-transparent",
            vapi.isActive ? "border-vapi-accent-primary" : "border-fountain-pen-blue"
          )}></div>
          <div className={cn(
            "absolute inset-2 animate-spin rounded-full border-4 border-b-transparent opacity-50",
            vapi.isActive ? "border-vapi-accent-light" : "border-blue-300"
          )}
          style={{ animationDirection: 'reverse', animationDuration: '1s' }}
          ></div>
          <div className={cn(
            "absolute inset-0 animate-pulse rounded-full",
            vapi.isActive ? "bg-vapi-accent-primary/10" : "bg-fountain-pen-blue/10"
          )}></div>
        </div>
        <VAPIText type="secondary" className="animate-pulse-subtle text-lg font-medium">
          {message}
        </VAPIText>
        <div className="flex gap-1 justify-center mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full animate-bounce",
                vapi.isActive ? "bg-vapi-accent-primary" : "bg-fountain-pen-blue"
              )}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </VAPICard>
    </div>
  );
}