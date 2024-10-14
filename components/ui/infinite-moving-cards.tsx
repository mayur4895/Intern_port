"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    logo: React.ReactNode;
    name: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const [animationDuration, setAnimationDuration] = useState("20s");

  useEffect(() => {
    if (speed === "fast") {
      setAnimationDuration("20s");
    } else if (speed === "normal") {
      setAnimationDuration("40s");
    } else {
      setAnimationDuration("80s");
    }
  }, [speed]);

  const animationDirection = direction === "left" ? "normal" : "reverse";

  return (
    <div
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        className={cn(
          "flex min-w-full shrink-0 gap-2 py-2 w-max flex-nowrap",
          "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animationDuration,
          animationDirection,
        }}
      >
        {items.map((item, idx) => (
          <li
            className="w-[200px] max-w-full relative rounded-2xl flex-shrink-0"
            key={idx}
          >
            <div className="flex items-center justify-center gap-2">
              {item.logo}
              <span>{item.name}</span>
            </div>
          </li>
        ))}

        {/* Duplicate items for seamless scroll */}
        {items.map((item, idx) => (
          <li
            className="w-[200px] max-w-full relative rounded-2xl flex-shrink-0"
            key={`duplicate-${idx}`}
          >
            <div className="flex items-center justify-center gap-2">
              {item.logo}
              <span>{item.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
