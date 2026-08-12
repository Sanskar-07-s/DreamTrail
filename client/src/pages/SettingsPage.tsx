import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Settings, Shield, Bell, Moon, Database } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { userProfile } = useAuth();
  const [currency, setCurrency] = useState(userProfile?.defaultCurrency || 'INR');

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Settings className="w-7 h-7 text-emerald-400" />
          Settings & Preferences
        </h1>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 text-xs">
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" /> Security & Platform Architecture
          </h3>
          <p className="text-gray-400 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            DreamTrail is powered by Firebase Cloud Infrastructure. Authentication state and Firestore security rules enforce strict data ownership and user privacy.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Moon className="w-4 h-4 text-cyan-400" /> Default Currency
          </h3>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-white font-mono"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
