"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import "./OptionWheel.css";

const DEFAULT_ITEMS = [
  "HOME",
  "ABOUT",
  "WORK",
  "SERVICES",
  "SKILLS",
  "CONTACT",
];

export interface OptionWheelProps {
  items?: string[];
  defaultSelected?: number;
  onChange?: (index: number, item: string) => void;
  onSelect?: (item: string, index: number) => void;
  textColor?: string;
  activeColor?: string;
  side?: "left" | "right";
  fontSize?: number;
  spacing?: number;
  curve?: number;
  tilt?: number;
  blur?: number;
  fade?: number;
  minOpacity?: number;
  smoothing?: number;
  inset?: number;
  loop?: boolean;
  draggable?: boolean;
  soundUrl?: string;
  soundVolume?: number;
  className?: string;
}

export default function OptionWheel({
  items = DEFAULT_ITEMS,
  defaultSelected = 0,
  onChange,
  onSelect,
  textColor = "#888888",
  activeColor = "#F14E08",
  side = "left",
  fontSize = 2.4,
  spacing = 1.35,
  curve = 1.1,
  tilt = 10,
  blur = 1.2,
  fade = 0.28,
  minOpacity = 0.08,
  smoothing = 140,
  inset = 35,
  loop = false,
  draggable = true,
  soundUrl = "",
  soundVolume = 0.5,
  className = "",
}: OptionWheelProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const posRef = useRef<number>(defaultSelected);
  const targetRef = useRef<number>(defaultSelected);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);
  const cfgRef = useRef<Record<string, any>>({});
  const onChangeRef = useRef(onChange);
  const selectedRef = useRef<number>(defaultSelected);
  const wheelTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Touch & Drag state with velocity tracking for mobile flick momentum
  const dragRef = useRef<{
    startY: number;
    lastY: number;
    startTime: number;
    lastTime: number;
    startTarget: number;
    velocity: number;
  } | null>(null);
  const dragMovedRef = useRef<boolean>(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string>("");
  const lastTickRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(defaultSelected);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const remPx =
    typeof window !== "undefined"
      ? parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
      : 16;

  onChangeRef.current = onChange;
  cfgRef.current = {
    count: items.length,
    items,
    rowH: Math.max(fontSize * spacing * remPx, 1),
    curve,
    tilt,
    blur,
    fade,
    minOpacity,
    side,
    loop,
    smoothing,
    draggable,
    soundUrl,
    soundVolume,
  };

  const runFrame = useCallback((now: number) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const cfg = cfgRef.current;
    const tau = isDraggingRef.current ? 0.025 : Math.max(cfg.smoothing, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    const target = targetRef.current;
    const cur = posRef.current;
    let next = cur + (target - cur) * k;
    const settled = Math.abs(target - next) < 0.001;
    if (settled) next = target;
    posRef.current = next;

    const els = itemRefs.current;
    const n = cfg.count;
    const mirror = cfg.side === "right" ? -1 : 1;
    const tiltRad = (cfg.tilt * Math.PI) / 180;
    const R = tiltRad > 0.0005 ? cfg.rowH / tiltRad : 0;

    for (let i = 0; i < n; i++) {
      const el = els[i];
      if (!el) continue;
      let d = i - next;
      if (cfg.loop && n > 1) {
        d = ((d % n) + n) % n;
        if (d > n / 2) d -= n;
      }
      const dist = Math.abs(d);
      let x = 0;
      let y = d * cfg.rowH;
      let rot = 0;
      if (R > 0) {
        const ang = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, d * tiltRad));
        y = R * Math.sin(ang);
        x = -mirror * R * (1 - Math.cos(ang)) * cfg.curve;
        rot = (mirror * ang * 180) / Math.PI;
      }
      el.style.transform = `translate3d(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%), 0) rotate(${rot.toFixed(3)}deg)`;
      el.style.opacity = String(Math.max(cfg.minOpacity, 1 - dist * cfg.fade));
      el.style.filter = cfg.blur > 0 ? `blur(${(dist * cfg.blur).toFixed(2)}px)` : "none";
      el.style.setProperty("--ow-p", Math.max(0, 1 - Math.min(dist, 1)).toFixed(4));
    }

    rafRef.current = settled ? null : requestAnimationFrame(runFrame);
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
    }
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const playTick = useCallback(() => {
    const { soundUrl, soundVolume } = cfgRef.current;
    if (!soundUrl) return;
    const now = performance.now();
    if (now - lastTickRef.current < 70) return;
    lastTickRef.current = now;
    if (!audioRef.current || audioUrlRef.current !== soundUrl) {
      audioRef.current = new Audio(soundUrl);
      audioRef.current.preload = "auto";
      audioUrlRef.current = soundUrl;
    }
    const audio = audioRef.current;
    audio.volume = Math.min(Math.max(soundVolume, 0), 1);
    audio.currentTime = 0;
    audio.play()?.catch(() => {});
  }, []);

  const applyTarget = useCallback(
    (value: number, snap: boolean) => {
      const cfg = cfgRef.current;
      let v = value;
      if (!cfg.loop) v = Math.min(Math.max(v, 0), Math.max(cfg.count - 1, 0));
      if (snap) v = Math.round(v);
      targetRef.current = v;
      const idx = ((Math.round(v) % cfg.count) + cfg.count) % cfg.count;
      if (idx !== selectedRef.current) {
        selectedRef.current = idx;
        setSelectedIndex(idx);
        onChangeRef.current?.(idx, cfg.items[idx]);
        playTick();
      }
      startLoop();
    },
    [startLoop, playTick]
  );

  // Mouse wheel listener
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const cfg = cfgRef.current;
      const delta = e.deltaMode === 1 ? e.deltaY * 24 : e.deltaY;
      const step = Math.max(-1.5, Math.min(1.5, delta / cfg.rowH));
      applyTarget(targetRef.current + step, false);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => applyTarget(targetRef.current, true), 120);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    };
  }, [applyTarget]);

  // Unified Pointer / Touch Down (Holds the wheel)
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!cfgRef.current.draggable) return;
    try {
      (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
    } catch {}
    const now = performance.now();
    dragRef.current = {
      startY: e.clientY,
      lastY: e.clientY,
      startTime: now,
      lastTime: now,
      startTarget: targetRef.current,
      velocity: 0,
    };
    dragMovedRef.current = false;
    isDraggingRef.current = true;
    setIsDragging(true);
  }, []);

  // Unified Pointer / Touch Move with 1:1 Instant Drag Tracking
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;

      const now = performance.now();
      const dy = e.clientY - drag.startY;
      const stepDy = e.clientY - drag.lastY;
      const stepDt = Math.max(now - drag.lastTime, 1);

      // Instant velocity calculation in px/ms
      const instantVelocity = stepDy / stepDt;
      drag.velocity = drag.velocity * 0.6 + instantVelocity * 0.4;
      drag.lastY = e.clientY;
      drag.lastTime = now;

      if (!dragMovedRef.current && Math.abs(dy) > 3) {
        dragMovedRef.current = true;
      }

      if (dragMovedRef.current) {
        const rowH = cfgRef.current.rowH;
        applyTarget(drag.startTarget - dy / rowH, false);
      }
    },
    [applyTarget]
  );

  // Unified Pointer / Touch End with Momentum Glide and Snap
  const handlePointerEnd = useCallback((e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;

    try {
      (e.target as HTMLElement)?.releasePointerCapture?.(e.pointerId);
    } catch {}

    isDraggingRef.current = false;
    setIsDragging(false);

    if (dragMovedRef.current) {
      // Calculate momentum from release velocity
      const rowH = cfgRef.current.rowH;
      const flickSpeed = drag.velocity * 100;
      const momentumSteps = -(flickSpeed / rowH);
      const projectedTarget = targetRef.current + momentumSteps;
      
      applyTarget(Math.round(projectedTarget), true);
    }

    dragRef.current = null;
  }, [applyTarget]);

  // Click on Item
  const handleItemClick = useCallback(
    (index: number, e: React.MouseEvent) => {
      e.stopPropagation();
      if (dragMovedRef.current) return;
      const cfg = cfgRef.current;
      const cur = targetRef.current;
      let d = index - (((cur % cfg.count) + cfg.count) % cfg.count);
      if (cfg.loop && cfg.count > 1) {
        if (d > cfg.count / 2) d -= cfg.count;
        else if (d < -cfg.count / 2) d += cfg.count;
      }
      applyTarget(cur + d, true);
      onSelect?.(cfg.items[index], index);
    },
    [applyTarget, onSelect]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let delta: number | null = null;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") delta = -1;
      else if (e.key === "ArrowDown" || e.key === "ArrowRight") delta = 1;
      if (delta == null) return;
      e.preventDefault();
      applyTarget(Math.round(targetRef.current) + delta, true);
    },
    [applyTarget]
  );

  useEffect(() => {
    applyTarget(targetRef.current, false);
  }, [items, fontSize, spacing, curve, tilt, blur, fade, minOpacity, side, loop, smoothing, applyTarget]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      audioRef.current?.pause();
    },
    []
  );

  return (
    <div
      ref={rootRef}
      role="listbox"
      tabIndex={0}
      aria-label="Option wheel"
      className={`option-wheel${side === "right" ? " option-wheel--right" : ""}${isDragging ? " option-wheel--dragging" : ""}${className ? ` ${className}` : ""}`}
      style={{
        "--ow-text-color": textColor,
        "--ow-active-color": activeColor,
        "--ow-font-size": `${fontSize}rem`,
        "--ow-inset": `${inset}px`,
      } as React.CSSProperties}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onKeyDown={handleKeyDown}
    >
      {items.map((label, index) => (
        <div
          key={`${label}-${index}`}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
          role="option"
          aria-selected={selectedIndex === index}
          className={`option-wheel__item${selectedIndex === index ? " option-wheel__item--selected" : ""}`}
          onClick={(e) => handleItemClick(index, e)}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
