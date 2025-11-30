export function buildPath(
  data,
  w = 600,
  h = 160,
  minVal = null,
  maxVal = null
) {
  const len = data.length;
  const pad = 20;
  const stepX = (w - pad * 2) / Math.max(1, len - 1);
  if (minVal === null) minVal = Math.min(...data);
  if (maxVal === null) maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;
  const points = data.map((v, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (v - minVal) / range) * (h - pad * 2);
    return [x, y];
  });
  const path = points
    .map(
      (p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`
    )
    .join(" ");
  const area = path + ` L ${w - pad},${h - pad} L ${pad},${h - pad} Z`;
  return { path, area, points };
}
