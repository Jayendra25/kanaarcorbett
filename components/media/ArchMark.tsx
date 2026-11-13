type ArchMarkProps = {
  className?: string;
  animated?: boolean;
  showDetails?: boolean;
};

export function ArchMark({ className, animated = false, showDetails = true }: ArchMarkProps) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <svg
      className={className}
      viewBox="0 0 240 300"
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      <g className="arch-mark__group" stroke="currentColor" fill="none">
        <path
          className={animated ? "arch-line" : undefined}
          d="M20 286V128C20 76 48 40 84 22L120 6L156 22C192 40 220 76 220 128V286"
          strokeWidth="1.2"
          {...common}
        />
        <path
          className={animated ? "arch-line" : undefined}
          d="M42 286V132C42 90 64 60 94 44L120 32L146 44C176 60 198 90 198 132V286"
          strokeWidth="1"
          {...common}
        />
        <path
          className={animated ? "arch-line" : undefined}
          d="M86 286V190C86 162 100 140 120 126C140 140 154 162 154 190V286"
          strokeWidth="1.2"
          {...common}
        />
        <path
          className={animated ? "arch-line" : undefined}
          d="M10 286H230"
          strokeWidth="1.2"
          {...common}
        />
        <path
          className={animated ? "arch-line" : undefined}
          d="M26 294H214"
          strokeWidth="0.9"
          opacity="0.7"
          {...common}
        />
        <path
          className={animated ? "arch-line" : undefined}
          d="M120 0L126 9L120 18L114 9Z"
          strokeWidth="1.1"
          {...common}
        />
        {showDetails ? (
          <g className={animated ? "arch-detail" : undefined} opacity="0.72">
            <path d="M20 128H42M198 128H220" strokeWidth="0.9" {...common} />
            <path d="M31 128V286M209 128V286" strokeWidth="0.7" opacity="0.65" {...common} />
            <path d="M20 178H28M212 178H220M20 238H28M212 238H220" strokeWidth="0.9" {...common} />
            <path d="M100 286V266H140V286" strokeWidth="0.9" {...common} />
            <path d="M120 112V96" strokeWidth="0.9" {...common} />
            <path d="M120 88L124 94L120 100L116 94Z" strokeWidth="0.9" {...common} />
          </g>
        ) : null}
      </g>
    </svg>
  );
}