type IconProps = {
  className?: string;
  size?: number;
};

const base = (size = 16) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export function ArrowRight({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M20 12H5" />
      <path d="m11 6-6 6 6 6" />
    </svg>
  );
}

export function ArrowUpRight({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowUp({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 20V4" />
      <path d="m6 10 6-6 6 6" />
    </svg>
  );
}

export function Close({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="m5 5 14 14M19 5 5 19" />
    </svg>
  );
}

export function Plus({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Minus({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function Check({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function Diamond({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className} fill="currentColor" stroke="none">
      <path d="M12 2 22 12 12 22 2 12Z" />
    </svg>
  );
}

export function Play({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
    </svg>
  );
}

export function Phone({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2.5 2.5 0 0 1-2.7 2.5C10.4 19.5 4.5 13.6 4 5.7A2.5 2.5 0 0 1 6.5 3Z" />
    </svg>
  );
}

export function WhatsApp({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true">
      <path d="M20.4 11.6a8.3 8.3 0 0 1-12.3 7.4L3.6 20.4l1.5-4.4a8.3 8.3 0 1 1 15.3-4.4Z" />
      <path d="M9.1 8.2c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5l.7 1.5c.1.2 0 .4-.1.6l-.4.5c-.1.2-.2.3 0 .6.4.7 1.1 1.4 1.9 1.9.2.1.4.1.6-.1l.6-.7c.1-.2.4-.2.5-.1l1.5.8c.2.1.3.3.3.5 0 .6-.2 1.3-.5 1.7-.4.4-1 .7-1.8.7-1 0-2.6-.4-4.1-1.8-1.1-1-1.9-2.2-2.2-3-.3-.8-.1-1.5.2-2.1Z" />
    </svg>
  );
}

export function Instagram({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ParkingIndoor({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M8 10h2a2 2 0 0 1 0 4H8V10Z" />
      <path d="M8 10v8" />
    </svg>
  );
}

export function ParkingOutdoor({ className, size }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5 19v-7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7" />
      <path d="M5 19h14" />
      <path d="M10 10h2a2 2 0 0 1 0 4h-2V10Z" />
      <path d="M10 10v8" />
    </svg>
  );
}