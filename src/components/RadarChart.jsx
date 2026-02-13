import { useMemo } from 'react'

export default function RadarChart({ data, size = 280 }) {
  const center = size / 2
  const radius = size * 0.38
  const levels = 4

  const points = useMemo(() => {
    const angleStep = (2 * Math.PI) / data.length
    return data.map((item, i) => {
      const angle = angleStep * i - Math.PI / 2
      const value = item.score / 100
      return {
        ...item,
        angle,
        x: center + Math.cos(angle) * radius * value,
        y: center + Math.sin(angle) * radius * value,
        labelX: center + Math.cos(angle) * (radius + 24),
        labelY: center + Math.sin(angle) * (radius + 24),
        gridX: center + Math.cos(angle) * radius,
        gridY: center + Math.sin(angle) * radius,
      }
    })
  }, [data, center, radius])

  // Create the polygon path for the data
  const dataPath = points.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ') + ' Z'

  // Create grid paths
  const gridPaths = []
  for (let level = 1; level <= levels; level++) {
    const levelRadius = (radius / levels) * level
    const angleStep = (2 * Math.PI) / data.length
    const path = data.map((_, i) => {
      const angle = angleStep * i - Math.PI / 2
      const x = center + Math.cos(angle) * levelRadius
      const y = center + Math.sin(angle) * levelRadius
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ') + ' Z'
    gridPaths.push(path)
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid circles */}
        {gridPaths.map((path, i) => (
          <path
            key={i}
            d={path}
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {points.map((p, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={p.gridX}
            y2={p.gridY}
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="1"
          />
        ))}

        {/* Data polygon fill */}
        <path
          d={dataPath}
          fill="rgba(232, 64, 90, 0.15)"
          stroke="none"
        />

        {/* Data polygon stroke */}
        <path
          d={dataPath}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="var(--color-accent)"
            stroke="#0a0a0a"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {points.map((p, i) => {
          // Determine text anchor based on position
          let textAnchor = 'middle'
          if (p.labelX < center - 10) textAnchor = 'end'
          else if (p.labelX > center + 10) textAnchor = 'start'

          let dy = '0.35em'
          if (p.labelY < center - radius * 0.5) dy = '0.8em'
          else if (p.labelY > center + radius * 0.5) dy = '0em'

          return (
            <text
              key={i}
              x={p.labelX}
              y={p.labelY}
              textAnchor={textAnchor}
              dy={dy}
              className="text-[11px] fill-[var(--color-text-muted)]"
              style={{ fontFamily: 'inherit' }}
            >
              {p.label}
            </text>
          )
        })}
      </svg>

      {/* Center score */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ top: -4 }}
      >
        <div className="text-center">
          <span className="text-2xl font-semibold text-[var(--color-accent)]">
            {Math.round(data.reduce((acc, d) => acc + d.score, 0) / data.length)}%
          </span>
          <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">avg match</p>
        </div>
      </div>
    </div>
  )
}
