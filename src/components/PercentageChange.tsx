
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface PercentageChangeProps {
  value: number;
  className?: string;
  showIcon?: boolean;
}

const PercentageChange = ({
  value,
  className,
  showIcon = true,
}: PercentageChangeProps) => {
  const isPositive = value > 0;
  const isZero = value === 0;
  
  const colorClass = isPositive 
    ? "text-crypto-up" 
    : isZero 
      ? "text-crypto-neutral" 
      : "text-crypto-down";
      
  return (
    <div className={cn("flex items-center gap-1", colorClass, className)}>
      {showIcon && !isZero && (
        isPositive 
          ? <ArrowUp className="h-3.5 w-3.5" /> 
          : <ArrowDown className="h-3.5 w-3.5" />
      )}
      <span>{Math.abs(value).toFixed(2)}%</span>
    </div>
  );
};

export default PercentageChange;
