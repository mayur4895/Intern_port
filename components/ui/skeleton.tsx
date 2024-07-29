import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-gray-100",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0    blur-sm   opacity-5  rotate-12  bg-gray-200/50 animate-shimmerPulse" />
    </div>
  );
}

export { Skeleton };
