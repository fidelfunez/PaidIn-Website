import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface BtcPrice {
  price: number;
  change24h: number;
  changePercent24h: number;
}

interface BtcPriceTickerProps {
  isDarkBackground?: boolean;
}

export default function BtcPriceTicker({ isDarkBackground = false }: BtcPriceTickerProps) {
  const [btcPrice, setBtcPrice] = useState<BtcPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBtcPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();
        
        setBtcPrice({
          price: data.bitcoin.usd,
          change24h: data.bitcoin.usd_24h_change,
          changePercent24h: data.bitcoin.usd_24h_change,
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch BTC price:', error);
        setIsLoading(false);
      }
    };

    fetchBtcPrice();
    const interval = setInterval(fetchBtcPrice, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-sm">
        <div className="w-4 h-4 bg-bitcoin rounded-full animate-pulse"></div>
        <span className={isDarkBackground ? "text-white/80" : "text-gray-600"}>Loading BTC...</span>
      </div>
    );
  }

  if (!btcPrice) {
    return null;
  }

  const isPositive = btcPrice.changePercent24h >= 0;

  return (
    <div className="flex items-center space-x-2 text-sm">
      <img 
        src="/app - graphic designs/Bitcoin - logo.png" 
        alt="Bitcoin" 
        className="h-5 w-5"
      />
      <span className={`font-medium ${isDarkBackground ? "text-white" : "text-gray-900"}`}>
        ${btcPrice.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}
      </span>
      <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? (
          <TrendingUp className="h-3 w-3" />
        ) : (
          <TrendingDown className="h-3 w-3" />
        )}
        <span className="text-xs font-medium">
          {isPositive ? '+' : ''}{btcPrice.changePercent24h.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}