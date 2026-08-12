import React from 'react';
import { useDreams } from '../hooks/useDreams';
import { useMemories } from '../hooks/useMemories';
import { useAuth } from '../hooks/useAuth';
import { BarChart3, PieChart as PieIcon, TrendingUp, DollarSign, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const StatisticsPage: React.FC = () => {
  const { userProfile } = useAuth();
  const { dreams } = useDreams();
  const { memories } = useMemories();

  const totalDreams = dreams.length;
  const completedDreams = dreams.filter((d) => d.status === 'COMPLETED');
  const completionRate = totalDreams > 0 ? Math.round((completedDreams.length / totalDreams) * 100) : 0;

  const totalEstimatedBudget = dreams.reduce((sum, d) => sum + (d.estimatedBudget || 0), 0);
  const totalActualBudget = dreams.reduce((sum, d) => sum + (d.actualBudget || 0), 0);

  // Category Distribution
  const categoryCounts: Record<string, number> = {};
  dreams.forEach((d) => {
    const cat = d.categoryName || 'Other';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const categoryData = Object.keys(categoryCounts).map((cat) => ({
    name: cat,
    value: categoryCounts[cat]
  }));

  const COLORS = ['#10B981', '#06B6D4', '#8B5CF6', '#F59E0B', '#EC4899', '#3B82F6'];

  // Status Breakdown Data
  const statusData = [
    { name: 'Completed', count: dreams.filter((d) => d.status === 'COMPLETED').length, fill: '#10B981' },
    { name: 'In Progress', count: dreams.filter((d) => d.status === 'IN_PROGRESS').length, fill: '#06B6D4' },
    { name: 'Planning', count: dreams.filter((d) => d.status === 'PLANNING').length, fill: '#F59E0B' },
    { name: 'Dream', count: dreams.filter((d) => d.status === 'DREAM').length, fill: '#8B5CF6' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <BarChart3 className="w-7 h-7 text-emerald-400" />
          Life Experience Analytics
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Deep-dive statistics into your bucket-list progress, geographic reach, category breakdown, and financial investments.
        </p>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Total Dreams
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">{totalDreams}</div>
          <div className="text-[10px] text-gray-400">{completedDreams.length} completed</div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Completion Rate
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">{completionRate}%</div>
          <div className="text-[10px] text-gray-400">Target goal: 100%</div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Memories Logged
          </div>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono">{memories.length}</div>
          <div className="text-[10px] text-gray-400">With geo pins & photos</div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Total Investment
          </div>
          <div className="text-xl font-extrabold text-amber-400 font-mono">
            ₹{totalEstimatedBudget.toLocaleString()}
          </div>
          <div className="text-[10px] text-gray-400">Estimated total budget</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Distribution Bar Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Dreams by Status
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#131C2E', borderColor: '#1E293B', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {statusData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Pie Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-cyan-400" />
            Category Share
          </h3>
          <div className="h-64">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#131C2E', borderColor: '#1E293B', borderRadius: '12px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-gray-400">
                No category data available yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
