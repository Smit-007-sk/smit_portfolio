"use client";

import React, { ReactNode } from "react";
import "./ScrollStack.css";

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
  index?: number;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
  index = 0,
}) => {
  const topOffset = 90 + index * 25; // 90px, 115px, 140px...
  const zIndex = 10 + index; // Card 2 covers Card 1, Card 3 covers Card 2...

  return (
    <div
      className={`sticky transition-all duration-300 ease-out will-change-transform ${itemClassName}`.trim()}
      style={{
        top: `${topOffset}px`,
        zIndex: zIndex,
        marginBottom: "140px",
      }}
    >
      {children}
    </div>
  );
};

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`relative w-full space-y-12 pb-36 ${className}`.trim()}>
      {React.Children.map(children, (child, i) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { index: i } as any);
        }
        return child;
      })}
    </div>
  );
};

export default ScrollStack;
