'use client'
import React, { useState } from 'react';
import { Plus, Calculator, TrendingUp, TrendingDown, Target, DollarSign } from 'lucide-react';

const KhaiLagaiCalculator = () => {
    const [entries, setEntries] = useState([
        { id: 1, type: 'khai', team: 'A', odds: '', amount: '' }
    ]);
    const [results, setResults] = useState({ teamA: 0, teamB: 0 });

    const addEntry = () => {
        const newId = Math.max(...entries.map(e => e.id)) + 1;
        setEntries([...entries, { id: newId, type: 'khai', team: 'A', odds: '', amount: '' }]);
    };

    const updateEntry = (id, field, value) => {
        setEntries(entries.map(entry =>
            entry.id === id ? { ...entry, [field]: value } : entry
        ));
    };

    const removeEntry = (id) => {
        if (entries.length > 1) {
            setEntries(entries.filter(entry => entry.id !== id));
        }
    };

    const calculate = () => {
        let teamAWin = 0;
        let teamBWin = 0;

        entries.forEach(entry => {
            const { type, team, odds: oddsValue, amount: amountValue } = entry;
            let odd = parseFloat(oddsValue);
            const amt = parseFloat(amountValue);

            if (!odd || !amt) return;

            // Convert odds if necessary
            if (odd >= 10) {
                odd = 1 + (odd / 100);
            }

            let profitWin = 0;
            let lossLose = 0;

            if (type === 'khai') {
                // Khai (lay)
                profitWin = amt; // If team loses
                lossLose = amt * (odd - 1); // If team wins
            } else {
                // Lagai (back)
                profitWin = amt * (odd - 1); // If team wins
                lossLose = amt; // If team loses
            }

            if (team === "A") {
                teamAWin += (type === 'khai') ? -lossLose : profitWin;
                teamBWin += (type === 'khai') ? profitWin : -lossLose;
            } else if (team === "B") {
                teamBWin += (type === 'khai') ? -lossLose : profitWin;
                teamAWin += (type === 'khai') ? profitWin : -lossLose;
            }
        });

        setResults({ teamA: teamAWin, teamB: teamBWin });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
                        <Target className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Khai/Lagai Calculator
                    </h1>
                    <p className="text-purple-200 text-lg">
                        Multi-Entry Betting Calculator for Strategic Analysis
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Panel - Entry Form */}
                    <div className="space-y-6">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                                    <DollarSign className="w-6 h-6" />
                                    Betting Entries
                                </h2>
                                <button
                                    onClick={addEntry}
                                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Entry
                                </button>
                            </div>

                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {entries.map((entry, index) => (
                                    <div key={entry.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-white font-medium">Entry #{index + 1}</span>
                                            {entries.length > 1 && (
                                                <button
                                                    onClick={() => removeEntry(entry.id)}
                                                    className="text-red-400 hover:text-red-300 text-sm px-2 py-1 rounded hover:bg-red-500/20 transition-colors"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-purple-200 text-sm font-medium mb-1">Type</label>
                                                <select
                                                    value={entry.type}
                                                    onChange={(e) => updateEntry(entry.id, 'type', e.target.value)}
                                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                >
                                                    <option value="khai">Khai (Lay)</option>
                                                    <option value="lagai">Lagai (Back)</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-purple-200 text-sm font-medium mb-1">Team</label>
                                                <select
                                                    value={entry.team}
                                                    onChange={(e) => updateEntry(entry.id, 'team', e.target.value)}
                                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                >
                                                    <option value="A">Team A</option>
                                                    <option value="B">Team B</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-purple-200 text-sm font-medium mb-1">
                                                    Odds <span className="text-xs">(e.g. 60p = 60)</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={entry.odds}
                                                    onChange={(e) => updateEntry(entry.id, 'odds', e.target.value)}
                                                    placeholder="60"
                                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-purple-200 text-sm font-medium mb-1">Amount (₹)</label>
                                                <input
                                                    type="number"
                                                    value={entry.amount}
                                                    onChange={(e) => updateEntry(entry.id, 'amount', e.target.value)}
                                                    placeholder="5000"
                                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={calculate}
                                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                            >
                                <Calculator className="w-5 h-5" />
                                Calculate Results
                            </button>
                        </div>
                    </div>

                    {/* Right Panel - Results */}
                    <div className="space-y-6">
                        {/* Entries Summary Table */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-semibold text-white mb-4">Current Entries</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/20">
                                            <th className="text-left text-purple-200 py-2 px-3">Type</th>
                                            <th className="text-left text-purple-200 py-2 px-3">Team</th>
                                            <th className="text-left text-purple-200 py-2 px-3">Odds</th>
                                            <th className="text-left text-purple-200 py-2 px-3">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {entries.map((entry, index) => (
                                            <tr key={entry.id} className="border-b border-white/10">
                                                <td className="py-2 px-3">
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${entry.type === 'khai'
                                                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                                        : 'bg-green-500/20 text-green-300 border border-green-500/30'
                                                        }`}>
                                                        {entry.type.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="text-white py-2 px-3 font-medium">{entry.team}</td>
                                                <td className="text-purple-200 py-2 px-3">{entry.odds || '-'}</td>
                                                <td className="text-purple-200 py-2 px-3">₹{entry.amount || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" />
                                Profit/Loss Analysis
                            </h3>

                            <div className="space-y-4">
                                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                                            <span className="text-white font-semibold text-lg">Team A Wins</span>
                                        </div>
                                        <div className={`text-2xl font-bold ${results.teamA >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {results.teamA >= 0 ? '+' : ''}₹{results.teamA.toFixed(2)}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-orange-500/30">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                                            <span className="text-white font-semibold text-lg">Team B Wins</span>
                                        </div>
                                        <div className={`text-2xl font-bold ${results.teamB >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {results.teamB >= 0 ? '+' : ''}₹{results.teamB.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Risk Analysis */}
                            {(results.teamA !== 0 || results.teamB !== 0) && (
                                <div className="mt-6 pt-4 border-t border-white/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target className="w-4 h-4 text-purple-300" />
                                        <span className="text-purple-200 text-sm font-medium">Risk Analysis</span>
                                    </div>
                                    <div className="text-sm text-purple-300">
                                        <div>Max Profit: ₹{Math.max(results.teamA, results.teamB).toFixed(2)}</div>
                                        <div>Max Loss: ₹{Math.min(results.teamA, results.teamB).toFixed(2)}</div>
                                        <div>Risk Range: ₹{(Math.max(results.teamA, results.teamB) - Math.min(results.teamA, results.teamB)).toFixed(2)}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KhaiLagaiCalculator;