
import { useMemo } from 'react';

interface MiniChartProps {
  symbol: string;
  percentChange: number;
}

const generateChartPath = (points: number[], width: number, height: number): string => {
  if (points.length < 2) return '';
  
  const minValue = Math.min(...points);
  const maxValue = Math.max(...points);
  const range = maxValue - minValue || 1;
  
  const normalizedPoints = points.map((point) => {
    // Normalize to 0-1 range and invert (SVG y-axis goes from top to bottom)
    const normalizedY = 1 - ((point - minValue) / range);
    return normalizedY * height;
  });
  
  const pointInterval = width / (points.length - 1);
  
  // Start with the "move to" command at the first point
  let pathData = `M 0,${normalizedPoints[0]}`;
  
  // Add a "line to" command for each subsequent point
  for (let i = 1; i < normalizedPoints.length; i++) {
    const x = i * pointInterval;
    const y = normalizedPoints[i];
    pathData += ` L ${x},${y}`;
  }
  
  return pathData;
};

const MiniChart = ({ symbol, percentChange }: MiniChartProps) => {
  const width = 120;
  const height = 40;
  
  // Generate pseudo-random chart data based on symbol and percent change
  const chartData = useMemo(() => {
    // Use the crypto symbol as a seed for pseudo-randomness
    const seed = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const trend = percentChange > 0 ? 1 : -1;
    
    // Generate 20 data points
    const points = Array(20).fill(0).map((_, i) => {
      // Base value with small upward trend
      const baseValue = 100 + (i * trend);
      
      // Add some randomness based on the seed
      const randomFactor = Math.sin(i * (seed % 10) * 0.1) * 15;
      
      return baseValue + randomFactor;
    });
    
    return points;
  }, [symbol, percentChange]);
  
  const svgPath = generateChartPath(chartData, width, height);
  const isPositive = percentChange > 0;
  
  return (
    <div className="w-[120px] h-[40px]">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <path
          d={svgPath}
          fill="none"
          stroke={isPositive ? '#16c784' : '#ea384c'}
          strokeWidth={1.5}
        />
      </svg>
    </div>
  );
};

export default MiniChart;
