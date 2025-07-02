import { useEffect, useState } from 'react';

export interface MinerBestDifficulty {
  id: number;
  name: string;
  bestDifficulty: number;
  avatar: string;
  count: number;
  totalHashRate: number;
  updatedAt: string;
}

export function useBestDifficulty() {
  const [miners, setMiners] = useState<MinerBestDifficulty[]>([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:3334/api/info')
        .then(res => res.json())
        .then(data => {
          if (data.userAgents && data.userAgents.length > 0) {
            // Convert userAgents to our miner format
            const liveMiners = data.userAgents.map((userAgent: any, index: number) => ({
              id: index + 1,
              name: userAgent.userAgent || "Unknown Miner",
              bestDifficulty: userAgent.bestDifficulty,
              avatar: "https://placehold.co/32x32",
              count: userAgent.count || 0,
              totalHashRate: userAgent.totalHashRate || 0,
              updatedAt: new Date().toISOString(), // Since this is live data
            }));
            
            setMiners(liveMiners);
          } else {
            setMiners([]);
          }
        })
        .catch(error => {
          console.error('Error fetching best difficulty data:', error);
          setMiners([]);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return { miners };
}
