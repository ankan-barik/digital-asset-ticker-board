
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux-hooks";
import { sortCryptos } from "@/store/cryptoSlice";
import { ArrowDown, ArrowUp, SortAsc } from "lucide-react";
import PercentageChange from "./PercentageChange";
import CryptoLogo from "./CryptoLogo";
import PriceChange from "./PriceChange";
import MiniChart from "./MiniChart";

// Formatters for different number types
const priceFormatter = new Intl.NumberFormat('en-US', { 
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const marketCapFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
  maximumFractionDigits: 2,
});

const volumeFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
  maximumFractionDigits: 2,
});

const supplyFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const CryptoTable = () => {
  const dispatch = useAppDispatch();
  const { cryptos, sortColumn, sortDirection } = useAppSelector((state) => state.crypto);
  
  const handleSort = (column: string) => {
    dispatch(sortCryptos({ column }));
  };
  
  // Render header with sort functionality
  const renderSortableHeader = (label: string, column: string) => {
    const isSorted = sortColumn === column;
    
    return (
      <th 
        onClick={() => handleSort(column)} 
        className="px-4 py-3 text-sm font-medium text-left cursor-pointer hover:bg-slate-50"
      >
        <div className="flex items-center gap-1">
          {label}
          {isSorted && (
            sortDirection === 'desc' ? 
              <ArrowDown className="h-4 w-4" /> : 
              <ArrowUp className="h-4 w-4" />
          )}
        </div>
      </th>
    );
  };
  
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[1000px] border-collapse">
        <thead className="bg-muted/30 border-b">
          <tr>
            <th className="px-4 py-3 text-sm font-medium text-left w-12">#</th>
            {renderSortableHeader("Name", "name")}
            {renderSortableHeader("Price", "price")}
            {renderSortableHeader("1h %", "percentChange1h")}
            {renderSortableHeader("24h %", "percentChange24h")}
            {renderSortableHeader("7d %", "percentChange7d")}
            {renderSortableHeader("Market Cap", "marketCap")}
            {renderSortableHeader("Volume (24h)", "volume24h")}
            {renderSortableHeader("Circulating Supply", "circulatingSupply")}
            <th className="px-4 py-3 text-sm font-medium text-left">Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto) => (
            <tr 
              key={crypto.id}
              className="border-b hover:bg-muted/20 transition-colors"
            >
              <td className="px-4 py-4 text-sm font-medium text-muted-foreground">
                {crypto.id}
              </td>
              <td className="px-4 py-4">
                <CryptoLogo 
                  name={crypto.name} 
                  symbol={crypto.symbol} 
                  logo={crypto.logo}
                />
              </td>
              <td className="px-4 py-4 font-medium">
                <PriceChange
                  currentPrice={crypto.price}
                  previousPrice={crypto.previousPrice}
                  updated={crypto.updated}
                  formatter={priceFormatter}
                />
              </td>
              <td className="px-4 py-4">
                <PercentageChange value={crypto.percentChange1h} />
              </td>
              <td className="px-4 py-4">
                <PercentageChange value={crypto.percentChange24h} />
              </td>
              <td className="px-4 py-4">
                <PercentageChange value={crypto.percentChange7d} />
              </td>
              <td className="px-4 py-4">
                ${marketCapFormatter.format(crypto.marketCap)}
              </td>
              <td className="px-4 py-4">
                ${volumeFormatter.format(crypto.volume24h)}
              </td>
              <td className="px-4 py-4">
                {supplyFormatter.format(crypto.circulatingSupply)}M {crypto.symbol}
              </td>
              <td className="px-4 py-4">
                <MiniChart 
                  symbol={crypto.symbol} 
                  percentChange={crypto.percentChange7d} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
