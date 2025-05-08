
import { cn } from "@/lib/utils";

interface PriceChangeProps {
  currentPrice: number;
  previousPrice?: number;
  updated: boolean;
  formatter: Intl.NumberFormat;
}

const PriceChange = ({
  currentPrice,
  previousPrice,
  updated,
  formatter
}: PriceChangeProps) => {
  // Determine if price went up or down
  let priceChangeDirection = "none";
  
  if (previousPrice && previousPrice !== currentPrice) {
    priceChangeDirection = currentPrice > previousPrice ? "up" : "down";
  }
  
  return (
    <span className={cn(
      "transition-colors duration-300",
      {
        "text-crypto-up": priceChangeDirection === "up" && updated,
        "text-crypto-down": priceChangeDirection === "down" && updated,
        "animate-pulse-price": updated,
      }
    )}>
      ${formatter.format(currentPrice)}
    </span>
  );
};

export default PriceChange;
