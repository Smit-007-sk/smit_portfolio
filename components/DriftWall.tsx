"use client";

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./DriftWall.css";

export interface DriftWallItem {
  name: string;
  category: string;
  icon: React.ReactNode;
  href?: string;
  image?: string;
  title?: string;
}

const DEFAULT_ITEMS: DriftWallItem[] = [
  {
    name: "HTML",
    category: "Markup Language",
    icon: (
      <svg className="w-9 h-9 shrink-0" viewBox="0 0 32 32" fill="none">
        <path d="M5 3L7.5 27L16 29.5L24.5 27L27 3H5Z" fill="#E44D26" />
        <path d="M16 27.3L22.8 25.4L25 5.5H16V27.3Z" fill="#F16529" />
        <path d="M16 13.7H12.3L12 10H16V6.4H8L9 17.3H16V13.7ZM16 21.9L12.5 21L12.2 17.3H8.6L9.2 24.3L16 26.2V21.9Z" fill="white" />
        <path d="M16 13.7V17.3H19.2L18.9 21L16 21.9V26.2L22.8 24.3L23.7 13.7H16ZM16 6.4V10H24L24.3 6.4H16Z" fill="#EBEBEB" />
      </svg>
    ),
  },
  {
    name: "CSS",
    category: "Styling Language",
    icon: (
      <svg className="w-9 h-9 shrink-0" viewBox="0 0 32 32" fill="none">
        <path d="M5 3L7.5 27L16 29.5L24.5 27L27 3H5Z" fill="#264DE4" />
        <path d="M16 27.3L22.8 25.4L25 5.5H16V27.3Z" fill="#2965F1" />
        <path d="M16 13.7H12.3L12.6 17.3H16V20.9L12.5 20L12.3 17.3H8.7L9.2 23.6L16 25.5V20.9ZM16 6.4H8.4L8.7 10H16V6.4Z" fill="white" />
        <path d="M16 13.7V10H23.7L24 6.4H16V10H20.1L19.7 13.7H16ZM16 20.9V25.5L22.8 23.6L23.7 13.7H20.1L19.4 20.9L16 20.9Z" fill="#EBEBEB" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    category: "Programming Language",
    icon: (
      <div className="w-9 h-9 bg-[#F7DF1E] rounded-md flex items-end justify-end p-1 shrink-0 font-bold text-black text-xs font-mono select-none">
        JS
      </div>
    ),
  },
  {
    name: "TypeScript",
    category: "Typed JavaScript",
    icon: (
      <div className="w-9 h-9 bg-[#3178C6] rounded-md flex items-end justify-end p-1 shrink-0 font-bold text-white text-xs font-mono select-none">
        TS
      </div>
    ),
  },
  {
    name: "React",
    category: "UI Library",
    icon: (
      <svg className="w-9 h-9 shrink-0 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    category: "React Framework",
    icon: (
      <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center shrink-0 font-black text-white text-xs font-sans select-none border border-white/20">
        N
      </div>
    ),
  },
  {
    name: "NestJS",
    category: "Backend Framework",
    icon: (
      <svg className="w-9 h-9 shrink-0 text-[#E0234E]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-6h2v6zm0-8h-2V7h2v1.5z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    category: "Utility-first CSS",
    icon: (
      <svg className="w-9 h-9 shrink-0 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: "SQL",
    category: "Query Language",
    icon: (
      <svg className="w-9 h-9 shrink-0 text-[#00618A]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.68 0 8 1.35 8 2s-3.32 2-8 2-8-1.35-8-2 3.32-2 8-2zm0 16c-4.68 0-8-1.35-8-2v-2.15c1.91 1.15 4.81 1.85 8 1.85s6.09-.7 8-1.85V18c0 .65-3.32 2-8 2zm0-5c-4.68 0-8-1.35-8-2v-2.15c1.91 1.15 4.81 1.85 8 1.85s6.09-.7 8-1.85V13c0 .65-3.32 2-8 2z" />
      </svg>
    ),
  },
  {
    name: "ES6+",
    category: "Modern JavaScript",
    icon: (
      <div className="w-9 h-9 bg-[#F7DF1E] rounded-md flex items-center justify-center shrink-0 font-extrabold text-black text-xs font-mono select-none">
        ES6
      </div>
    ),
  },
  {
    name: "Sass",
    category: "CSS Preprocessor",
    icon: (
      <div className="w-9 h-9 rounded-md bg-[#CF649A]/10 flex items-center justify-center shrink-0 font-serif italic text-base font-black text-[#CF649A] select-none">
        Sass
      </div>
    ),
  },
  {
    name: "Git",
    category: "Version Control",
    icon: (
      <div className="w-8 h-8 bg-[#F05032] rounded-lg rotate-45 flex items-center justify-center shrink-0 shadow-sm">
        <svg className="w-4 h-4 text-white -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="6" y1="3" x2="6" y2="15" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M18 9a9 9 0 0 1-9 9" />
        </svg>
      </div>
    ),
  },
  {
    name: "GitHub",
    category: "Code Collaboration",
    icon: (
      <svg className="w-9 h-9 shrink-0 text-[#181717]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "VS Code",
    category: "Code Editor",
    icon: (
      <svg className="w-9 h-9 shrink-0 text-[#007ACC]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63L2.8 5.42a.747.747 0 0 0-.968.083L.224 7.111a.747.747 0 0 0 .025 1.077l4.63 4.195-4.63 4.194a.747.747 0 0 0-.025 1.077l1.608 1.608a.747.747 0 0 0 .968.083l4.245-3.713 9.46 8.63c.48.438 1.185.545 1.705.29l4.94-2.377A1.5 1.5 0 0 0 24 20.93V3.07a1.5 1.5 0 0 0-.85-1.383zm-6.27 15.653l-7.23-6.24 7.23-6.24v12.48z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    category: "JS Runtime",
    icon: (
      <svg className="w-9 h-9 shrink-0 text-[#5FA04E]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2.5 7.5v9L12 22l9.5-5.5v-9L12 2zm7.5 13.6L12 19.8l-7.5-4.2V8.4L12 4.2l7.5 4.2v7.2z" />
      </svg>
    ),
  },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const columnFactor = (index: number, variance: number) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

export interface DriftWallProps {
  items?: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  radius?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: "up" | "down";
  variance?: number;
  parallax?: number;
  pauseOnHover?: boolean;
  lift?: number;
  fade?: number;
  dim?: number;
  grayscale?: boolean;
  overlayColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function DriftWall({
  items = DEFAULT_ITEMS,
  columns = 3,
  tileWidth = 240,
  tileHeight = 110,
  gap = 18,
  radius = 18,
  tilt = 12,
  turn = -10,
  roll = 0,
  perspective = 1200,
  depth = 80,
  speed = 32,
  direction = "up",
  variance = 0.45,
  parallax = 0.6,
  pauseOnHover = false,
  lift = 50,
  fade = 0.6,
  dim = 0.85,
  grayscale = false,
  overlayColor = "transparent",
  className = "",
  style,
}: DriftWallProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const planeRef = useRef<HTMLDivElement | null>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const offsetsRef = useRef<number[]>([]);
  const velocitiesRef = useRef<number[]>([]);
  const hoveredColRef = useRef<number>(-1);
  const wallHoveredRef = useRef<boolean>(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerDampedRef = useRef({ x: 0, y: 0 });
  const lastTsRef = useRef<number | null>(null);

  const [containerHeight, setContainerHeight] = useState(540);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const columnItems = useMemo(() => {
    const cols: DriftWallItem[][] = Array.from({ length: columns }, () => []);
    items.forEach((item, i) => cols[i % columns].push(item));
    return cols.map((col) => (col.length ? col : items.slice(0, 1)));
  }, [items, columns]);

  const columnMeta = useMemo(() => {
    const unit = tileHeight + gap;
    return columnItems.map((col) => {
      const copyHeight = Math.max(unit, col.length * unit);
      const copies = Math.max(2, Math.ceil((containerHeight * 1.6) / copyHeight) + 1);
      return { copyHeight, copies };
    });
  }, [columnItems, tileHeight, gap, containerHeight]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height || 540);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const baseVelocities = useMemo(() => {
    const dirSign = direction === "up" ? 1 : -1;
    return columnItems.map((_, c) => {
      const altSign = c % 2 === 0 ? 1 : -1;
      return speed * columnFactor(c, variance) * dirSign * altSign;
    });
  }, [columnItems, speed, direction, variance]);

  useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, c) => meta.copyHeight * ((c * 0.37) % 1));
    velocitiesRef.current = columnItems.map(() => 0);
  }, [columnMeta, columnItems]);

  const applyPlaneTransform = useCallback(
    (px: number, py: number) => {
      const plane = planeRef.current;
      if (!plane) return;
      plane.style.transform =
        `translate(-50%, -50%) scale(1.12) ` +
        `rotateX(${tilt + py}deg) rotateY(${turn + px}deg) rotateZ(${roll}deg) ` +
        `translateZ(${-depth}px)`;
    },
    [tilt, turn, roll, depth]
  );

  useEffect(() => {
    const animate = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, Math.max(0, ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      const maxTilt = parallax * 8;
      const targetX = pointerRef.current.x * maxTilt;
      const targetY = -pointerRef.current.y * maxTilt;
      const damp = 1 - Math.exp(-dt / 0.12);
      pointerDampedRef.current.x += (targetX - pointerDampedRef.current.x) * damp;
      pointerDampedRef.current.y += (targetY - pointerDampedRef.current.y) * damp;
      applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);

      if (!reduced) {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const meta = columnMeta[c];
          if (!meta) continue;
          const paused = wallHoveredRef.current && pauseOnHover;
          const factor = paused || hoveredColRef.current === c ? 0 : 1;
          const target = baseVelocities[c] * factor;

          const ease = 1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28));
          velocitiesRef.current[c] += (target - velocitiesRef.current[c]) * ease;
          let next = (offsetsRef.current[c] ?? 0) + velocitiesRef.current[c] * dt;
          next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
          offsetsRef.current[c] = next;

          const el = trackRefs.current[c];
          if (el) el.style.transform = `translate3d(0, ${-next}px, 0)`;
        }
      } else {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const el = trackRefs.current[c];
          const meta = columnMeta[c];
          if (el && meta) el.style.transform = `translate3d(0, ${-(offsetsRef.current[c] ?? 0)}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [baseVelocities, columnMeta, pauseOnHover, parallax, reduced, applyPlaneTransform]);

  const activate = useCallback((id: string, index: number) => {
    activeIdRef.current = id;
    hoveredColRef.current = index;
    setActiveId(id);
  }, []);

  const release = useCallback(() => {
    activeIdRef.current = null;
    hoveredColRef.current = -1;
    setActiveId(null);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      if (parallax > 0 && !reduced) {
        pointerRef.current = {
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        };
      }
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const tile = hit && hit.closest ? (hit.closest("[data-tile-id]") as HTMLElement | null) : null;
      if (!tile) return;
      const id = tile.dataset.tileId;
      if (!id || id === activeIdRef.current) return;
      activeIdRef.current = id;
      hoveredColRef.current = Number(tile.dataset.col);
      setActiveId(id);
    },
    [parallax, reduced]
  );

  const handlePointerLeaveWall = useCallback(() => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    release();
  }, [release]);

  const cssVars = useMemo(
    () => ({
      "--dw-tile-w": `${tileWidth}px`,
      "--dw-tile-h": `${tileHeight}px`,
      "--dw-gap": `${gap}px`,
      "--dw-radius": `${radius}px`,
      "--dw-perspective": `${perspective}px`,
      "--dw-lift": `${lift}px`,
      "--dw-dim": dim,
      "--dw-gray": grayscale ? 1 : 0,
      "--dw-overlay": overlayColor,
      "--dw-edge": `${Math.max(0, (1 - fade) * 100)}%`,
      ...style,
    }),
    [tileWidth, tileHeight, gap, radius, perspective, lift, dim, grayscale, overlayColor, fade, style]
  );

  const renderTile = (item: DriftWallItem, id: string, colIndex: number) => {
    const inner = (
      <span className="drift-wall__inner">
        <span className="shrink-0 transition-transform duration-300">
          {item.icon}
        </span>
        <span className="flex flex-col justify-between h-full min-w-0">
          <span>
            <span className="block text-sm font-extrabold text-[#111111] tracking-wide leading-tight truncate">
              {item.name}
            </span>
            <span className="block text-[11px] text-neutral-500 font-medium mt-0.5 truncate">
              {item.category}
            </span>
          </span>
          <span className="w-5 h-[2px] bg-[#F14E08] mt-2 rounded-full block"></span>
        </span>
        <span className="drift-wall__overlay" aria-hidden="true" />
      </span>
    );

    const commonProps = {
      className: `drift-wall__tile${activeId === id ? " is-active" : ""}`,
      "data-tile-id": id,
      "data-col": colIndex,
      onFocus: () => activate(id, colIndex),
      onBlur: release,
    };

    if (item.href) {
      return (
        <a key={id} href={item.href} target="_blank" rel="noreferrer noopener" {...commonProps}>
          {inner}
        </a>
      );
    }

    return (
      <div key={id} tabIndex={0} role="button" aria-label={item.name} {...commonProps}>
        {inner}
      </div>
    );
  };

  const rootClass = ["drift-wall", reduced ? "drift-wall--reduced" : "", className].filter(Boolean).join(" ");

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={cssVars as React.CSSProperties}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={handlePointerLeaveWall}
      role="group"
      aria-label="Drifting wall of tech cards"
    >
      <div ref={planeRef} className="drift-wall__plane">
        {columnItems.map((col, c) => {
          const meta = columnMeta[c];
          const copies = Array.from({ length: meta.copies });
          return (
            <div className="drift-wall__col" key={`col-${c}`}>
              <div className="drift-wall__track" ref={(el) => { trackRefs.current[c] = el; }}>
                {copies.map((_, copyIndex) =>
                  col.map((item, itemIndex) => renderTile(item, `${c}-${copyIndex}-${itemIndex}`, c))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
