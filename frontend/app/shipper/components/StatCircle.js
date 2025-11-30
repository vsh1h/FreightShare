"use client";

import { PieChart, Pie, Cell } from "recharts";

import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function StatCircle({ value }) {
  const percent = value; // e.g. 63
  const data = [
    { name: "Completed", value: percent },
    { name: "Remaining", value: 100 - percent },
  ];

  // your exact palette from the image
  // const COLORS = ["#4961C2", "#F5F2FF"];
  // Blue-purple & light lavender background
  const COLORS = ["#A0AEE8", "#F5F2FF"]; // faded lighter blue & lavender background

  const tooltipId = `stat-circle-tooltip-${percent}`;

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <div
        className="relative w-24 h-24 flex items-center justify-center transform transition-transform duration-300 ease-in-out"
        style={{ animation: "fadeIn 1s ease-in forwards" }}
        data-tooltip-id={tooltipId}
        data-tooltip-content={`${percent}% Completed`}
      >
        <PieChart width={96} height={96}>
          <Pie
            data={data}
            innerRadius={35}
            outerRadius={48}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>

        <span className="absolute text-lilac-400 font-semibold text-lg">
          {percent}%
        </span>
      </div>

      <Tooltip id={tooltipId} place="top" effect="solid" />
    </>
  );
}
