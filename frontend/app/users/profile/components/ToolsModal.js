"use client";

import React from "react";

export default function ToolsModal({
    show,
    onClose,
    distanceKm,
    setDistanceKm,
    numTolls,
    setNumTolls,
    avgToll,
    setAvgToll,
    avgSpeed,
    setAvgSpeed,
    fuelEfficiency,
    setFuelEfficiency,
    fuelPrice,
    setFuelPrice,
    calcResult,
    setCalcResult,
}) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Route Cost & Toll Estimator</h3>
                    <button onClick={onClose} className="text-gray-500">
                        ✕
                    </button>
                </div>

                <div className="mt-4 space-y-3">
                    <div>
                        <label className="text-sm text-gray-600">Distance (km)</label>
                        <input
                            type="number"
                            value={distanceKm}
                            onChange={(e) => setDistanceKm(Number(e.target.value))}
                            className="w-full mt-1 border rounded p-2"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <label className="text-sm text-gray-600"># Toll Plazas</label>
                            <input
                                type="number"
                                value={numTolls}
                                onChange={(e) => setNumTolls(Number(e.target.value))}
                                className="w-full mt-1 border rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Avg Toll (₹)</label>
                            <input
                                type="number"
                                value={avgToll}
                                onChange={(e) => setAvgToll(Number(e.target.value))}
                                className="w-full mt-1 border rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Avg Speed (km/h)</label>
                            <input
                                type="number"
                                value={avgSpeed}
                                onChange={(e) => setAvgSpeed(Number(e.target.value))}
                                className="w-full mt-1 border rounded p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-sm text-gray-600">Fuel eff. (km/l)</label>
                            <input
                                type="number"
                                value={fuelEfficiency}
                                onChange={(e) => setFuelEfficiency(Number(e.target.value))}
                                className="w-full mt-1 border rounded p-2"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Fuel price (₹/l)</label>
                            <input
                                type="number"
                                value={fuelPrice}
                                onChange={(e) => setFuelPrice(Number(e.target.value))}
                                className="w-full mt-1 border rounded p-2"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-2">
                        <button
                            onClick={() => {
                                const tollCost = numTolls * avgToll;
                                const fuelCost =
                                    fuelEfficiency > 0
                                        ? (distanceKm / fuelEfficiency) * fuelPrice
                                        : 0;
                                const etaHours = avgSpeed > 0 ? distanceKm / avgSpeed : 0;
                                setCalcResult({
                                    tollCost: Number(tollCost.toFixed(2)),
                                    fuelCost: Number(fuelCost.toFixed(2)),
                                    total: Number((tollCost + fuelCost).toFixed(2)),
                                    etaHours,
                                });
                            }}
                            className="flex-1 py-2 bg-indigo-600 text-white rounded-lg"
                        >
                            Calculate
                        </button>
                        <button
                            onClick={() => {
                                setDistanceKm(0);
                                setNumTolls(0);
                                setAvgToll(0);
                                setFuelEfficiency(0);
                                setFuelPrice(0);
                                setAvgSpeed(0);
                                setCalcResult(null);
                            }}
                            className="flex-1 py-2 bg-white border rounded-lg"
                        >
                            Reset
                        </button>
                    </div>

                    {calcResult && (
                        <div className="mt-3 bg-gray-50 p-3 rounded">
                            <div className="text-sm">
                                Toll cost:{" "}
                                <span className="font-semibold">₹{calcResult.tollCost}</span>
                            </div>
                            <div className="text-sm">
                                Fuel cost:{" "}
                                <span className="font-semibold">₹{calcResult.fuelCost}</span>
                            </div>
                            <div className="text-sm">
                                Total estimated cost:{" "}
                                <span className="font-semibold">₹{calcResult.total}</span>
                            </div>
                            <div className="text-sm">
                                Estimated time:{" "}
                                <span className="font-semibold">
                                    {Math.floor(calcResult.etaHours)}h{" "}
                                    {Math.round((calcResult.etaHours % 1) * 60)}m
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
