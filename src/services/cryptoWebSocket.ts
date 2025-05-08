
import { store } from '../store';
import { updateCryptoPrices, resetUpdatedFlag } from '../store/cryptoSlice';

class CryptoWebSocketService {
  private updateInterval: number | null = null;
  
  connect() {
    console.log('Connecting to mock WebSocket service...');
    
    // Simulate WebSocket connection by updating data every 1.5 seconds
    this.updateInterval = window.setInterval(() => {
      // Dispatch action to update crypto prices
      store.dispatch(updateCryptoPrices());
      
      // Reset the updated flag after 500ms to stop the highlight animation
      setTimeout(() => {
        store.dispatch(resetUpdatedFlag());
      }, 500);
      
    }, 1500);
    
    return () => this.disconnect();
  }
  
  disconnect() {
    console.log('Disconnecting from mock WebSocket service...');
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
}

export const cryptoWebSocketService = new CryptoWebSocketService();
