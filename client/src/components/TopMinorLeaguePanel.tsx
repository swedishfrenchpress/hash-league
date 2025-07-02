import { useState } from 'react';
import { Trophy } from 'lucide-react';
import StatusIndicator from '@/components/ui/StatusIndicator';
import BasePanel from '@/components/ui/BasePanel';
import { COLORS } from '@/lib/constants';
import { formatLargeNumber, formatHashRate } from '@/lib/utils';
import { MinerBestDifficulty } from '@/hooks/use-best-difficulty';

interface TopMinorLeaguePanelProps {
  miners: MinerBestDifficulty[] | undefined;
  isVisible: boolean;
  onSelectMiner: (miner: MinerBestDifficulty) => void;
}

export default function TopMinorLeaguePanel({ miners, isVisible, onSelectMiner }: TopMinorLeaguePanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!isVisible || !miners) return null;
  
  // Sort miners by best difficulty (descending) to show highest first
  const sortedMiners = [...miners]
    .sort((a, b) => b.bestDifficulty - a.bestDifficulty)
    .slice(0, 10);
    
  
  return (
    <div className="w-80 rounded-lg shadow-[0_0_10px_#ffe600]">
      <BasePanel
        title="Live Miners"
        titleIcon={<Trophy className="text-yellow-400 h-5 w-5" />}
        isCollapsible={true}
        isCollapsed={!isExpanded}
        onToggleCollapse={() => setIsExpanded(!isExpanded)}
        borderColor="#ffe600"
        bodyClassName="p-0 max-h-[60vh] overflow-y-auto custom-scrollbar"
      >
        <table className="w-full text-sm table-fixed">
          <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "60%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <thead className="text-xs text-gray-400 uppercase font-jetbrains">
            <tr className="border-b border-gray-800">
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">Miner</th>
              <th className="px-4 py-2 text-left">Best Diff</th>
            </tr>
          </thead>
          <tbody>
            {sortedMiners.map((miner, idx) => (
              <tr 
                key={miner.id} 
                className="border-b border-gray-800 hover:bg-black hover:bg-opacity-40 cursor-pointer"
                onClick={() => onSelectMiner(miner)}
              >
                <td className="px-4 py-3 font-jetbrains">
                  {idx + 1}
                </td>
                <td className="px-4 py-3 font-semibold">
                  <div className="flex items-center">
                    <img 
                      src={miner.avatar} 
                      alt={miner.name} 
                      className="w-6 h-6 rounded-full mr-2 border border-[#ff00ea]" 
                    />
                    <div className="flex flex-col">
                      <span className="truncate max-w-[100px]">{miner.name}</span>
                      {miner.totalHashRate > 0 && (
                        <span className="text-xs text-gray-400 font-jetbrains">
                          {formatHashRate(miner.totalHashRate)}
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-jetbrains text-[#00f3ff]">
                  {formatLargeNumber(miner.bestDifficulty)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </BasePanel>
    </div>
  );
}

function getRankDisplay(rank: number | null): JSX.Element {
  // If rank is null or undefined, display a placeholder
  if (rank === null || rank === undefined) {
    return <span className="text-gray-500">--</span>;
  }
  
  if (rank === 1) {
    return <span className="text-orange-500 font-bold">#{rank}</span>;
  } else if (rank === 2) {
    return <span className="text-amber-500 font-bold">#{rank}</span>;
  } else if (rank === 3) {
    return <span className="text-yellow-500 font-bold">#{rank}</span>;
  }
  return <span>#{rank}</span>;
}