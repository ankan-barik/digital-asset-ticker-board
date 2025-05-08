
import { cn } from "@/lib/utils";

interface CryptoLogoProps {
  name: string;
  symbol: string;
  logo: string;
  className?: string;
}

const CryptoLogo = ({ name, symbol, logo, className }: CryptoLogoProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="w-8 h-8 relative">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center overflow-hidden",
            {
              "bg-crypto-bitcoin": symbol === "BTC",
              "bg-crypto-ethereum": symbol === "ETH",
              "bg-crypto-tether": symbol === "USDT",
              "bg-crypto-xrp": symbol === "XRP",
              "bg-crypto-bnb": symbol === "BNB",
              "bg-crypto-solana": symbol === "SOL",
            }
          )}
        >
          <img 
            src={`/lovable-uploads/${logo}`}
            alt={`${name} logo`}
            className="w-5 h-5 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `/placeholder.svg`;
            }}
          />
        </div>
      </div>
      <div className="flex flex-col items-start">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{symbol}</span>
      </div>
    </div>
  );
};

export default CryptoLogo;
