
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CryptoData {
  id: number;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  previousPrice?: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  updated: boolean;
}

export interface CryptoState {
  cryptos: CryptoData[];
  loading: boolean;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
}

const initialState: CryptoState = {
  cryptos: [
    {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      logo: "/bitcoin.png",
      price: 93759.48,
      percentChange1h: 0.43,
      percentChange24h: 0.93,
      percentChange7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      circulatingSupply: 19.85,
      maxSupply: 21,
      updated: false
    },
    {
      id: 2,
      name: "Ethereum",
      symbol: "ETH",
      logo: "/ethereum.png",
      price: 1802.46,
      percentChange1h: 0.60,
      percentChange24h: 3.21,
      percentChange7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547469307,
      circulatingSupply: 120.71,
      maxSupply: null,
      updated: false
    },
    {
      id: 3,
      name: "Tether",
      symbol: "USDT",
      logo: "/tether.png",
      price: 1.00,
      percentChange1h: 0.00,
      percentChange24h: 0.00,
      percentChange7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      circulatingSupply: 145.27,
      maxSupply: null,
      updated: false
    },
    {
      id: 4,
      name: "XRP",
      symbol: "XRP",
      logo: "/xrp.png",
      price: 2.22,
      percentChange1h: 0.46,
      percentChange24h: 0.54,
      percentChange7d: 6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      circulatingSupply: 58.39,
      maxSupply: 100,
      updated: false
    },
    {
      id: 5,
      name: "BNB",
      symbol: "BNB",
      logo: "/bnb.png",
      price: 606.65,
      percentChange1h: 0.09,
      percentChange24h: -1.20,
      percentChange7d: 3.73,
      marketCap: 85471956947,
      volume24h: 1874281784,
      circulatingSupply: 140.89,
      maxSupply: 200,
      updated: false
    },
    {
      id: 6,
      name: "Solana",
      symbol: "SOL",
      logo: "/solana.png",
      price: 151.51,
      percentChange1h: 0.53,
      percentChange24h: 1.26,
      percentChange7d: 14.74,
      marketCap: 78381958631,
      volume24h: 4881674486,
      circulatingSupply: 517.31,
      maxSupply: null,
      updated: false
    }
  ],
  loading: false,
  sortColumn: 'marketCap',
  sortDirection: 'desc'
};

const getRandomChange = (currentValue: number): number => {
  // Create a percentage change between -2% and +2%
  const changeFactor = 1 + (Math.random() * 0.04 - 0.02);
  return currentValue * changeFactor;
};

const updatePercentChange = (currentChange: number): number => {
  // Create a small random adjustment to the percent change
  const adjustment = (Math.random() * 0.3) - 0.15;
  return Number((currentChange + adjustment).toFixed(2));
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoPrices: (state) => {
      state.cryptos = state.cryptos.map(crypto => {
        const previousPrice = crypto.price;
        const newPrice = getRandomChange(previousPrice);
        
        return {
          ...crypto,
          previousPrice,
          price: Number(newPrice.toFixed(2)),
          percentChange1h: updatePercentChange(crypto.percentChange1h),
          percentChange24h: updatePercentChange(crypto.percentChange24h),
          percentChange7d: updatePercentChange(crypto.percentChange7d),
          volume24h: getRandomChange(crypto.volume24h),
          updated: true
        };
      });
    },
    resetUpdatedFlag: (state) => {
      state.cryptos = state.cryptos.map(crypto => ({
        ...crypto,
        updated: false
      }));
    },
    sortCryptos: (state, action: PayloadAction<{ column: string }>) => {
      const { column } = action.payload;
      
      // Toggle direction if clicking on same column again
      if (state.sortColumn === column) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortColumn = column;
        state.sortDirection = 'desc';
      }
      
      state.cryptos = [...state.cryptos].sort((a: any, b: any) => {
        const valA = a[column];
        const valB = b[column];
        
        const compareResult = valA > valB ? 1 : valA < valB ? -1 : 0;
        return state.sortDirection === 'asc' ? compareResult : -compareResult;
      });
    }
  }
});

export const { updateCryptoPrices, resetUpdatedFlag, sortCryptos } = cryptoSlice.actions;

export default cryptoSlice.reducer;
