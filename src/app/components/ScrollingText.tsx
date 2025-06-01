"use client";
import { useState, useEffect, useRef, useMemo } from "react";

interface ScrollingTextProps {
  options: string[];
  delay?: number;
  className?: string;
}

export const ScrollingText = ({
  options,
  delay = 2000,
  className = "",
}: ScrollingTextProps) => {
  // Memoize options array to prevent unnecessary re-renders
  const validOptions = useMemo(() => {
    if (!options.length) return [];
    if (options.length === 1) return options;
    return options;
  }, [options]);

  const items = useMemo(
    () => (validOptions.length > 1 ? [...validOptions, validOptions[0]] : validOptions),
    [validOptions]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Measure the largest width of all items
  const largestWidth = useMemo(() => {
    let maxWidth = 0;
    items.forEach((item, index) => {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.visibility = "hidden";
      div.style.whiteSpace = "nowrap";
      div.textContent = item;
      document.body.appendChild(div);
      maxWidth = Math.max(maxWidth, div.scrollWidth + 75);
      document.body.removeChild(div);
    });
    return maxWidth;
  }, [items]);

  useEffect(() => {
    if (validOptions.length <= 1) return;

    const startAnimation = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const nextIndex = currentIndex === items.length - 2 ? 0 : currentIndex + 1;
        setCurrentIndex(nextIndex);

        startAnimation();
      }, delay);
    };

    startAnimation();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, delay, items.length, validOptions.length]);

  if (!validOptions.length) {
    return <span className={className}></span>;
  }

  if (validOptions.length === 1) {
    return <span className={className}>{validOptions[0]}</span>;
  }

  return (
    <div
      ref={containerRef}
      className={`inline-block relative overflow-hidden transition-all duration-500 ease-in-out ${className}`}
      style={{
        height: "1.35em",
        width: `${largestWidth}px`,
        verticalAlign: "bottom",
        boxShadow: "inset 0 0 10px rgba(0, 0, 255, 0.2)",
        overflow: "hidden", // Ensure overflowing content is hidden
        borderRadius:"10px",
        paddingBottom:"0.1em",
        marginRight:"0.3em"
      }}
    >
      <div
        className="transition-transform duration-500 ease-in-out will-change-transform"
        style={{
          transform: `translateY(-${currentIndex * 100}%)`,
          height: "100%",
        }}
      >
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center whitespace-nowrap pt-1"
            style={{ top: `${index * 100}%` }}
            aria-hidden={index !== currentIndex}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
