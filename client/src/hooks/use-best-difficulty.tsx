import { useEffect, useState } from 'react';

export interface MinerBestDifficulty {
  id: number;
  name: string;
  bestDifficulty: number;
  avatar: string;
  updatedAt: string;
}

export function useBestDifficulty() {
  const [miners, setMiners] = useState<MinerBestDifficulty[]>([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:3334/api/info')
        .then(res => res.json())
        .then(data => {
          if (data.highScores && data.highScores.length > 0) {
            setMiners([
              {
                id: 1,
                name: data.highScores[0].bestDifficultyUserAgent || "Unknown Miner",
                bestDifficulty: data.highScores[0].bestDifficulty,
                avatar: "https://placehold.co/32x32",
                updatedAt: data.highScores[0].updatedAt,
              }
            ]);
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
