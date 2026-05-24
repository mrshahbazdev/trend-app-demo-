import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, SquarePen, Star, ChevronDown, ChevronRight, Eye, EyeOff, TrendingUp, TrendingDown, AlertTriangle, Shield, Clock, Rocket, Users, Flag, Sparkles } from 'lucide-react';
import NewLogo from '../components/NewLogo';
import BottomNav from '../components/BottomNav';
import VerifiedBadge from '../components/VerifiedBadge';
import { useTheme } from '../context/ThemeContext';

const MiniChart = ({ color = '#2ECC71', down = false }: { color?: string; down?: boolean }) => (
  <svg width="60" height="24" viewBox="0 0 60 24">
    <path d={down ? 'M2 4 L12 8 L22 6 L32 14 L42 18 L52 16 L58 22' : 'M2 20 L12 16 L22 18 L32 10 L42 6 L52 8 L58 2'} fill="none" stroke={color} strokeWidth="1.5" />
  </svg>
);

const SentimentGauge = ({ value, label }: { value: number; label: string }) => {
  const { t } = useTheme();
  const angle = -90 + (value / 100) * 180;
  return (
    <div className="flex flex-col items-center">
      <svg width="80" height="50" viewBox="0 0 80 50">
        <path d="M10 45 A30 30 0 0 1 70 45" fill="none" stroke={t.border2} strokeWidth="6" strokeLinecap="round" />
        <path d="M10 45 A30 30 0 0 1 70 45" fill="none" stroke="url(#gauge)" strokeWidth="6" strokeLinecap="round" strokeDasharray="94" strokeDashoffset={94 - (value / 100) * 94} />
        <defs><linearGradient id="gauge" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#FF3B30" /><stop offset="50%" stopColor="#FF7A00" /><stop offset="100%" stopColor="#2ECC71" /></linearGradient></defs>
        <line x1="40" y1="45" x2={40 + 20 * Math.cos((angle * Math.PI) / 180)} y2={45 + 20 * Math.sin((angle * Math.PI) / 180)} stroke={t.text} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="text-[22px] font-bold" style={{ color: t.text }}>{value}</span>
      <span className="text-[12px] font-semibold" style={{ color: value > 60 ? t.green : value > 40 ? t.orange : t.red }}>{label}</span>
    </div>
  );
};

const HealthBadge = ({ score }: { score: number }) => {
  const { t } = useTheme();
  const color = score >= 85 ? t.green : score >= 70 ? t.green : t.orange;
  return (
    <div className="flex items-center gap-1">
      <Shield className="w-3.5 h-3.5" style={{ color }} />
      <span className="text-[13px] font-bold" style={{ color }}>{score}</span>
    </div>
  );
};

// ==================== MOCK DATA ====================
const cryptoAssets = [
  { rank: 1, symbol: 'BTC', name: 'Bitcoin', price: '$68,543.21', change: '+1.32%', up: true, mcap: '$1.35T', color: '#F7931A', starred: true },
  { rank: 2, symbol: 'ETH', name: 'Ethereum', price: '$3,412.77', change: '+0.78%', up: true, mcap: '$410.2B', color: '#627EEA', starred: false },
  { rank: 3, symbol: 'SOL', name: 'Solana', price: '$165.41', change: '+2.05%', up: true, mcap: '$77.2B', color: '#9945FF', starred: false },
  { rank: 4, symbol: 'BNB', name: 'BNB', price: '$592.14', change: '+0.56%', up: true, mcap: '$87.9B', color: '#F3BA2F', starred: false },
  { rank: 5, symbol: 'XRP', name: 'XRP', price: '$0.5532', change: '-0.34%', up: false, mcap: '$30.1B', color: '#23292F', starred: false },
  { rank: 6, symbol: 'ADA', name: 'Cardano', price: '$0.4721', change: '+1.18%', up: true, mcap: '$16.8B', color: '#0033AD', starred: false },
  { rank: 7, symbol: 'DOGE', name: 'Dogecoin', price: '$0.1542', change: '+3.28%', up: true, mcap: '$22.4B', color: '#C2A633', starred: false },
  { rank: 8, symbol: 'TON', name: 'TON', price: '$6.53', change: '+3.75%', up: true, mcap: '$16.3B', color: '#0098EA', starred: false },
  { rank: 9, symbol: 'AVAX', name: 'Avalanche', price: '$34.21', change: '+5.08%', up: true, mcap: '$13.7B', color: '#E84142', starred: false },
  { rank: 10, symbol: 'LINK', name: 'Chainlink', price: '$15.82', change: '+4.12%', up: true, mcap: '$8.9B', color: '#2A5ADA', starred: false },
  { rank: 11, symbol: 'TUP', name: 'TrendUp', price: '$0.0724', change: '+3.41%', up: true, mcap: '$72.4M', color: '#2ECC71', starred: true },
];

const featuredMovers = [
  { symbol: 'SOL', price: '$165.41', change: '+6.21%', color: '#9945FF' },
  { symbol: 'AVAX', price: '$34.21', change: '+5.08%', color: '#E84142' },
  { symbol: 'LINK', price: '$15.82', change: '+4.12%', color: '#2A5ADA' },
  { symbol: 'TON', price: '$6.53', change: '+3.75%', color: '#0098EA' },
  { symbol: 'DOGE', price: '$0.1542', change: '+3.28%', color: '#C2A633' },
];

const defiProtocols = [
  { rank: 1, symbol: 'UNI', name: 'Uniswap', price: '$7.82', change: '+1.65%', up: true, tvl: '$6.12B', color: '#FF007A' },
  { rank: 2, symbol: 'AAVE', name: 'Aave', price: '$98.41', change: '+2.23%', up: true, tvl: '$11.36B', color: '#B6509E' },
  { rank: 3, symbol: 'MKR', name: 'Maker', price: '$2,184.21', change: '+0.91%', up: true, tvl: '$5.47B', color: '#1AAB9B' },
  { rank: 4, symbol: 'LDO', name: 'Lido DAO', price: '$1.72', change: '+3.68%', up: true, tvl: '$13.22B', color: '#00A3FF' },
  { rank: 5, symbol: 'CRV', name: 'Curve DAO', price: '$0.458', change: '+2.07%', up: true, tvl: '$2.18B', color: '#FF3B30' },
  { rank: 6, symbol: 'RUNE', name: 'THORChain', price: '$5.71', change: '+1.21%', up: true, tvl: '$898M', color: '#33FF99' },
  { rank: 7, symbol: 'SUSHI', name: 'SushiSwap', price: '$1.23', change: '-0.18%', up: false, tvl: '$402M', color: '#FA52A0' },
  { rank: 8, symbol: 'COMP', name: 'Compound', price: '$49.62', change: '+0.74%', up: true, tvl: '$1.08B', color: '#00D395' },
  { rank: 9, symbol: 'PENDLE', name: 'Pendle', price: '$4.35', change: '+3.12%', up: true, tvl: '$1.35B', color: '#0DB0B8' },
  { rank: 10, symbol: 'JUP', name: 'Jupiter', price: '$0.841', change: '+2.89%', up: true, tvl: '$682M', color: '#31D0AA' },
  { rank: 11, symbol: 'TUP', name: 'TrendUp DeFi Rail', price: '$0.0724', change: '+3.41%', up: true, tvl: '$72.4M', color: '#2ECC71', starred: true },
];

const aiProjects = [
  { symbol: 'RNDR', name: 'Render', price: '$6.21', change: '+1.11%', up: true, aiRank: '#1', color: '#FF3B30' },
  { symbol: 'FET', name: 'Fetch.ai', price: '$2.48', change: '+2.85%', up: true, aiRank: '#2', color: '#1E1E2E' },
  { symbol: 'TAO', name: 'Bittensor', price: '$412.37', change: '+3.64%', up: true, aiRank: '#3', color: '#111' },
  { symbol: 'AKT', name: 'Akash Network', price: '$3.72', change: '+1.93%', up: true, aiRank: '#4', color: '#FF3B30' },
  { symbol: 'OCEAN', name: 'Ocean Protocol', price: '$1.18', change: '+2.07%', up: true, aiRank: '#5', color: '#333' },
  { symbol: 'AGIX', name: 'SingularityNET', price: '$0.78', change: '+1.56%', up: true, aiRank: '#6', color: '#7C3AED' },
  { symbol: 'NEAR AI', name: 'NEAR AI', price: '$5.34', change: '+3.17%', up: true, aiRank: '#7', color: '#00C08B' },
  { symbol: 'ORAI', name: 'Oraichain', price: '$5.12', change: '-0.28%', up: false, aiRank: '#8', color: '#1B1B3A' },
  { symbol: 'NMR', name: 'Numeraire', price: '$16.83', change: '-0.64%', up: false, aiRank: '#9', color: '#0B0F1A' },
  { symbol: 'VAI', name: 'Vaiot', price: '$0.1247', change: '+0.92%', up: true, aiRank: '#10', color: '#5B21B6' },
  { symbol: 'TUP', name: 'TrendUp AI', price: '$0.0724', change: '+3.41%', up: true, aiRank: '#11', color: '#2ECC71', starred: true },
];

const chains = [
  { rank: 1, name: 'Ethereum', type: 'L1', tvl: '$62.41B', addresses: '503K addresses', change: '+2.35%', up: true, health: 91, color: '#627EEA' },
  { rank: 2, name: 'Solana', type: 'L1', tvl: '$7.18B', addresses: '1.12M addresses', change: '+4.71%', up: true, health: 88, color: '#9945FF' },
  { rank: 3, name: 'BNB Chain', type: 'L1', tvl: '$5.74B', addresses: '1.03M addresses', change: '+1.92%', up: true, health: 84, color: '#F3BA2F' },
  { rank: 4, name: 'Avalanche', type: 'L1', tvl: '$1.75B', addresses: '362K addresses', change: '+3.84%', up: true, health: 79, color: '#E84142' },
  { rank: 5, name: 'Base', type: 'L2', tvl: '$3.21B', addresses: '780K addresses', change: '+5.26%', up: true, health: 76, color: '#0052FF' },
  { rank: 6, name: 'Arbitrum', type: 'L2', tvl: '$2.64B', addresses: '612K addresses', change: '+2.18%', up: true, health: 74, color: '#28A0F0' },
  { rank: 7, name: 'Optimism', type: 'L2', tvl: '$1.12B', addresses: '344K addresses', change: '+1.32%', up: true, health: 72, color: '#FF0420' },
  { rank: 8, name: 'Polygon', type: 'L2', tvl: '$1.05B', addresses: '527K addresses', change: '+1.08%', up: true, health: 70, color: '#8247E5' },
  { rank: 9, name: 'Sui', type: 'L1', tvl: '$0.89B', addresses: '268K addresses', change: '+6.45%', up: true, health: 68, color: '#4DA2FF' },
  { rank: 10, name: 'Aptos', type: 'L1', tvl: '$0.74B', addresses: '237K addresses', change: '+3.61%', up: true, health: 66, color: '#2DD8A3' },
  { rank: 11, name: 'Cosmos', type: 'L1', tvl: '$0.61B', addresses: '185K addresses', change: '+2.74%', up: true, health: 63, color: '#2E3148' },
];

const trendingProjects = [
  { rank: 1, name: 'NEXUS', ticker: '$NEX', category: 'Infrastructure', momentum: 95, label: 'Extreme', mentions: '12.4K', mentionChange: '+148%', followerGrowth: '+32.6%', health: 92, color: '#7C3AED' },
  { rank: 2, name: 'SOLACE', ticker: '$SOLC', category: 'DeFi', momentum: 88, label: 'Very High', mentions: '8.7K', mentionChange: '+126%', followerGrowth: '+28.4%', health: 89, color: '#14B8A6' },
  { rank: 3, name: 'VOIDAI', ticker: '$VAI', category: 'AI', momentum: 82, label: 'Very High', mentions: '6.1K', mentionChange: '+92%', followerGrowth: '+21.7%', health: 84, color: '#06B6D4' },
  { rank: 4, name: 'CHAINLINK', ticker: '$LINK', category: 'Oracle', momentum: 75, label: 'High', mentions: '4.3K', mentionChange: '+78%', followerGrowth: '+18.3%', health: 88, color: '#2A5ADA' },
  { rank: 5, name: 'RENDER', ticker: '$RNDR', category: 'AI / Compute', momentum: 72, label: 'High', mentions: '3.8K', mentionChange: '+63%', followerGrowth: '+16.2%', health: 83, color: '#FF3B30' },
];

const verifiedProjects = [
  { ticker: '$AURA', name: 'Aura Finance', category: 'Cross-chain Money Market', chain: 'Ethereum', followers: '86.3K', health: 89, status: 'Active', color: '#7C3AED' },
  { ticker: '$VRTX', name: 'Vertex Protocol', category: 'On-chain Derivatives', chain: 'Arbitrum', followers: '64.7K', health: 85, status: 'Active', color: '#FF3B30' },
  { ticker: '$LUMI', name: 'Lumi Network', category: 'RWA Infrastructure', chain: 'Polygon', followers: '42.1K', health: 88, status: 'Active', color: '#06B6D4' },
  { ticker: '$PWR', name: 'PowerGrid', category: 'AI Compute Network', chain: 'Solana', followers: '31.8K', health: 83, status: 'Proposal Live', color: '#14B8A6' },
];

const recentlyVerified = [
  { ticker: '$DRFT', name: 'Drift Protocol', chain: 'Solana', followers: '22.4K', health: 81, time: '2h ago' },
  { ticker: '$ZETA', name: 'ZetaChain', chain: 'ZetaChain', followers: '18.7K', health: 84, time: '5h ago' },
  { ticker: '$MAV', name: 'Maverick', chain: 'Base', followers: '15.3K', health: 82, time: '8h ago' },
];

const proposals = [
  { project: 'Chainlink (LINK)', desc: 'Increase Data Node Rewards', tag: 'Parameter Change', tagColor: '#2979FF', turnout: '82.4%', quorum: '40%', forPct: '78.6%', againstPct: '21.4%', health: 84, healthLabel: 'Excellent', status: 'Active', timeLeft: '2d 14h left', color: '#2A5ADA' },
  { project: 'Bitcoin (BTC)', desc: 'Reduce Block Subsidy Halving Adjustment', tag: 'Protocol Parameter', tagColor: '#F7931A', turnout: '74.1%', quorum: '40%', forPct: '68.9%', againstPct: '31.1%', health: 75, healthLabel: 'Good', status: 'Active', timeLeft: '1d 8h left', color: '#F7931A' },
  { project: 'Solana (SOL)', desc: 'SIMD-0228: Compute Budget Increase', tag: 'Network Upgrade', tagColor: '#9945FF', turnout: '71.6%', quorum: '33%', forPct: '83.2%', againstPct: '16.8%', health: 82, healthLabel: 'Excellent', status: 'Active', timeLeft: '3d 5h left', color: '#9945FF' },
  { project: 'Aave (AAVE)', desc: 'Risk Parameter Updates V3', tag: 'Risk Parameter', tagColor: '#B6509E', turnout: '69.3%', quorum: '35%', forPct: '64.7%', againstPct: '35.3%', health: 72, healthLabel: 'Good', status: 'Active', timeLeft: '1d 20h left', color: '#B6509E' },
  { project: 'Arbitrum (ARB)', desc: 'Increase L2 Sequencer Uptime Incentives', tag: 'Treasury Spend', tagColor: '#28A0F0', turnout: '66.8%', quorum: '40%', forPct: '77.1%', againstPct: '22.9%', health: 74, healthLabel: 'Good', status: 'Active', timeLeft: '2d 1h left', color: '#28A0F0' },
];

const highTrustProjects = [
  { name: 'Oceanic', ticker: 'OCE', chain: 'Ethereum', score: 92, followers: '28.7K', lastUpdate: '2h ago', status: 'Active', color: '#14B8A6' },
  { name: 'Synapse', ticker: 'SYN', chain: 'Polygon', score: 90, followers: '19.3K', lastUpdate: '4h ago', status: 'Active', color: '#7C3AED' },
  { name: 'PlutusDAO', ticker: 'PLS', chain: 'Arbitrum', score: 88, followers: '14.8K', lastUpdate: '6h ago', status: 'Active', color: '#FF3B30' },
  { name: 'Helio', ticker: 'HLO', chain: 'BNB Chain', score: 87, followers: '11.2K', lastUpdate: '8h ago', status: 'Active', color: '#F3BA2F' },
  { name: 'Aurora', ticker: 'AUR', chain: 'Solana', score: 86, followers: '9.6K', lastUpdate: '10h ago', status: 'Active', color: '#E84142' },
  { name: 'Streamr', ticker: 'DATA', chain: 'Ethereum', score: 84, followers: '8.1K', lastUpdate: '12h ago', status: 'Updated', color: '#FF007A' },
  { name: 'BlockMesh', ticker: 'BMX', chain: 'Avalanche', score: 83, followers: '6.7K', lastUpdate: '14h ago', status: 'Updated', color: '#E84142' },
  { name: 'Nimble', ticker: 'NMBL', chain: 'Base', score: 82, followers: '5.4K', lastUpdate: '16h ago', status: 'Active', color: '#0052FF' },
];

const topGainers = [
  { rank: 1, symbol: 'BRETT', name: 'Brett', price: '$0.1287', change: '+35.42%', mcap: '$1.28B', color: '#4169E1' },
  { rank: 2, symbol: 'POPCAT', name: 'Popcat', price: '$0.7531', change: '+28.11%', mcap: '$735.6M', color: '#FF69B4' },
  { rank: 3, symbol: 'WIF', name: 'dogwifhat', price: '$2.41', change: '+24.67%', mcap: '$2.41B', color: '#8B4513' },
  { rank: 4, symbol: 'FLOKI', name: 'Floki Inu', price: '$0.0001452', change: '+19.88%', mcap: '$1.37B', color: '#FFD700' },
  { rank: 5, symbol: 'BONK', name: 'Bonk', price: '$0.00002348', change: '+18.23%', mcap: '$1.61B', color: '#FF8C00' },
  { rank: 6, symbol: 'SUI', name: 'Sui', price: '$1.82', change: '+16.74%', mcap: '$5.58B', color: '#4DA2FF' },
  { rank: 7, symbol: 'TAO', name: 'Bittensor', price: '$418.72', change: '+14.33%', mcap: '$3.07B', color: '#111' },
  { rank: 8, symbol: 'JUP', name: 'Jupiter', price: '$1.21', change: '+12.61%', mcap: '$1.63B', color: '#31D0AA' },
  { rank: 9, symbol: 'RNDR', name: 'Render', price: '$6.21', change: '+11.08%', mcap: '$2.41B', color: '#FF3B30' },
  { rank: 10, symbol: 'AR', name: 'Arweave', price: '$32.78', change: '+10.21%', mcap: '$2.15B', color: '#222' },
];

// ==================== SUB COMPONENTS ====================
function PriceFilterPills({ active, setActive, items }: { active: string; setActive: (s: string) => void; items: string[] }) {
  const { t } = useTheme();
  return (
    <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto">
      {items.map(item => (
        <button key={item} onClick={() => setActive(item)}
          className="px-4 py-[6px] rounded-full text-[13px] font-semibold whitespace-nowrap transition-all"
          style={{
            backgroundColor: active === item ? (item === 'More' ? 'transparent' : `${t.green}20`) : 'transparent',
            border: `1.5px solid ${active === item ? t.green : t.border2}`,
            color: active === item ? t.green : t.textMuted,
          }}>
          {item === 'More' ? <span className="flex items-center gap-1">More <ChevronDown className="w-3.5 h-3.5" /></span> : item}
        </button>
      ))}
    </div>
  );
}

function AssetRow({ rank, symbol, name, price, change, up, last, starred, color }: { rank: number; symbol: string; name: string; price: string; change: string; up: boolean; last: string; starred?: boolean; color: string }) {
  const { t } = useTheme();
  return (
    <div className="flex items-center py-3 px-4" style={{ borderBottom: `1px solid ${t.border}` }}>
      <span className="w-[24px] text-[13px] font-medium" style={{ color: t.textMuted }}>{rank}</span>
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: color }}>
          <span className="text-[11px] font-bold text-white">{symbol.slice(0, 2)}</span>
        </div>
        <div>
          <span className="text-[14px] font-bold block" style={{ color: t.text }}>{symbol}</span>
          <span className="text-[11px]" style={{ color: t.textMuted }}>{name}</span>
        </div>
      </div>
      <span className="text-[13px] font-semibold w-[80px] text-right" style={{ color: t.text }}>{price}</span>
      <span className="text-[12px] font-bold w-[60px] text-right" style={{ color: up ? t.green : t.red }}>{change}</span>
      <div className="w-[60px] flex justify-center"><MiniChart color={up ? t.green : t.red} down={!up} /></div>
      <span className="text-[12px] font-medium w-[60px] text-right" style={{ color: t.textMuted }}>{last}</span>
      <button className="ml-2">
        <Star className="w-4 h-4" style={{ color: starred ? t.green : t.textDim, fill: starred ? t.green : 'none' }} />
      </button>
    </div>
  );
}

// ==================== PRICES TAB CONTENT ====================
function PricesAllContent() {
  const { t } = useTheme();
  return (
    <div>
      {/* Market Pulse + Breaking Market */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex gap-2">
          <div className="flex-1 rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.green }} />
              <span className="text-[13px] font-bold" style={{ color: t.text }}>Market Pulse</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${t.green}20`, color: t.green }}>LIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px]" style={{ color: t.textMuted }}>Greed</span>
              <span className="text-[16px] font-bold" style={{ color: t.green }}>72</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[11px]" style={{ color: t.textMuted }}>Momentum</span>
              <TrendingUp className="w-3 h-3" style={{ color: t.green }} />
            </div>
          </div>
          <div className="flex-[1.5] rounded-[14px] p-3 overflow-hidden relative" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: `${t.orange}30`, color: t.orange, border: `1px solid ${t.orange}` }}>BREAKING MARKET</span>
            <p className="text-[13px] font-bold mt-1.5" style={{ color: t.text }}>BTC breaks $68K as spot volumes surge</p>
            <p className="text-[11px] mt-0.5" style={{ color: t.textMuted }}>Institutions lead inflows as market sentiment flips bullish.</p>
          </div>
        </div>
      </div>

      {/* Quick Price Cards */}
      <div className="flex gap-2 px-4 py-2 overflow-x-auto">
        {[
          { symbol: 'BTC', price: '$68,543.21', change: '+1.32%', color: '#F7931A' },
          { symbol: 'ETH', price: '$3,412.77', change: '+0.78%', color: '#627EEA' },
          { symbol: 'SOL', price: '$165.41', change: '+2.05%', color: '#9945FF' },
        ].map(c => (
          <div key={c.symbol} className="flex items-center gap-2 rounded-[12px] px-3 py-2.5 min-w-[120px]" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: c.color }}>
              <span className="text-[8px] font-bold text-white">{c.symbol.slice(0, 2)}</span>
            </div>
            <div>
              <span className="text-[12px] font-bold block" style={{ color: t.text }}>{c.price}</span>
              <span className="text-[10px] font-bold" style={{ color: t.green }}>{c.change}</span>
            </div>
            <MiniChart />
          </div>
        ))}
      </div>

      {/* Asset Table */}
      <div className="mt-2">
        <div className="flex items-center px-4 py-2" style={{ borderBottom: `1px solid ${t.border}` }}>
          <span className="text-[11px] font-semibold w-[24px]" style={{ color: t.textMuted }}>#</span>
          <span className="text-[11px] font-semibold flex-1" style={{ color: t.textMuted }}>Asset</span>
          <span className="text-[11px] font-semibold w-[80px] text-right" style={{ color: t.textMuted }}>Price</span>
          <span className="text-[11px] font-semibold w-[60px] text-right" style={{ color: t.textMuted }}>24h %</span>
          <span className="text-[11px] font-semibold w-[60px] text-center" style={{ color: t.textMuted }}>7D Chart</span>
          <span className="text-[11px] font-semibold w-[60px] text-right" style={{ color: t.textMuted }}>Mcap</span>
          <span className="w-6" />
        </div>
        {cryptoAssets.map(a => (
          <AssetRow key={a.symbol} rank={a.rank} symbol={a.symbol} name={a.name} price={a.price} change={a.change} up={a.up} last={a.mcap} starred={a.starred} color={a.color} />
        ))}
      </div>
    </div>
  );
}

function PricesCryptoContent() {
  const { t } = useTheme();
  return (
    <div>
      {/* Market Overview */}
      <div className="px-4 pt-3">
        <div className="flex gap-2">
          <div className="flex-1 rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
            <span className="text-[12px] font-medium" style={{ color: t.textMuted }}>Market Overview</span>
            <div className="mt-2">
              <span className="text-[11px]" style={{ color: t.textMuted }}>BTC Dominance</span>
              <p className="text-[18px] font-bold" style={{ color: t.text }}>54.32%</p>
              <span className="text-[11px] font-bold" style={{ color: t.green }}>+0.68% (24h)</span>
            </div>
            <div className="mt-2">
              <span className="text-[11px]" style={{ color: t.textMuted }}>Total Market Cap</span>
              <p className="text-[18px] font-bold" style={{ color: t.text }}>$2.43T</p>
              <span className="text-[11px] font-bold" style={{ color: t.green }}>+1.73% (24h)</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
              <span className="text-[12px] font-medium" style={{ color: t.textMuted }}>Top Movers (24h)</span>
              {[
                { r: 1, s: 'SOL', c: '+6.21%', col: '#9945FF' },
                { r: 2, s: 'AVAX', c: '+5.08%', col: '#E84142' },
                { r: 3, s: 'LINK', c: '+4.12%', col: '#2A5ADA' },
              ].map(m => (
                <div key={m.s} className="flex items-center gap-2 mt-1.5">
                  <span className="text-[11px]" style={{ color: t.textMuted }}>{m.r}</span>
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: m.col }} />
                  <span className="text-[12px] font-semibold" style={{ color: t.text }}>{m.s}</span>
                  <span className="text-[11px] font-bold ml-auto" style={{ color: t.green }}>{m.c}</span>
                </div>
              ))}
            </div>
            <div className="rounded-[14px] p-3 flex flex-col items-center" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
              <span className="text-[12px] font-medium" style={{ color: t.textMuted }}>Fear & Greed Index</span>
              <SentimentGauge value={62} label="Greed" />
              <span className="text-[10px] mt-1" style={{ color: t.textMuted }}>Yesterday: 59</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Movers */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[14px]">⚡</span>
            <span className="text-[15px] font-bold" style={{ color: t.text }}>Featured Movers</span>
          </div>
          <span className="text-[13px] font-semibold" style={{ color: t.green }}>View all</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {featuredMovers.map(m => (
            <div key={m.symbol} className="flex items-center gap-2 min-w-[100px]">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: m.color }}>
                <span className="text-[9px] font-bold text-white">{m.symbol.slice(0, 2)}</span>
              </div>
              <div>
                <span className="text-[13px] font-bold block" style={{ color: t.text }}>{m.symbol}</span>
                <span className="text-[11px]" style={{ color: t.textMuted }}>{m.price}</span>
                <span className="text-[10px] font-bold block" style={{ color: t.green }}>{m.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crypto Table */}
      <div className="mt-3">
        <div className="flex items-center px-4 py-2" style={{ borderBottom: `1px solid ${t.border}` }}>
          <span className="text-[11px] font-semibold w-[24px]" style={{ color: t.textMuted }}>#</span>
          <span className="text-[11px] font-semibold flex-1" style={{ color: t.textMuted }}>Asset</span>
          <span className="text-[11px] font-semibold w-[80px] text-right" style={{ color: t.textMuted }}>Price</span>
          <span className="text-[11px] font-semibold w-[60px] text-right" style={{ color: t.textMuted }}>24h %</span>
          <span className="text-[11px] font-semibold w-[60px] text-center" style={{ color: t.textMuted }}>7D Chart</span>
          <span className="text-[11px] font-semibold w-[60px] text-right" style={{ color: t.textMuted }}>Market Cap</span>
          <span className="w-6" />
        </div>
        {cryptoAssets.map(a => (
          <AssetRow key={a.symbol} rank={a.rank} symbol={a.symbol} name={a.name} price={a.price} change={a.change} up={a.up} last={a.mcap} starred={a.starred} color={a.color} />
        ))}
      </div>

      {/* Live price update footer */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.green }} />
          <span className="text-[11px]" style={{ color: t.textMuted }}>Prices updated just now</span>
        </div>
        <button className="flex items-center gap-1 text-[12px] font-medium" style={{ color: t.textMuted }}>
          USD <ChevronDown className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

function PricesChainsContent() {
  const { t } = useTheme();
  return (
    <div>
      {/* Hero */}
      <div className="px-4 pt-3">
        <div className="rounded-[16px] p-4 relative overflow-hidden" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <h3 className="text-[18px] font-bold" style={{ color: t.text }}>Chain Ecosystems</h3>
          <p className="text-[12px] mt-1 max-w-[200px]" style={{ color: t.textMuted }}>Explore leading blockchain networks powering Web3. Track TVL, activity, momentum & ecosystem health.</p>
          <div className="mt-3">
            <span className="text-[12px] font-medium" style={{ color: t.textMuted }}>Network Activity (24h)</span>
            <div className="flex gap-3 mt-2">
              {[
                { label: 'Active Addresses', value: '5.62M', change: '+8.71%' },
                { label: 'Transactions', value: '18.92M', change: '+10.34%' },
                { label: 'TVL (All Chains)', value: '$186.7B', change: '+5.24%' },
                { label: 'New Contracts', value: '42,631', change: '+7.12%' },
              ].map(s => (
                <div key={s.label} className="flex-1">
                  <span className="text-[9px]" style={{ color: t.textMuted }}>{s.label}</span>
                  <p className="text-[14px] font-bold" style={{ color: t.text }}>{s.value}</p>
                  <span className="text-[10px] font-bold" style={{ color: t.green }}>{s.change}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chain Table */}
      <div className="mt-3">
        <div className="flex items-center px-4 py-2" style={{ borderBottom: `1px solid ${t.border}` }}>
          <span className="text-[11px] font-semibold w-[24px]" style={{ color: t.textMuted }}>#</span>
          <span className="text-[11px] font-semibold flex-1" style={{ color: t.textMuted }}>Chain</span>
          <span className="text-[11px] font-semibold w-[80px]" style={{ color: t.textMuted }}>TVL / Addresses</span>
          <span className="text-[11px] font-semibold w-[50px] text-right" style={{ color: t.textMuted }}>24h %</span>
          <span className="text-[11px] font-semibold w-[50px] text-center" style={{ color: t.textMuted }}>7D Chart</span>
          <span className="text-[11px] font-semibold w-[40px] text-center" style={{ color: t.textMuted }}>Health</span>
          <span className="w-6" />
        </div>
        {chains.map(c => (
          <div key={c.name} className="flex items-center py-3 px-4" style={{ borderBottom: `1px solid ${t.border}` }}>
            <span className="w-[24px] text-[13px] font-medium" style={{ color: t.textMuted }}>{c.rank}</span>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: c.color }}>
                <span className="text-[9px] font-bold text-white">{c.name.slice(0, 2)}</span>
              </div>
              <div>
                <span className="text-[13px] font-bold" style={{ color: t.text }}>{c.name}</span>
                <span className="text-[10px] ml-1 px-1 py-0.5 rounded" style={{ backgroundColor: t.bgTer, color: t.textMuted }}>{c.type}</span>
              </div>
            </div>
            <div className="w-[80px]">
              <span className="text-[12px] font-semibold block" style={{ color: t.text }}>{c.tvl}</span>
              <span className="text-[10px]" style={{ color: t.textMuted }}>{c.addresses}</span>
            </div>
            <span className="text-[12px] font-bold w-[50px] text-right" style={{ color: c.up ? t.green : t.red }}>{c.change}</span>
            <div className="w-[50px] flex justify-center"><MiniChart color={t.green} /></div>
            <div className="w-[40px] flex justify-center">
              <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center" style={{ border: `2px solid ${c.health >= 80 ? t.green : c.health >= 70 ? t.green : t.orange}` }}>
                <span className="text-[9px] font-bold" style={{ color: c.health >= 80 ? t.green : c.health >= 70 ? t.green : t.orange }}>{c.health}</span>
              </div>
            </div>
            <Star className="w-4 h-4 ml-2" style={{ color: t.textDim }} />
          </div>
        ))}
      </div>

      {/* L1 vs L2 */}
      <div className="px-4 mt-4 flex gap-2">
        <div className="flex-1 rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <span className="text-[13px] font-bold" style={{ color: t.text }}>Layer 1 vs Layer 2</span>
          <span className="text-[10px] block" style={{ color: t.textMuted }}>TVL Comparison</span>
          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="text-[11px] font-bold" style={{ color: t.green }}>Layer 1</span>
              <p className="text-[14px] font-bold" style={{ color: t.text }}>$78.07B</p>
              <span className="text-[10px]" style={{ color: t.textMuted }}>72.1%</span>
            </div>
            <span className="text-[12px] font-bold px-2 py-1 rounded-full" style={{ backgroundColor: t.bgTer, color: t.textMuted }}>VS</span>
            <div className="text-right">
              <span className="text-[11px] font-bold" style={{ color: t.blue }}>Layer 2</span>
              <p className="text-[14px] font-bold" style={{ color: t.text }}>$30.38B</p>
              <span className="text-[10px]" style={{ color: t.textMuted }}>27.9%</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-[10px]" style={{ color: t.textMuted }}>Total TVL</span>
            <span className="text-[13px] font-bold ml-2" style={{ color: t.text }}>$108.45B</span>
            <span className="text-[10px] font-bold ml-1" style={{ color: t.green }}>+5.24%</span>
          </div>
        </div>
        <div className="flex-1 rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <div className="flex items-center gap-1 mb-2">
            <Rocket className="w-3.5 h-3.5" style={{ color: t.green }} />
            <span className="text-[13px] font-bold" style={{ color: t.text }}>Fastest Growing</span>
          </div>
          <span className="text-[10px]" style={{ color: t.textMuted }}>By 24h % Growth</span>
          {[
            { r: 1, n: 'Sui', c: '+6.45%' },
            { r: 2, n: 'Base', c: '+5.26%' },
            { r: 3, n: 'Solana', c: '+4.71%' },
            { r: 4, n: 'Avalanche', c: '+3.84%' },
            { r: 5, n: 'Aptos', c: '+3.61%' },
          ].map(i => (
            <div key={i.n} className="flex items-center justify-between mt-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]" style={{ color: t.textMuted }}>{i.r}</span>
                <span className="text-[12px] font-semibold" style={{ color: t.text }}>{i.n}</span>
              </div>
              <span className="text-[11px] font-bold" style={{ color: t.green }}>{i.c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricesAIContent() {
  const { t } = useTheme();
  return (
    <div>
      {/* AI Sector Pulse Hero */}
      <div className="px-4 pt-3">
        <div className="rounded-[16px] p-4" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[16px] font-bold" style={{ color: t.text }}>AI Sector Pulse</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${t.green}20`, color: t.green }}>LIVE</span>
          </div>
          <div className="flex gap-4">
            <div>
              <span className="text-[11px]" style={{ color: t.textMuted }}>Sentiment</span>
              <p className="text-[14px] font-bold" style={{ color: t.green }}>Bullish</p>
              <span className="text-[11px]" style={{ color: t.textMuted }}>78/100</span>
            </div>
            <div>
              <span className="text-[11px]" style={{ color: t.textMuted }}>Funding (30D)</span>
              <p className="text-[14px] font-bold" style={{ color: t.text }}>$1.82B</p>
              <span className="text-[11px] font-bold" style={{ color: t.green }}>+18.6%</span>
            </div>
            <div>
              <span className="text-[11px]" style={{ color: t.textMuted }}>Momentum</span>
              <p className="text-[14px] font-bold" style={{ color: t.green }}>Strong</p>
              <span className="text-[11px] font-bold" style={{ color: t.green }}>+2.34%</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Table */}
      <div className="mt-3">
        <div className="flex items-center px-4 py-2" style={{ borderBottom: `1px solid ${t.border}` }}>
          <span className="text-[11px] font-semibold flex-1" style={{ color: t.textMuted }}>Project</span>
          <span className="text-[11px] font-semibold w-[70px] text-right" style={{ color: t.textMuted }}>Price</span>
          <span className="text-[11px] font-semibold w-[55px] text-right" style={{ color: t.textMuted }}>24h %</span>
          <span className="text-[11px] font-semibold w-[50px] text-center" style={{ color: t.textMuted }}>7D Chart</span>
          <span className="text-[11px] font-semibold w-[40px] text-right" style={{ color: t.textMuted }}>AI Rank</span>
          <span className="w-6" />
        </div>
        {aiProjects.map(a => (
          <div key={a.symbol} className="flex items-center py-3 px-4" style={{ borderBottom: `1px solid ${t.border}` }}>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: a.color }}>
                <span className="text-[9px] font-bold text-white">{a.symbol.slice(0, 2)}</span>
              </div>
              <div>
                <span className="text-[13px] font-bold" style={{ color: t.text }}>{a.symbol}</span>
                <span className="text-[10px] block" style={{ color: t.textMuted }}>{a.name}</span>
              </div>
            </div>
            <span className="text-[12px] font-semibold w-[70px] text-right" style={{ color: t.text }}>{a.price}</span>
            <span className="text-[11px] font-bold w-[55px] text-right" style={{ color: a.up ? t.green : t.red }}>{a.change}</span>
            <div className="w-[50px] flex justify-center"><MiniChart color={a.up ? t.green : t.red} down={!a.up} /></div>
            <span className="text-[12px] font-semibold w-[40px] text-right" style={{ color: t.textMuted }}>{a.aiRank}</span>
            <Star className="w-4 h-4 ml-2" style={{ color: a.starred ? t.green : t.textDim, fill: a.starred ? t.green : 'none' }} />
          </div>
        ))}
      </div>

      {/* AI Bottom Cards */}
      <div className="flex gap-2 px-4 mt-4">
        <div className="flex-1 rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-bold" style={{ color: t.text }}>AI Narratives</span>
            <span className="text-[10px] font-semibold" style={{ color: t.green }}>View all</span>
          </div>
          {[
            { n: 'AI Compute', c: '+2.85%' }, { n: 'AI Agents', c: '+2.31%' }, { n: 'AI Models', c: '+1.74%' },
            { n: 'Data & Infra', c: '+0.98%' }, { n: 'AI Gaming', c: '-0.21%' },
          ].map(i => (
            <div key={i.n} className="flex items-center justify-between py-1">
              <span className="text-[11px]" style={{ color: t.textMuted }}>{i.n}</span>
              <span className="text-[10px] font-bold" style={{ color: i.c.startsWith('+') ? t.green : t.red }}>{i.c}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-bold" style={{ color: t.text }}>Top AI Movers</span>
            <span className="text-[10px] font-semibold" style={{ color: t.textMuted }}>24h <ChevronDown className="w-3 h-3 inline" /></span>
          </div>
          {[
            { s: 'FET', c: '+8.12%' }, { s: 'NEAR AI', c: '+6.34%' }, { s: 'TAO', c: '+5.27%' },
            { s: 'AKT', c: '+4.38%' }, { s: 'RNDR', c: '+3.91%' },
          ].map(i => (
            <div key={i.s} className="flex items-center justify-between py-1">
              <span className="text-[11px] font-semibold" style={{ color: t.text }}>{i.s}</span>
              <span className="text-[10px] font-bold" style={{ color: t.green }}>{i.c}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold" style={{ color: t.text }}>On-chain Compute</span>
            <span className="text-[9px] font-bold px-1 py-0.5 rounded" style={{ backgroundColor: `${t.green}20`, color: t.green }}>LIVE</span>
          </div>
          <span className="text-[9px]" style={{ color: t.textMuted }}>Active Jobs (24h)</span>
          <div className="flex items-center gap-1">
            <span className="text-[16px] font-bold" style={{ color: t.text }}>96,452</span>
            <span className="text-[10px] font-bold" style={{ color: t.green }}>+14.7%</span>
          </div>
          <span className="text-[9px] block mt-2" style={{ color: t.textMuted }}>GPU Hours (24h)</span>
          <div className="flex items-center gap-1">
            <span className="text-[14px] font-bold" style={{ color: t.text }}>1.24M</span>
            <span className="text-[10px] font-bold" style={{ color: t.green }}>+16.9%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricesDeFiContent() {
  const { t } = useTheme();
  return (
    <div>
      {/* DeFi Sector Overview */}
      <div className="px-4 pt-3">
        <div className="rounded-[16px] p-4" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[16px] font-bold" style={{ color: t.text }}>DeFi Sector Overview</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${t.green}20`, color: t.green }}>LIVE</span>
          </div>
          <div className="flex gap-4">
            <div>
              <span className="text-[11px]" style={{ color: t.textMuted }}>Total Value Locked</span>
              <p className="text-[20px] font-bold" style={{ color: t.text }}>$92.48B</p>
              <span className="text-[11px] font-bold" style={{ color: t.green }}>+2.48% 24h</span>
            </div>
            <div>
              <span className="text-[11px]" style={{ color: t.textMuted }}>24h Volume</span>
              <p className="text-[20px] font-bold" style={{ color: t.text }}>$6.21B</p>
              <span className="text-[11px] font-bold" style={{ color: t.green }}>+8.36% 24h</span>
            </div>
            <div>
              <span className="text-[11px]" style={{ color: t.textMuted }}>Sector Momentum</span>
              <SentimentGauge value={78} label="Bullish" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.green }} />
            <span className="text-[11px]" style={{ color: t.textMuted }}>DeFi is outperforming the broader market</span>
            <span className="ml-auto text-[11px] font-semibold flex items-center gap-0.5" style={{ color: t.textMuted }}>View DeFi Heatmap <ChevronRight className="w-3 h-3" /></span>
          </div>
        </div>
      </div>

      {/* Protocol Table */}
      <div className="mt-3">
        <div className="flex items-center px-4 py-2" style={{ borderBottom: `1px solid ${t.border}` }}>
          <span className="text-[11px] font-semibold w-[24px]" style={{ color: t.textMuted }}>#</span>
          <span className="text-[11px] font-semibold flex-1" style={{ color: t.textMuted }}>Protocol</span>
          <span className="text-[11px] font-semibold w-[75px] text-right" style={{ color: t.textMuted }}>Price</span>
          <span className="text-[11px] font-semibold w-[55px] text-right" style={{ color: t.textMuted }}>24h %</span>
          <span className="text-[11px] font-semibold w-[50px] text-center" style={{ color: t.textMuted }}>7D Chart</span>
          <span className="text-[11px] font-semibold w-[55px] text-right" style={{ color: t.textMuted }}>TVL</span>
          <span className="w-6" />
        </div>
        {defiProtocols.map(p => (
          <AssetRow key={p.symbol} rank={p.rank} symbol={p.symbol} name={p.name} price={p.price} change={p.change} up={p.up} last={p.tvl} starred={p.starred} color={p.color} />
        ))}
      </div>

      {/* Bottom Cards */}
      <div className="flex gap-2 px-4 mt-4">
        <div className="flex-1 rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-bold" style={{ color: t.text }}>Top TVL</span>
            <ChevronRight className="w-4 h-4" style={{ color: t.textMuted }} />
          </div>
          {[
            { n: 'Lido', v: '$13.22B' }, { n: 'Aave', v: '$11.36B' }, { n: 'Uniswap', v: '$6.12B' },
            { n: 'Maker', v: '$5.47B' }, { n: 'Curve', v: '$2.18B' },
          ].map((i, idx) => (
            <div key={i.n} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-1"><span className="text-[10px]" style={{ color: t.textMuted }}>{idx + 1}</span><span className="text-[11px]" style={{ color: t.text }}>{i.n}</span></div>
              <span className="text-[11px] font-semibold" style={{ color: t.text }}>{i.v}</span>
            </div>
          ))}
          <span className="text-[10px] font-semibold block mt-1" style={{ color: t.green }}>View all</span>
        </div>
        <div className="flex-1 rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-bold" style={{ color: t.text }}>Yield Leaders</span>
            <ChevronRight className="w-4 h-4" style={{ color: t.textMuted }} />
          </div>
          {[
            { n: 'Pendle', v: '21.42%' }, { n: 'Aave', v: '12.87%' }, { n: 'Curve', v: '9.81%' },
            { n: 'Convex', v: '8.32%' }, { n: 'Frax', v: '7.64%' },
          ].map((i, idx) => (
            <div key={i.n} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-1"><span className="text-[10px]" style={{ color: t.textMuted }}>{idx + 1}</span><span className="text-[11px]" style={{ color: t.text }}>{i.n}</span></div>
              <span className="text-[11px] font-semibold" style={{ color: t.text }}>{i.v}</span>
            </div>
          ))}
          <span className="text-[10px] font-semibold block mt-1" style={{ color: t.green }}>View all</span>
        </div>
        <div className="flex-1 rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <span className="text-[12px] font-bold" style={{ color: t.text }}>Stablecoin Flows</span>
          <ChevronRight className="w-4 h-4 float-right" style={{ color: t.textMuted }} />
          <div className="mt-1">
            <span className="text-[10px]" style={{ color: t.textMuted }}>Net Flow (24h)</span>
            <span className="text-[13px] font-bold ml-1" style={{ color: t.green }}>+$245.6M</span>
          </div>
          {[
            { n: 'USDC', v: '+$156.3M' }, { n: 'USDT', v: '+$63.8M' }, { n: 'DAI', v: '+$18.7M' }, { n: 'USDe', v: '+$6.8M' },
          ].map(i => (
            <div key={i.n} className="flex items-center justify-between py-0.5">
              <span className="text-[10px]" style={{ color: t.textMuted }}>{i.n}</span>
              <span className="text-[10px] font-bold" style={{ color: t.green }}>{i.v}</span>
            </div>
          ))}
          <span className="text-[10px] font-semibold block mt-1" style={{ color: t.green }}>View flows</span>
        </div>
      </div>
    </div>
  );
}

function PricesMoreContent() {
  const { t } = useTheme();
  return (
    <div>
      {/* Explore More Markets */}
      <div className="px-4 pt-3">
        <div className="rounded-[16px] p-4" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <h3 className="text-[16px] font-bold mb-3" style={{ color: t.text }}>Explore More Markets</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { n: 'Meme', icon: '😊' }, { n: 'Gaming', icon: '🎮' }, { n: 'RWA', icon: '🏛️' }, { n: 'Stablecoins', icon: '💲' },
            ].map(c => (
              <button key={c.n} className="flex items-center gap-1.5 px-4 py-2 rounded-full" style={{ backgroundColor: t.bgTer, border: `1px solid ${t.border2}` }}>
                <span>{c.icon}</span>
                <span className="text-[13px] font-medium" style={{ color: t.text }}>{c.n}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {[
              { n: 'Gainers', color: t.green, active: true },
              { n: 'Losers', color: t.red, active: false },
              { n: 'New', color: t.gold, active: false },
              { n: 'Trending', color: t.orange, active: false },
            ].map(c => (
              <button key={c.n} className="flex items-center gap-1.5 px-4 py-2 rounded-full" style={{ backgroundColor: c.active ? `${c.color}20` : 'transparent', border: `1px solid ${c.active ? c.color : t.border2}`, color: c.active ? c.color : t.textMuted }}>
                {c.n === 'Gainers' && <TrendingUp className="w-3.5 h-3.5" />}
                {c.n === 'Losers' && <TrendingDown className="w-3.5 h-3.5" />}
                {c.n === 'New' && <Sparkles className="w-3.5 h-3.5" />}
                {c.n === 'Trending' && <span>🔥</span>}
                <span className="text-[13px] font-semibold">{c.n}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top Gainers */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" style={{ color: t.green }} />
            <span className="text-[15px] font-bold" style={{ color: t.text }}>Top Gainers</span>
          </div>
          <button className="flex items-center gap-1 text-[12px] font-medium" style={{ color: t.textMuted }}>24h <ChevronDown className="w-3 h-3" /></button>
        </div>
      </div>
      <div>
        <div className="flex items-center px-4 py-2" style={{ borderBottom: `1px solid ${t.border}` }}>
          <span className="text-[11px] font-semibold w-[24px]" style={{ color: t.textMuted }}>#</span>
          <span className="text-[11px] font-semibold flex-1" style={{ color: t.textMuted }}>Asset</span>
          <span className="text-[11px] font-semibold w-[80px] text-right" style={{ color: t.textMuted }}>Price</span>
          <span className="text-[11px] font-semibold w-[60px] text-right" style={{ color: t.textMuted }}>24h %</span>
          <span className="text-[11px] font-semibold w-[60px] text-center" style={{ color: t.textMuted }}>7D Chart</span>
          <span className="text-[11px] font-semibold w-[55px] text-right" style={{ color: t.textMuted }}>Mcap</span>
          <span className="w-6" />
        </div>
        {topGainers.map(a => (
          <AssetRow key={a.symbol} rank={a.rank} symbol={a.symbol} name={a.name} price={a.price} change={a.change} up last={a.mcap} color={a.color} />
        ))}
      </div>

      {/* Bottom mini tables */}
      <div className="flex gap-2 px-4 mt-4">
        <div className="flex-1 rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <div className="flex items-center gap-1 mb-2">
            <TrendingDown className="w-3.5 h-3.5" style={{ color: t.red }} />
            <span className="text-[12px] font-bold" style={{ color: t.text }}>Top Losers</span>
          </div>
          {[{ s: 'FTM', c: '-12.45%' }, { s: 'CELR', c: '-9.32%' }, { s: 'PERP', c: '-8.11%' }].map((i, idx) => (
            <div key={i.s} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-1"><span className="text-[10px]" style={{ color: t.textMuted }}>{idx + 1}</span><span className="text-[11px] font-semibold" style={{ color: t.text }}>{i.s}</span></div>
              <span className="text-[10px] font-bold" style={{ color: t.red }}>{i.c}</span>
            </div>
          ))}
          <span className="text-[10px] font-semibold block mt-1" style={{ color: t.textMuted }}>View all losers</span>
        </div>
        <div className="flex-1 rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-[12px]">💲</span>
            <span className="text-[12px] font-bold" style={{ color: t.text }}>Top Stablecoins</span>
          </div>
          {[{ s: 'USDT', p: '$1.00', c: '0.00%' }, { s: 'USDC', p: '$1.00', c: '+0.01%' }, { s: 'DAI', p: '$1.00', c: '+0.01%' }].map((i, idx) => (
            <div key={i.s} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-1"><span className="text-[10px]" style={{ color: t.textMuted }}>{idx + 1}</span><span className="text-[11px] font-semibold" style={{ color: t.text }}>{i.s}</span></div>
              <span className="text-[10px]" style={{ color: t.textMuted }}>{i.p}</span>
              <span className="text-[10px] font-bold" style={{ color: t.green }}>{i.c}</span>
            </div>
          ))}
          <span className="text-[10px] font-semibold block mt-1" style={{ color: t.textMuted }}>View all stablecoins</span>
        </div>
        <div className="flex-1 rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-[12px]">🏛️</span>
            <span className="text-[12px] font-bold" style={{ color: t.text }}>RWA Spotlight</span>
          </div>
          {[{ s: 'ONDO', p: '$1.32', c: '+6.21%' }, { s: 'MPLX', p: '$0.26', c: '+5.18%' }, { s: 'CFG', p: '$0.43', c: '+4.67%' }].map(i => (
            <div key={i.s} className="flex items-center justify-between py-1">
              <span className="text-[11px] font-semibold" style={{ color: t.text }}>{i.s}</span>
              <span className="text-[10px]" style={{ color: t.textMuted }}>{i.p}</span>
              <span className="text-[10px] font-bold" style={{ color: t.green }}>{i.c}</span>
            </div>
          ))}
          <span className="text-[10px] font-semibold block mt-1" style={{ color: t.textMuted }}>Explore RWA</span>
        </div>
      </div>
    </div>
  );
}

// ==================== PROJECTS TAB CONTENT ====================
function ProjectsTrendingContent() {
  const { t } = useTheme();
  return (
    <div>
      {/* Trending Project Hero */}
      <div className="px-4 pt-3">
        <div className="rounded-[16px] p-4 relative overflow-hidden" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.green}30` }}>
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: t.green }}>Trending Project</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[20px] font-bold" style={{ color: t.text }}>NEXUS</span>
            <span className="text-[14px]" style={{ color: t.textMuted }}>$NEX</span>
            <VerifiedBadge className="w-4 h-4" style={{ color: t.green }} />
          </div>
          <p className="text-[11px] mt-1 max-w-[240px]" style={{ color: t.textMuted }}>The modular AI-powered data network serving the next-gen decentralized web.</p>
          <div className="flex gap-4 mt-3">
            {[
              { label: 'Mentions', value: '12.4K', sub: '+148%' },
              { label: 'Follower Growth', value: '+32.6%', sub: '(24h)' },
              { label: 'Health Score', value: '92/100', sub: 'Excellent' },
              { label: 'Trend Rank', value: '#1', sub: '24h' },
            ].map(s => (
              <div key={s.label}>
                <span className="text-[9px]" style={{ color: t.textMuted }}>{s.label}</span>
                <p className="text-[14px] font-bold" style={{ color: t.text }}>{s.value}</p>
                <span className="text-[10px] font-bold" style={{ color: t.green }}>{s.sub}</span>
              </div>
            ))}
          </div>
          <div className="absolute top-3 right-3 text-right">
            <span className="text-[10px]" style={{ color: t.textMuted }}>Momentum</span>
            <p className="text-[28px] font-bold" style={{ color: t.text }}>95</p>
            <span className="text-[11px] font-semibold" style={{ color: t.green }}>Extreme</span>
          </div>
          <div className="flex gap-2 mt-3">
            <button className="px-4 py-1.5 rounded-full text-[12px] font-bold" style={{ backgroundColor: t.green, color: '#000' }}>Follow</button>
            <button className="px-4 py-1.5 rounded-full text-[12px] font-bold" style={{ border: `1px solid ${t.border2}`, color: t.text }}>Open</button>
          </div>
        </div>
      </div>

      {/* Trending Projects Table */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[16px] font-bold" style={{ color: t.text }}>Trending Projects</span>
          <span className="text-[13px] font-semibold" style={{ color: t.green }}>View all</span>
        </div>
      </div>
      <div className="flex items-center px-4 py-2" style={{ borderBottom: `1px solid ${t.border}` }}>
        <span className="text-[11px] font-semibold w-[20px]" style={{ color: t.textMuted }}>#</span>
        <span className="text-[11px] font-semibold flex-1" style={{ color: t.textMuted }}>Project</span>
        <span className="text-[11px] font-semibold w-[65px]" style={{ color: t.textMuted }}>Momentum</span>
        <span className="text-[11px] font-semibold w-[55px] text-right" style={{ color: t.textMuted }}>Mentions</span>
        <span className="text-[11px] font-semibold w-[65px] text-right" style={{ color: t.textMuted }}>Follower Growth</span>
        <span className="text-[11px] font-semibold w-[45px] text-right" style={{ color: t.textMuted }}>Health</span>
        <span className="w-6" />
      </div>
      {trendingProjects.map(p => (
        <div key={p.name} className="flex items-center py-3 px-4" style={{ borderBottom: `1px solid ${t.border}` }}>
          <span className="w-[20px] text-[13px] font-medium" style={{ color: t.textMuted }}>{p.rank}</span>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: p.color }}>
              <span className="text-[9px] font-bold text-white">{p.name.slice(0, 2)}</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[13px] font-bold" style={{ color: t.text }}>{p.name}</span>
                <span className="text-[10px]" style={{ color: t.textMuted }}>{p.ticker}</span>
                <VerifiedBadge className="w-3.5 h-3.5" style={{ color: t.green }} />
              </div>
              <span className="text-[10px]" style={{ color: t.textMuted }}>{p.category}</span>
            </div>
          </div>
          <div className="w-[65px]">
            <span className="text-[13px] font-bold" style={{ color: t.text }}>{p.momentum}</span>
            <MiniChart />
            <span className="text-[9px] font-semibold" style={{ color: p.momentum >= 85 ? t.green : t.orange }}>{p.label}</span>
          </div>
          <div className="w-[55px] text-right">
            <span className="text-[12px] font-semibold block" style={{ color: t.text }}>{p.mentions}</span>
            <span className="text-[9px] font-bold" style={{ color: t.green }}>{p.mentionChange}</span>
          </div>
          <span className="text-[11px] font-bold w-[65px] text-right" style={{ color: t.green }}>{p.followerGrowth}</span>
          <div className="w-[45px] flex justify-end"><HealthBadge score={p.health} /></div>
          <button className="ml-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ border: `1px solid ${t.border2}` }}>
            <span className="text-[12px]" style={{ color: t.textMuted }}>+</span>
          </button>
        </div>
      ))}

      {/* Bottom info */}
      <div className="px-4 py-3">
        <p className="text-[11px]" style={{ color: t.textMuted }}>Rankings update every 5 minutes based on on-chain data, social momentum, and engagement.</p>
      </div>

      {/* Trending Narratives / Fast Rising */}
      <div className="flex gap-2 px-4 mt-2">
        <div className="flex-1 rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold" style={{ color: t.text }}>Trending Narratives</span>
            <span className="text-[11px] font-semibold" style={{ color: t.green }}>View all</span>
          </div>
          {['AI Agents +238%', 'Modular Infra +167%', 'RWA +123%', 'DePIN +98%', 'Restaking +76%'].map(n => {
            const [name, change] = n.split(' ');
            return (
              <div key={n} className="flex items-center justify-between py-1.5">
                <span className="text-[12px]" style={{ color: t.text }}>{name}</span>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold" style={{ color: t.green }}>{change}</span>
                  <MiniChart />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex-1 rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold" style={{ color: t.text }}>Fast Rising Projects</span>
            <span className="text-[11px] font-semibold" style={{ color: t.green }}>View all</span>
          </div>
          {[
            { n: 'ORBIT', t: '$ORBT', c: '+345%' }, { n: 'LUMIA', t: '$LUM', c: '+289%' },
            { n: 'SYNQ', t: '$SYNQ', c: '+256%' }, { n: 'VELA', t: '$VELA', c: '+201%' },
            { n: 'ZORA', t: '$ZORA', c: '+178%' },
          ].map(p => (
            <div key={p.n} className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-1">
                <span className="text-[12px] font-bold" style={{ color: t.text }}>{p.n}</span>
                <span className="text-[10px]" style={{ color: t.textMuted }}>{p.t}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold" style={{ color: t.green }}>{p.c}</span>
                <MiniChart />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsVerifiedContent() {
  const { t } = useTheme();
  return (
    <div>
      {/* Verified Spotlight */}
      <div className="px-4 pt-3">
        <div className="rounded-[16px] p-4 relative overflow-hidden" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.green}30` }}>
          <span className="text-[10px] font-bold flex items-center gap-1 px-2 py-0.5 rounded-full w-fit" style={{ backgroundColor: `${t.green}20`, color: t.green, border: `1px solid ${t.green}40` }}>
            <Shield className="w-3 h-3" /> VERIFIED SPOTLIGHT
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[22px] font-bold" style={{ color: t.text }}>$NEX</span>
            <span className="text-[14px]" style={{ color: t.textMuted }}>Nexus</span>
            <VerifiedBadge className="w-4 h-4" style={{ color: t.green }} />
          </div>
          <span className="text-[12px]" style={{ color: t.textMuted }}>DeFi + AI Infrastructure</span>
          <p className="text-[12px] mt-2 max-w-[260px]" style={{ color: t.textMuted }}>Nexus is building the next generation of intelligent DeFi infrastructure, powering secure, cross-chain, data-driven financial systems.</p>
          <div className="flex gap-4 mt-3">
            {[
              { label: 'Chains', value: '3' },
              { label: 'Followers', value: '125K' },
              { label: 'Health Score', value: '92' },
              { label: 'Governance', value: 'Active' },
            ].map(s => (
              <div key={s.label}>
                <span className="text-[9px]" style={{ color: t.textMuted }}>{s.label}</span>
                <p className="text-[14px] font-bold" style={{ color: s.label === 'Governance' ? t.green : t.text }}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <button className="flex-1 py-2 rounded-[12px] text-[13px] font-bold text-center" style={{ border: `1px solid ${t.green}`, color: t.green }}>View Project</button>
            <button className="flex-1 py-2 rounded-[12px] text-[13px] font-bold text-center" style={{ backgroundColor: t.green, color: '#000' }}>Open Governance</button>
          </div>
        </div>
      </div>

      {/* Verified Projects List */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[16px] font-bold" style={{ color: t.text }}>Verified Projects</span>
          <span className="text-[13px] font-semibold" style={{ color: t.green }}>View all</span>
        </div>
        {verifiedProjects.map(p => (
          <div key={p.ticker} className="rounded-[14px] p-3 mb-2" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
            <div className="flex items-center gap-3">
              <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: p.color }}>
                <span className="text-[11px] font-bold text-white">{p.ticker.slice(1, 3)}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-[14px] font-bold" style={{ color: t.text }}>{p.ticker}</span>
                  <span className="text-[12px]" style={{ color: t.textMuted }}>{p.name}</span>
                  <VerifiedBadge className="w-3.5 h-3.5" style={{ color: t.green }} />
                </div>
                <span className="text-[11px]" style={{ color: t.textMuted }}>{p.category}</span>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[11px]" style={{ color: t.textMuted }}>👥 {p.followers}</span>
                  <span className="text-[11px]" style={{ color: t.textMuted }}>🛡️ {p.health}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px]" style={{ color: t.textMuted }}>{p.chain}</span>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.status === 'Active' ? t.green : t.orange }} />
                  <span className="text-[11px] font-semibold" style={{ color: p.status === 'Active' ? t.green : t.orange }}>{p.status}</span>
                </div>
                <div className="flex gap-1.5 mt-2">
                  <button className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ border: `1px solid ${t.green}`, color: t.green }}>Follow</button>
                  <button className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ border: `1px solid ${t.border2}`, color: t.text }}>Open</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recently Verified */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[16px] font-bold" style={{ color: t.text }}>Recently Verified</span>
          <span className="text-[13px] font-semibold" style={{ color: t.green }}>View all</span>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {recentlyVerified.map(p => (
            <div key={p.ticker} className="min-w-[140px] rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
              <div className="flex items-center gap-1">
                <span className="text-[13px] font-bold" style={{ color: t.text }}>{p.ticker}</span>
                <VerifiedBadge className="w-3 h-3" style={{ color: t.green }} />
              </div>
              <span className="text-[10px]" style={{ color: t.textMuted }}>{p.name}</span>
              <div className="mt-2">
                <span className="text-[10px]" style={{ color: t.textMuted }}>{p.chain}</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px]" style={{ color: t.textMuted }}>👥 {p.followers}</span>
                  <span className="text-[10px]" style={{ color: t.textMuted }}>🛡️ {p.health}</span>
                </div>
                <span className="text-[10px] block mt-1" style={{ color: t.textMuted }}>{p.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What does Verified mean */}
      <div className="px-4 mt-4 mb-4">
        <div className="rounded-[16px] p-4 flex items-start gap-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <Shield className="w-8 h-8 shrink-0" style={{ color: t.green }} />
          <div>
            <span className="text-[14px] font-bold" style={{ color: t.text }}>What does Verified mean?</span>
            <p className="text-[11px] mt-1" style={{ color: t.textMuted }}>Verified projects have passed our multi-layered trust & security assessment including team identity, smart contract audits, tokenomics, and community transparency.</p>
            <button className="flex items-center gap-1 mt-2 text-[12px] font-semibold" style={{ color: t.green }}>Learn more <ChevronRight className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsMoreContent() {
  const { t } = useTheme();
  return (
    <div>
      {/* Category Filters */}
      <div className="px-4 pt-3">
        <div className="flex flex-wrap gap-2">
          {[
            { n: 'High Trust', icon: <Shield className="w-3.5 h-3.5" />, color: t.green },
            { n: 'Audited', icon: <Shield className="w-3.5 h-3.5" />, color: t.purple },
            { n: 'Recently Updated', icon: <Clock className="w-3.5 h-3.5" />, color: t.text },
            { n: 'Launching Soon', icon: <Rocket className="w-3.5 h-3.5" />, color: t.text },
            { n: 'Community Verified', icon: <Users className="w-3.5 h-3.5" />, color: t.text },
            { n: 'Sponsored', icon: <Star className="w-3.5 h-3.5" />, color: t.text },
            { n: 'Risk Flagged', icon: <Flag className="w-3.5 h-3.5" />, color: t.red },
          ].map(f => (
            <button key={f.n} className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[12px] font-semibold" style={{ backgroundColor: `${f.color}15`, border: `1px solid ${f.color}40`, color: f.color }}>{f.icon} {f.n}</button>
          ))}
        </div>
      </div>

      {/* Project Spotlight */}
      <div className="px-4 mt-4">
        <div className="rounded-[16px] p-4 relative" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.green}30` }}>
          <div className="flex items-center gap-1 mb-2">
            <Shield className="w-3.5 h-3.5" style={{ color: t.green }} />
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: t.green }}>Project Spotlight</span>
          </div>
          <Star className="w-5 h-5 absolute top-4 right-4" style={{ color: t.textDim }} />
          <div className="flex items-center gap-2 mt-2">
            <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center" style={{ backgroundColor: t.purple }}>
              <span className="text-[14px] font-bold text-white">N</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[16px] font-bold" style={{ color: t.text }}>Nexora</span>
                <VerifiedBadge className="w-4 h-4" style={{ color: t.green }} />
              </div>
              <span className="text-[11px]" style={{ color: t.textMuted }}>Ethereum (ERC-20)</span>
            </div>
            <div className="ml-auto text-right">
              <span className="text-[10px]" style={{ color: t.textMuted }}>Trust Score</span>
              <p className="text-[24px] font-bold" style={{ color: t.green }}>95<span className="text-[12px]" style={{ color: t.textMuted }}>/100</span></p>
              <span className="text-[10px]" style={{ color: t.textMuted }}>👥 12.4K Followers</span>
            </div>
          </div>
          <p className="text-[11px] mt-2" style={{ color: t.textMuted }}>Nexora is building the next generation liquidity network with cross-chain execution and real yield.</p>
          <div className="flex gap-1.5 mt-2">
            {['Audited', 'High Trust', 'Active Dev', 'DAO'].map(tag => (
              <span key={tag} className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${t.green}15`, color: t.green, border: `1px solid ${t.green}30` }}>{tag}</span>
            ))}
          </div>
          <button className="mt-3 w-full py-2 rounded-[12px] text-[13px] font-bold" style={{ border: `1px solid ${t.green}`, color: t.green }}>View Project</button>
        </div>
      </div>

      {/* High Trust Projects */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-1">
          <div>
            <span className="text-[16px] font-bold" style={{ color: t.text }}>High Trust Projects</span>
            <p className="text-[11px]" style={{ color: t.textMuted }}>Projects with strong fundamentals and community trust</p>
          </div>
          <span className="text-[13px] font-semibold" style={{ color: t.green }}>View All</span>
        </div>
      </div>
      <div className="flex items-center px-4 py-2" style={{ borderBottom: `1px solid ${t.border}` }}>
        <span className="text-[11px] font-semibold flex-1" style={{ color: t.textMuted }}>Project</span>
        <span className="text-[11px] font-semibold w-[65px]" style={{ color: t.textMuted }}>Chain</span>
        <span className="text-[11px] font-semibold w-[50px] text-center" style={{ color: t.textMuted }}>Trust Score</span>
        <span className="text-[11px] font-semibold w-[50px] text-right" style={{ color: t.textMuted }}>Followers</span>
        <span className="text-[11px] font-semibold w-[55px] text-right" style={{ color: t.textMuted }}>Last Update</span>
        <span className="text-[11px] font-semibold w-[50px] text-right" style={{ color: t.textMuted }}>Status</span>
        <span className="w-6" />
      </div>
      {highTrustProjects.map(p => (
        <div key={p.name} className="flex items-center py-3 px-4" style={{ borderBottom: `1px solid ${t.border}` }}>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: p.color }}>
              <span className="text-[9px] font-bold text-white">{p.name.slice(0, 2)}</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-[13px] font-bold" style={{ color: t.text }}>{p.name}</span>
                <VerifiedBadge className="w-3 h-3" style={{ color: t.green }} />
              </div>
              <span className="text-[10px]" style={{ color: t.textMuted }}>{p.ticker}</span>
            </div>
          </div>
          <span className="text-[11px] w-[65px]" style={{ color: t.textMuted }}>{p.chain}</span>
          <span className="text-[13px] font-bold w-[50px] text-center" style={{ color: t.green }}>{p.score}</span>
          <span className="text-[11px] w-[50px] text-right" style={{ color: t.textMuted }}>{p.followers}</span>
          <span className="text-[11px] w-[55px] text-right" style={{ color: t.textMuted }}>{p.lastUpdate}</span>
          <span className="text-[10px] font-semibold w-[50px] text-right" style={{ color: p.status === 'Active' ? t.green : t.orange }}>{p.status}</span>
          <Star className="w-4 h-4 ml-2" style={{ color: t.textDim }} />
        </div>
      ))}

      {/* Risk Flagged */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            <Flag className="w-4 h-4" style={{ color: t.red }} />
            <span className="text-[16px] font-bold" style={{ color: t.text }}>Risk Flagged Projects</span>
          </div>
          <span className="text-[13px] font-semibold" style={{ color: t.green }}>View All</span>
        </div>
        <p className="text-[11px] mb-3" style={{ color: t.textMuted }}>Proceed with caution. These projects have risk indicators.</p>
        <div className="flex gap-2 overflow-x-auto">
          {[
            { n: 'ShadowX', t: 'SHDX', score: 25, label: 'High Risk', risks: ['Unverified Team', 'Low Liquidity'] },
            { n: 'VaultCraft', t: 'VCX', score: 32, label: 'High Risk', risks: ['Contract Risk', 'No Audit'] },
            { n: 'MetaRise', t: 'MRZ', score: 35, label: 'Medium Risk', risks: ['Centralized', 'Team Unknown'] },
          ].map(p => (
            <div key={p.n} className="min-w-[160px] rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.red}30` }}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[13px] font-bold" style={{ color: t.text }}>{p.n}</span>
                  <span className="text-[10px] block" style={{ color: t.textMuted }}>{p.t}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px]" style={{ color: t.textMuted }}>Risk Score</span>
                  <p className="text-[16px] font-bold" style={{ color: t.red }}>{p.score}</p>
                </div>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block" style={{ backgroundColor: `${t.red}20`, color: t.red }}>{p.label}</span>
              {p.risks.map(r => (
                <span key={r} className="text-[9px] block mt-0.5" style={{ color: t.textMuted }}>• {r}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Sponsored */}
      <div className="px-4 mt-4 mb-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" style={{ color: t.gold }} />
            <span className="text-[16px] font-bold" style={{ color: t.text }}>Sponsored Projects</span>
          </div>
          <span className="text-[13px] font-semibold" style={{ color: t.green }}>View All</span>
        </div>
        <p className="text-[11px] mb-3" style={{ color: t.textMuted }}>Featured projects curated by our partners</p>
        <div className="flex gap-2 overflow-x-auto">
          {[
            { n: 'ChainGPT', t: 'CGPT', desc: 'AI-powered blockchain infrastructure and tools.' },
            { n: 'Ledger', t: 'LED', desc: 'Secure your crypto. Hardware wallets.' },
            { n: '1inch', t: '1INCH', desc: 'The best DEX aggregator for DeFi traders.' },
          ].map(p => (
            <div key={p.n} className="min-w-[150px] rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold" style={{ color: t.text }}>{p.n}</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${t.green}20`, color: t.green }}>Sponsored</span>
              </div>
              <span className="text-[10px]" style={{ color: t.textMuted }}>{p.t}</span>
              <p className="text-[10px] mt-1" style={{ color: t.textMuted }}>{p.desc}</p>
              <button className="mt-2 text-[10px] font-bold flex items-center gap-0.5" style={{ color: t.text }}>Visit Site ↗</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== VOTES TAB ====================
function VotesContent() {
  const { t } = useTheme();
  return (
    <div>
      {/* Vote sub-filters */}
      <div className="flex gap-2 px-4 pt-3 overflow-x-auto">
        {['Active', 'Ending Soon', 'By Project', 'History', 'My Votes', 'More'].map((f, i) => (
          <button key={f} className="px-3 py-[6px] rounded-full text-[12px] font-semibold whitespace-nowrap" style={{
            backgroundColor: i === 0 ? `${t.green}20` : f === 'More' ? `${t.green}15` : 'transparent',
            border: `1px solid ${i === 0 ? t.green : f === 'More' ? t.green : t.border2}`,
            color: i === 0 ? t.green : f === 'More' ? t.green : t.textMuted,
          }}>
            {f === 'More' ? <span className="flex items-center gap-1">More <ChevronDown className="w-3 h-3" /></span> : f}
          </button>
        ))}
      </div>

      {/* Category Icons */}
      <div className="px-4 mt-3">
        <div className="rounded-[14px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <div className="flex justify-between">
            {[
              { n: 'Recovery', icon: '↻' }, { n: 'HODL', icon: '◇' }, { n: 'Open100', icon: '100' },
              { n: 'Migration', icon: '⇄' }, { n: 'Passed', icon: '✓' }, { n: 'Failed', icon: '✗' },
            ].map(c => (
              <div key={c.n} className="flex flex-col items-center gap-1">
                <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center" style={{ backgroundColor: t.bgTer, border: `1px solid ${t.border2}` }}>
                  <span className="text-[12px]" style={{ color: c.n === 'Failed' ? t.red : c.n === 'Passed' ? t.green : t.textMuted }}>{c.icon}</span>
                </div>
                <span className="text-[9px]" style={{ color: t.textMuted }}>{c.n}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <span className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-full" style={{ backgroundColor: t.bgTer, color: t.textMuted }}>
              <AlertTriangle className="w-3 h-3" style={{ color: t.orange }} /> Quorum Missing
            </span>
            <span className="flex items-center gap-1 text-[11px] px-3 py-1 rounded-full" style={{ backgroundColor: `${t.green}15`, color: t.green, border: `1px solid ${t.green}40` }}>
              <Users className="w-3 h-3" /> High Participation
            </span>
          </div>
        </div>
      </div>

      {/* Governance Overview */}
      <div className="px-4 mt-4">
        <div className="rounded-[16px] p-4" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <div className="flex items-center justify-between mb-1">
            <div>
              <span className="text-[15px] font-bold" style={{ color: t.text }}>Governance Overview</span>
              <span className="text-[11px] block" style={{ color: t.green }}>High Participation Proposals</span>
            </div>
            <button className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full" style={{ border: `1px solid ${t.border2}`, color: t.textMuted }}>Last 7 Days <ChevronDown className="w-3 h-3" /></button>
          </div>
          <div className="flex justify-between mt-3">
            {[
              { label: 'Proposals', value: '18', sub: '+5 vs prev 7D', subColor: t.green },
              { label: 'Avg. Turnout', value: '68.7%', sub: '+12.4%', subColor: t.green },
              { label: 'Avg. For %', value: '71.2%', sub: '+6.3%', subColor: t.green },
              { label: 'Quorum Met', value: '16', sub: '88.9%', subColor: t.green },
            ].map(s => (
              <div key={s.label} className="text-center">
                <span className="text-[10px]" style={{ color: t.textMuted }}>{s.label}</span>
                <p className="text-[18px] font-bold" style={{ color: t.text }}>{s.value}</p>
                <span className="text-[10px] font-bold" style={{ color: s.subColor }}>{s.sub}</span>
              </div>
            ))}
            <div className="text-center">
              <span className="text-[10px]" style={{ color: t.textMuted }}>Health Score</span>
              <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center mx-auto mt-1" style={{ border: `3px solid ${t.green}` }}>
                <span className="text-[14px] font-bold" style={{ color: t.text }}>78</span>
              </div>
              <span className="text-[10px] font-semibold" style={{ color: t.green }}>Good</span>
            </div>
          </div>
        </div>
      </div>

      {/* Proposals Table */}
      <div className="mt-3">
        <div className="flex items-center px-4 py-2" style={{ borderBottom: `1px solid ${t.border}` }}>
          <span className="text-[11px] font-semibold flex-1" style={{ color: t.textMuted }}>Proposal</span>
          <span className="text-[11px] font-semibold w-[60px] text-center" style={{ color: t.textMuted }}>Turnout / Quorum</span>
          <span className="text-[11px] font-semibold w-[70px] text-center" style={{ color: t.textMuted }}>For / Against</span>
          <span className="text-[11px] font-semibold w-[40px] text-center" style={{ color: t.textMuted }}>Health</span>
          <span className="text-[11px] font-semibold w-[55px] text-right" style={{ color: t.textMuted }}>Status</span>
          <span className="w-5" />
        </div>
        {proposals.map(p => (
          <div key={p.project} className="flex items-center py-3 px-4" style={{ borderBottom: `1px solid ${t.border}` }}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: p.color }}>
                  <span className="text-[9px] font-bold text-white">{p.project.slice(0, 2)}</span>
                </div>
                <div>
                  <span className="text-[12px] font-bold" style={{ color: t.text }}>{p.project}</span>
                  <span className="text-[10px] block" style={{ color: t.textMuted }}>{p.desc}</span>
                  <span className="text-[8px] font-semibold px-1.5 py-0.5 rounded mt-0.5 inline-block" style={{ backgroundColor: `${p.tagColor}20`, color: p.tagColor }}>{p.tag}</span>
                </div>
              </div>
            </div>
            <div className="w-[60px] text-center">
              <span className="text-[12px] font-bold" style={{ color: t.text }}>{p.turnout}</span>
              <span className="text-[9px] block" style={{ color: t.textMuted }}>/ {p.quorum}</span>
            </div>
            <div className="w-[70px]">
              <div className="flex gap-0.5">
                <span className="text-[10px] font-bold" style={{ color: t.green }}>{p.forPct}</span>
                <span className="text-[10px] font-bold" style={{ color: t.red }}>{p.againstPct}</span>
              </div>
              <div className="flex h-[4px] rounded-full overflow-hidden mt-1">
                <div style={{ width: p.forPct, backgroundColor: t.green }} />
                <div style={{ flex: 1, backgroundColor: t.red }} />
              </div>
            </div>
            <div className="w-[40px] flex justify-center">
              <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center" style={{ border: `2px solid ${p.health >= 80 ? t.green : t.green}` }}>
                <span className="text-[9px] font-bold" style={{ color: p.health >= 80 ? t.green : t.green }}>{p.health}</span>
              </div>
            </div>
            <div className="w-[55px] text-right">
              <div className="flex items-center gap-1 justify-end">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.green }} />
                <span className="text-[10px] font-semibold" style={{ color: t.green }}>{p.status}</span>
              </div>
              <span className="text-[9px]" style={{ color: t.textMuted }}>{p.timeLeft}</span>
            </div>
            <ChevronRight className="w-4 h-4 ml-1" style={{ color: t.textDim }} />
          </div>
        ))}
      </div>

      {/* Governance Insights */}
      <div className="px-4 mt-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" style={{ color: t.green }} />
            <span className="text-[15px] font-bold" style={{ color: t.text }}>Governance Insights</span>
          </div>
          <span className="text-[13px] font-semibold" style={{ color: t.green }}>View All</span>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {[
            { label: 'Participation Trend', value: '↑ 12.4%', sub: 'vs prev 7 days' },
            { label: 'Top Category', value: 'Parameter Change', sub: '6 proposals' },
            { label: 'Most Active Project', value: 'Chainlink', sub: '3 active votes' },
            { label: 'Avg. Decision Time', value: '2.6 days', sub: '-0.8 vs prev 7D' },
          ].map(i => (
            <div key={i.label} className="min-w-[120px] rounded-[12px] p-3" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
              <span className="text-[10px]" style={{ color: t.textMuted }}>{i.label}</span>
              <p className="text-[14px] font-bold mt-1" style={{ color: i.label === 'Participation Trend' ? t.green : i.label === 'Top Category' ? t.green : i.label === 'Avg. Decision Time' ? t.green : t.text }}>{i.value}</p>
              <span className="text-[9px]" style={{ color: t.textMuted }}>{i.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== WATCHLIST TAB ====================
function WatchlistContent() {
  const { t } = useTheme();
  return (
    <div>
      {/* Watchlist sub-filters */}
      <div className="flex gap-2 px-4 pt-3 overflow-x-auto">
        {['All', 'Assets', 'Projects', 'Votes', 'Alerts', 'More'].map((f, i) => (
          <button key={f} className="px-3 py-[6px] rounded-full text-[12px] font-semibold whitespace-nowrap" style={{
            backgroundColor: i === 0 ? `${t.green}20` : f === 'More' ? `${t.green}15` : 'transparent',
            border: `1px solid ${i === 0 ? t.green : f === 'More' ? t.green : t.border2}`,
            color: i === 0 ? t.green : f === 'More' ? t.green : t.textMuted,
          }}>
            {f === 'More' ? <span className="flex items-center gap-1">More <ChevronDown className="w-3 h-3" /></span> : f}
          </button>
        ))}
      </div>

      {/* Watchlist Overview */}
      <div className="px-4 mt-3">
        <div className="rounded-[16px] p-4" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" style={{ color: t.textMuted }} />
              <span className="text-[14px] font-bold" style={{ color: t.text }}>Watchlist Overview</span>
            </div>
            <span className="text-[13px] font-semibold" style={{ color: t.green }}>Manage</span>
          </div>
          <div className="flex gap-2">
            {[
              { icon: '🔔', value: '12', label: 'Price Alerts', color: t.green },
              { icon: '📊', value: '7', label: 'Vote Alerts', color: t.purple },
              { icon: '📢', value: '9', label: 'Project Updates', color: t.blue },
              { icon: '⏰', value: '5', label: 'Live Reminders', color: t.red },
            ].map(a => (
              <div key={a.label} className="flex-1 rounded-[10px] p-2" style={{ backgroundColor: `${a.color}10`, border: `1px solid ${a.color}30` }}>
                <div className="flex items-center gap-1">
                  <span className="text-[12px]">{a.icon}</span>
                  <span className="text-[18px] font-bold" style={{ color: a.color }}>{a.value}</span>
                </div>
                <span className="text-[9px]" style={{ color: t.textMuted }}>{a.label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3 px-2 py-2 rounded-[10px]" style={{ backgroundColor: t.bgTer }}>
            <span className="text-[11px]" style={{ color: t.textMuted }}>Next up:</span>
            <span className="text-[11px] font-semibold" style={{ color: t.green }}>ETH price above $3,500</span>
            <span className="text-[11px] font-semibold ml-auto flex items-center gap-0.5" style={{ color: t.green }}>in 1h 18m <ChevronRight className="w-3 h-3" /></span>
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="px-4 mt-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { n: 'Price Alerts', sub: 'Track price levels', icon: '🔔' },
            { n: 'Vote Alerts', sub: 'Track vote changes', icon: '📊' },
            { n: 'Project Updates', sub: 'News & updates', icon: '📢' },
            { n: 'Live Reminders', sub: 'Scheduled reminders', icon: '⏰' },
            { n: 'Saved Reports', sub: 'Your saved insights', icon: '📋' },
            { n: 'Hidden Projects', sub: 'Muted from view', icon: '🚫' },
          ].map(c => (
            <button key={c.n} className="flex items-center gap-2 p-3 rounded-[12px]" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
              <span className="text-[16px]">{c.icon}</span>
              <div className="flex-1 text-left">
                <span className="text-[13px] font-semibold block" style={{ color: t.text }}>{c.n}</span>
                <span className="text-[10px]" style={{ color: t.textMuted }}>{c.sub}</span>
              </div>
              <ChevronRight className="w-4 h-4" style={{ color: t.textDim }} />
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 p-3 rounded-[12px] mt-2 w-1/2" style={{ backgroundColor: t.bgSec, border: `1px solid ${t.border2}` }}>
          <span className="text-[16px]">📝</span>
          <div className="flex-1 text-left">
            <span className="text-[13px] font-semibold" style={{ color: t.text }}>Custom Lists</span>
            <span className="text-[10px] block" style={{ color: t.textMuted }}>Organize your watchlist</span>
          </div>
          <ChevronRight className="w-4 h-4" style={{ color: t.textDim }} />
        </button>
      </div>

      {/* Custom Lists */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[15px] font-bold" style={{ color: t.text }}>Custom Lists</span>
          <span className="text-[13px] font-semibold" style={{ color: t.green }}>View all</span>
        </div>
        {[
          { n: 'High Conviction', sub: 'My top long-term picks', icon: '⭐', count: 18 },
          { n: 'DeFi Gems', sub: 'Undervalued DeFi projects', icon: '🔥', count: 24 },
          { n: 'Moonshots', sub: 'High risk, high reward', icon: '🚀', count: 37 },
          { n: 'Swing Trades', sub: 'Short to mid-term plays', icon: '📦', count: 15 },
        ].map(l => (
          <button key={l.n} className="flex items-center gap-3 w-full py-3" style={{ borderBottom: `1px solid ${t.border}` }}>
            <span className="text-[16px]">{l.icon}</span>
            <div className="flex-1 text-left">
              <span className="text-[14px] font-bold" style={{ color: t.text }}>{l.n}</span>
              <span className="text-[11px] block" style={{ color: t.textMuted }}>{l.sub}</span>
            </div>
            <span className="text-[14px] font-semibold" style={{ color: t.textMuted }}>{l.count}</span>
            <ChevronRight className="w-4 h-4" style={{ color: t.textDim }} />
          </button>
        ))}
      </div>

      {/* Saved Reports */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[15px] font-bold" style={{ color: t.text }}>Saved Reports</span>
          <span className="text-[13px] font-semibold" style={{ color: t.green }}>View all</span>
        </div>
        {[
          { n: 'Top Gainers Report', sub: 'Daily top 50 gainers', time: 'Today, 8:00 AM' },
          { n: 'DeFi Sector Overview', sub: 'Key metrics & trends', time: 'Yesterday, 6:00 PM' },
          { n: 'AI Projects Deep Dive', sub: 'On-chain & social metrics', time: 'May 24, 10:30 AM' },
        ].map(r => (
          <button key={r.n} className="flex items-center gap-3 w-full py-3" style={{ borderBottom: `1px solid ${t.border}` }}>
            <span className="text-[16px]">📊</span>
            <div className="flex-1 text-left">
              <span className="text-[14px] font-bold" style={{ color: t.text }}>{r.n}</span>
              <span className="text-[11px] block" style={{ color: t.textMuted }}>{r.sub}</span>
            </div>
            <span className="text-[11px]" style={{ color: t.textMuted }}>{r.time}</span>
            <ChevronRight className="w-4 h-4" style={{ color: t.textDim }} />
          </button>
        ))}
      </div>

      {/* Hidden / Muted */}
      <div className="px-4 mt-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[15px] font-bold" style={{ color: t.text }}>Hidden / Muted Projects</span>
          <span className="text-[13px] font-semibold" style={{ color: t.green }}>View all</span>
        </div>
        {[
          { n: 'SafeMoon', date: 'Muted on May 12, 2024' },
          { n: 'BitConnect', date: 'Muted on Apr 3, 2024' },
          { n: 'Kishu Inu', date: 'Muted on Feb 18, 2024' },
        ].map(h => (
          <div key={h.n} className="flex items-center gap-3 py-3" style={{ borderBottom: `1px solid ${t.border}` }}>
            <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center" style={{ backgroundColor: t.bgTer }}>
              <span className="text-[10px] font-bold" style={{ color: t.textMuted }}>{h.n.slice(0, 2)}</span>
            </div>
            <div className="flex-1">
              <span className="text-[14px] font-semibold" style={{ color: t.text }}>{h.n}</span>
              <span className="text-[11px] block" style={{ color: t.textMuted }}>{h.date}</span>
            </div>
            <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: t.bgTer }}>
              <EyeOff className="w-4 h-4" style={{ color: t.textMuted }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== MAIN COMPONENT ====================
export default function MarketsPage() {
  const navigate = useNavigate();
  const { t } = useTheme();
  const [mainTab, setMainTab] = useState<'Prices' | 'Projects' | 'Votes' | 'Watchlist'>('Prices');
  const [pricesSub, setPricesSub] = useState('All');
  const [projectsSub, setProjectsSub] = useState('Trending');

  const renderPricesContent = () => {
    switch (pricesSub) {
      case 'Crypto': return <PricesCryptoContent />;
      case 'Chains': return <PricesChainsContent />;
      case 'AI': return <PricesAIContent />;
      case 'DeFi': return <PricesDeFiContent />;
      case 'More': return <PricesMoreContent />;
      default: return <PricesAllContent />;
    }
  };

  const renderProjectsContent = () => {
    switch (projectsSub) {
      case 'Verified': return <ProjectsVerifiedContent />;
      case 'More': return <ProjectsMoreContent />;
      default: return <ProjectsTrendingContent />;
    }
  };

  return (
    <div className="min-h-screen font-sans pb-[88px] antialiased" style={{ backgroundColor: t.bg, color: t.text }}>
      {/* Header */}
      <header className="sticky top-0 left-0 w-full z-50 backdrop-blur-md pt-4 pb-3 px-4 flex items-center justify-between" style={{ backgroundColor: t.backdrop, borderBottom: `1px solid ${t.border}` }}>
        <div className="flex items-center gap-2.5">
          <NewLogo className="w-[38px] h-[38px]" />
          <h1 className="text-[23px] font-bold tracking-tight" style={{ color: t.text }}>TrendUpLive</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/search')}><Search className="w-[22px] h-[22px]" strokeWidth={2.5} style={{ color: t.textSec }} /></button>
          <button onClick={() => navigate('/notifications')} className="relative">
            <Bell className="w-[22px] h-[22px]" strokeWidth={2.5} style={{ color: t.textSec }} />
            <span className="absolute top-[-2px] right-[-2px] w-[9px] h-[9px] rounded-full" style={{ backgroundColor: t.red, border: `2px solid ${t.bg}` }} />
          </button>
          <button onClick={() => navigate('/create-post')} className="w-[36px] h-[36px] rounded-full flex items-center justify-center" style={{ backgroundColor: t.green }}>
            <SquarePen className="w-[18px] h-[18px]" strokeWidth={2.5} style={{ color: '#000' }} />
          </button>
        </div>
      </header>

      {/* Main Tabs */}
      <div className="flex items-center px-6 pt-1" style={{ borderBottom: `1px solid ${t.border}` }}>
        {(['Prices', 'Projects', 'Votes', 'Watchlist'] as const).map(tab => (
          <button key={tab} onClick={() => setMainTab(tab)}
            className="flex-1 text-center text-[15px] font-bold pb-2.5 transition-colors"
            style={{ color: mainTab === tab ? t.text : t.textMuted, borderBottom: mainTab === tab ? `2.5px solid ${t.green}` : '2.5px solid transparent' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Sub-filters */}
      {mainTab === 'Prices' && (
        <PriceFilterPills active={pricesSub} setActive={setPricesSub} items={['All', 'Crypto', 'Chains', 'AI', 'DeFi', 'More']} />
      )}
      {mainTab === 'Projects' && (
        <PriceFilterPills active={projectsSub} setActive={setProjectsSub} items={['All', 'Verified', 'Trending', 'Governance', 'New', 'More']} />
      )}

      {/* Content */}
      {mainTab === 'Prices' && renderPricesContent()}
      {mainTab === 'Projects' && renderProjectsContent()}
      {mainTab === 'Votes' && <VotesContent />}
      {mainTab === 'Watchlist' && <WatchlistContent />}

      <BottomNav />
    </div>
  );
}
