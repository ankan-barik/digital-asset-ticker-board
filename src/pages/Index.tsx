
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import CryptoTable from "@/components/CryptoTable";
import { cryptoWebSocketService } from "@/services/cryptoWebSocket";
import { Button } from "@/components/ui/button";
import { SortAsc, Filter } from "lucide-react";

const CryptoTracker = () => {
  useEffect(() => {
    // Connect to our mock WebSocket and get cleanup function
    const disconnect = cryptoWebSocketService.connect();
    
    // Cleanup on component unmount
    return () => disconnect();
  }, []);
  
  return (
    <div className="container max-w-[1200px] mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Cryptocurrency Prices</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <SortAsc className="h-4 w-4" />
            Sort
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <CryptoTable />
      </div>
      <div className="mt-6 text-sm text-muted-foreground">
        <p>Data updates every 1.5 seconds to simulate real-time pricing</p>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-slate-50">
        <CryptoTracker />
      </div>
    </Provider>
  );
};

export default Index;
